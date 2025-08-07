from flask import Flask, request, jsonify, send_from_directory, render_template_string
import os
import yaml
import werkzeug.utils

app = Flask(__name__)
STRATEGY_DIR = "./strategies"

@app.route("/")
def index():
    strategies = os.listdir(STRATEGY_DIR)
    return render_template_string(open("backend/Webui/index.html", encoding="utf-8").read(), strategies=strategies)

@app.route("/add_strategy", methods=["POST"])
def add_strategy():
    data = request.json
    name = data.get("name")
    stype = data.get("type")
    filename = os.path.join(STRATEGY_DIR, f"{name}.yml")

    strategy_data = {
        "strategy": stype,
        "market": "binance",
        "symbols": ["BTC/USDT"]
    }

    with open(filename, "w") as f:
        yaml.dump(strategy_data, f)

    return jsonify({"status": "ok", "file": filename})

@app.route("/start", methods=["POST"])
def start_strategy():
    data = request.json
    strategy = data.get("strategy")
    print(f"✅ Strateji başlatılıyor: {strategy}")
    return jsonify({"status": "started", "strategy": strategy})

@app.route("/stop", methods=["POST"])
def stop_strategy():
    data = request.json
    strategy = data.get("strategy")
    print(f"⛔ Strateji durduruluyor: {strategy}")
    return jsonify({"status": "stopped", "strategy": strategy})

@app.route("/status")
def bot_status():
    return jsonify({
        "running": True,
        "active_strategies": os.listdir(STRATEGY_DIR)
    })

@app.route("/logs")
def get_logs():
    try:
        with open("./logs/hummingbot.log", "r", encoding="utf-8") as f:
            lines = f.readlines()[-100:]
        return "<br>".join(lines)
    except FileNotFoundError:
        return "Log bulunamadı."

@app.route("/import_strategy", methods=["POST"])
def import_strategy():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "Dosya yüklenmedi."}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "error", "message": "Dosya ismi boş."}), 400

    filename = werkzeug.utils.secure_filename(file.filename)
    if not filename.lower().endswith('.yml') and not filename.lower().endswith('.yaml'):
        return jsonify({"status": "error", "message": "Yalnızca YAML dosyaları kabul edilir."}), 400

    filepath = os.path.join(STRATEGY_DIR, filename)
    # Aynı isimde dosya varsa üzerine yaz veya isim değiştir işlemi yapılabilir
    file.save(filepath)
    return jsonify({"status": "ok", "file": filename})

@app.route("/webui/<path:path>")
def static_file(path):
    return send_from_directory("backend/Webui", path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
