from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
from pathlib import Path

app = Flask(__name__)
CORS(app) # requests from React dev server'

BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR / "car_database.csv"

def load_cars_from_csv():
    cars = []
    with CSV_PATH.open(newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader):
            cars.append({
                "id": idx,
                "year": row.get("Year"),
                "model": row.get("Model"),
                "msrp": row.get("MSRP"),
                "mpg": row.get("MPG"),
                "style": row.get("Style"),
            })
    return cars

# routes

@app.route("/api/health", methods = ["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/api/featured-cars", methods = ["GET"])
def featured_cars():
    cars = load_cars_from_csv()
    return jsonify(cars[:4]) # first 4 returned

@app.route("/api/cars", methods = ["GET"])
def all_cars():
    cars = load_cars_from_csv()
    # return cars with option query
    search = request.args.get("search", "").lower().strip()
    if search:
        filtered = [
            car for car in cars if search in (car["model"] or "").lower()
        ]
        return jsonify(filtered)

    return jsonify(cars)

if __name__ == "__main__": # start dev server
    app.run(debug=True, port=5000)
