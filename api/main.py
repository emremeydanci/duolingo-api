import logging
import re
from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Constants
DUOLINGO_API_URL = "https://www.duolingo.com/2017-06-30/users"
REQUEST_TIMEOUT = 10  # seconds
MAX_RETRIES = 3
BACKOFF_FACTOR = 0.3
USERNAME_PATTERN = re.compile(r'^[a-zA-Z0-9_]{3,30}$')

app = FastAPI(
    title="Duolingo Stats API",
    description="A stable API to fetch Duolingo user statistics",
    version="1.0.0"
)

def create_session() -> requests.Session:
    """Create a requests session with retry strategy and timeout."""
    session = requests.Session()
    
    # Define retry strategy
    retry_strategy = Retry(
        total=MAX_RETRIES,
        status_forcelist=[429, 500, 502, 503, 504],
        method_whitelist=["HEAD", "GET", "OPTIONS"],
        backoff_factor=BACKOFF_FACTOR
    )
    
    # Mount adapter with retry strategy
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    return session

def validate_username(username: str) -> bool:
    """Validate username format."""
    return bool(USERNAME_PATTERN.match(username))

def safe_get_nested(data: Dict[str, Any], *keys, default=None) -> Any:
    """Safely get nested dictionary values."""
    try:
        for key in keys:
            if isinstance(data, dict) and key in data:
                data = data[key]
            else:
                return default
        return data
    except (KeyError, TypeError, AttributeError):
        return default

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler for unexpected errors."""
    logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "İç sunucu hatası", "details": "Beklenmeyen bir hata oluştu"}
    )

@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "healthy", "service": "duolingo-stats-api"}

@app.get("/stats")
def get_stats(
    username: str = Query(
        default="emremeydanci",
        description="Duolingo kullanıcı adı",
        min_length=3,
        max_length=30,
        regex=r'^[a-zA-Z0-9_]+$'
    )
) -> Dict[str, Any]:
    """
    Get Duolingo user statistics.
    
    Args:
        username: The Duolingo username to fetch stats for
        
    Returns:
        Dict containing user statistics
        
    Raises:
        HTTPException: If the request fails or user is not found
    """
    start_time = time.time()
    
    try:
        # Validate username
        if not validate_username(username):
            logger.warning(f"Invalid username format: {username}")
            raise HTTPException(
                status_code=400,
                detail="Geçersiz kullanıcı adı formatı. Sadece harfler, rakamlar ve alt çizgi kullanabilirsiniz."
            )
        
        logger.info(f"Fetching stats for username: {username}")
        
        # Create session with retry logic
        session = create_session()
        
        # Make API request
        url = f"{DUOLINGO_API_URL}?username={username}"
        response = session.get(url, timeout=REQUEST_TIMEOUT)
        
        # Handle different HTTP status codes
        if response.status_code == 404:
            logger.warning(f"User not found: {username}")
            raise HTTPException(
                status_code=404,
                detail="Kullanıcı bulunamadı"
            )
        elif response.status_code == 429:
            logger.warning(f"Rate limit exceeded for username: {username}")
            raise HTTPException(
                status_code=429,
                detail="Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin."
            )
        elif response.status_code != 200:
            logger.error(f"API request failed with status {response.status_code} for username: {username}")
            raise HTTPException(
                status_code=502,
                detail=f"Duolingo API'sinden veri alınamadı (HTTP {response.status_code})"
            )
        
        # Parse JSON response
        try:
            data = response.json()
        except ValueError as e:
            logger.error(f"Failed to parse JSON response for username: {username}, error: {str(e)}")
            raise HTTPException(
                status_code=502,
                detail="Geçersiz API yanıtı alındı"
            )
        
        # Validate response structure
        if not isinstance(data, dict):
            logger.error(f"Invalid response format for username: {username}")
            raise HTTPException(
                status_code=502,
                detail="Beklenmeyen API yanıt formatı"
            )
        
        # Extract user data safely
        user = safe_get_nested(data, "user", default={})
        if not user:
            logger.warning(f"No user data found for username: {username}")
            raise HTTPException(
                status_code=404,
                detail="Kullanıcı verisi bulunamadı"
            )
        
        language_data = safe_get_nested(user, "language_data", default={})
        learning_language = safe_get_nested(user, "learning_language", default="")
        
        # Handle case where learning_language is empty
        if not learning_language and language_data:
            learning_language = next(iter(language_data), "")
            logger.info(f"Using first available language: {learning_language} for username: {username}")
        
        current_lang = safe_get_nested(language_data, learning_language, default={})
        
        # Build response with safe data extraction
        result = {
            "username": username,
            "daily_streak": safe_get_nested(current_lang, "streak", default=0),
            "total_xp": safe_get_nested(current_lang, "xp", default=0),
            "crowns": safe_get_nested(current_lang, "crowns", default=0),
            "has_plus": safe_get_nested(user, "has_plus", default=False),
            "learning_language_string": safe_get_nested(current_lang, "language_string", default=""),
            "learning_language_code": learning_language,
            "created": safe_get_nested(user, "created", default=0),
            "current_league": safe_get_nested(current_lang, "current_league", default="Bilinmiyor"),
            "top3_completion": False,  # This seems to be a placeholder
            "last_updated": int(time.time())
        }
        
        processing_time = time.time() - start_time
        logger.info(f"Successfully fetched stats for username: {username} in {processing_time:.2f}s")
        
        return result
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except requests.exceptions.Timeout:
        logger.error(f"Request timeout for username: {username}")
        raise HTTPException(
            status_code=504,
            detail="İstek zaman aşımına uğradı. Lütfen tekrar deneyin."
        )
    except requests.exceptions.ConnectionError:
        logger.error(f"Connection error for username: {username}")
        raise HTTPException(
            status_code=503,
            detail="Duolingo API'sine bağlanılamadı. Lütfen daha sonra tekrar deneyin."
        )
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error for username: {username}, error: {str(e)}")
        raise HTTPException(
            status_code=502,
            detail="Dış API isteğinde hata oluştu"
        )
    except Exception as e:
        logger.error(f"Unexpected error for username: {username}, error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Beklenmeyen bir hata oluştu"
        )
