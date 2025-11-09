from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
from pathlib import Path

app = Flask(__name__)

CORS(
    app,
    resources={r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:5174"]}},
)

BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR / "car_database.csv"

def parseMpg(raw_mpg):
    # handles values like '20/26'
    if raw_mpg is None:
        return None
    s = str(raw_mpg).strip()
    if not s:
        return None
    
    # '20/26' cases
    if "/" in s:
        parts = s.split("/")
        nums = []
        for p in parts:
            p = p.strip()
            try:
                nums.append(float(p))
            except ValueError:
                continue
        if not nums:
            return None
        return sum(nums) / len(nums) # average
    
    # normal number like string
    try:
        return float(s)
    except ValueError:
        return None

def parsePrice(raw_price):
    # convert strings prices #41,350 into float 41350.0
    if raw_price is None:
        return None
    s = str(raw_price).strip()
    if not s:
        return None
    
    # remove dollar signs and commas
    s = s.replace("$", "").replace(",", "")
    try:
        return float(s)
    except ValueError:
        return None

def load_cars_from_csv():
    cars = []
    with CSV_PATH.open(newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader):
            car_id = row.get("uuid") or row.get("UUID") or row.get("id") or str(idx)
            cars.append({
                "id": car_id,
                "year": row.get("Year"),
                "model": row.get("Model"),
                "msrp": row.get("MSRP"),
                "mpg": row.get("MPG"),
                "style": row.get("Style"),
                "image": row.get("Image") or "",
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
    year = request.args.get("year")
    style = request.args.get("style", "").lower().strip()
    min_msrp = request.args.get("min_msrp",type = float)
    max_msrp = request.args.get("max_msrp",type = float)
    min_mpg = request.args.get("min_mpg",type = float)
    max_mpg = request.args.get("max_mpg",type = float)

    filtered = cars

    if search:
        filtered = [car for car in filtered if search in (car["model"] or "").lower()]
    if year:
        filtered = [car for car in filtered if str(car["year"]) == str(year)]
    if style:
        filtered = [car for car in filtered if car["style"] and style in car["style"].lower()]
    if min_msrp is not None:
        filtered = [car for car in filtered if parsePrice(car["msrp"]) is not None and parsePrice(car["msrp"]) >= min_msrp]
    if max_msrp is not None:
        filtered = [car for car in filtered if parsePrice(car["msrp"]) is not None and parsePrice(car["msrp"]) <= max_msrp]
    if min_mpg is not None:
        filtered = [car for car in filtered if parseMpg(car["mpg"]) is not None and parseMpg(car["mpg"]) >= min_mpg]
    if max_mpg is not None:
        filtered = [car for car in filtered if parseMpg(car["mpg"]) is not None and parseMpg(car["mpg"]) <= max_mpg]
    
    return jsonify(filtered)

@app.route("/api/cars/filter", methods = ["POST"])
def filter_cars():
    cars = load_cars_from_csv()
    data = request.get_json() or {}

    # filters from JSON
    search = data.get("search", "").lower().strip()
    year = data.get("year")
    style = data.get("style", "").lower().strip()
    min_msrp = data.get("min_msrp")
    max_msrp = data.get("max_msrp")
    min_mpg = data.get("min_mpg")
    max_mpg = data.get("max_mpg")

    filtered = cars

    # search by model
    if search:
        filtered = [car for car in filtered if search in (car["model"] or "").lower()]
    # year match
    if year is not None:
        filtered = [car for car in filtered if str(car["year"]) == str(year)]
    # style 
    if style:
        filtered = [car for car in filtered if car["style"] and style in car["style"].lower()]
    # price range
    if min_msrp is not None:
        filtered = [car for car in filtered if parsePrice(car["msrp"]) is not None and parsePrice(car["msrp"]) >= float(min_msrp)]
    if max_msrp is not None:
        filtered = [car for car in filtered if parsePrice(car["msrp"]) is not None and parsePrice(car["msrp"]) <= float(max_msrp)]
    # mpg range
    if min_mpg is not None:
        filtered = [car for car in filtered if parseMpg(car["mpg"]) is not None and parseMpg(car["mpg"]) >= float(min_mpg)]
    if max_mpg is not None:
        filtered = [car for car in filtered if parseMpg(car["mpg"]) is not None and parseMpg(car["mpg"]) <= float(max_mpg)]

    return jsonify(filtered), 200
    

@app.route("/api/cars/<car_id>", methods = ["GET"])
def get_car(car_id):
    cars = load_cars_from_csv()
    for car in cars:
        if str(car["id"]) == str(car_id):
            return jsonify(car), 200
    return jsonify({"error": "Car not found"}), 404

@app.route("/api/compare", methods = ["POST"])
def compare_cars():
    cars = load_cars_from_csv()
    data = request.get_json() or {}
    ids = [str(i) for i in data.get("ids", [])]
    selected_cars = [car for car in cars if str(car["id"]) in ids]
    return jsonify(selected_cars), 200


if __name__ == "__main__":  # start dev server
    cars = load_cars_from_csv()
    print(f"Loaded {len(cars)} cars from CSV")
    app.run(debug=True, port=8000)

