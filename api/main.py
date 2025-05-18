from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/stats")
def get_stats(username: str = "emremeydanci"):
    url = f"https://www.duolingo.com/2017-06-30/users?username={username}"
    response = requests.get(url)
    if response.status_code != 200:
        return {"error": "Veri alınamadı"}

    data = response.json()
    user = data.get("user", {})
    language_data = user.get("language_data", {})

    learning_language = user.get("learning_language", "") or next(iter(language_data), "")
    current_lang = language_data.get(learning_language, {})

    return {
        "daily_streak": current_lang.get("streak", 0),
        "total_xp": current_lang.get("xp", 0),
        "crowns": current_lang.get("crowns", 0),
        "has_plus": user.get("has_plus", False),
        "learning_language_string": current_lang.get("language_string", ""),
        "created": user.get("created", 0),
        "current_league": current_lang.get("current_league", "Bilinmiyor"),
        "top3_completion": False
    }
