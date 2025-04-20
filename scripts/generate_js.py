# scripts/generate_js.py

import pandas as pd
import json, re
from pathlib import Path
from collections import Counter

# ─── 1) CONFIG ────────────────────────────────────────────────────────────────
CSV_PATH = Path(__file__).parent.parent / "Electric_Vehicle_Population_Data.csv"
OUT_DIR  = Path(__file__).parent.parent / "src" / "data"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── 2) JS WRITER ──────────────────────────────────────────────────────────────
def write_js(fname, varname, data):
    #  pretty‑print JSON
    js = json.dumps(data, indent=2)
    # unquote object keys:  "key": → key:
    js = re.sub(r'"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:', r'\1:', js)
    # unquote numeric values:  "123" → 123
    js = re.sub(r'"\s*(-?\d+\.?\d*)\s*"', r'\1', js)
    content = f"// AUTO‑GENERATED from CSV\nexport const {varname} = {js};\n"
    (OUT_DIR / fname).write_text(content, encoding="utf-8")
    print(f"  ➤ {fname}")

# ─── 3) LOAD CSV ───────────────────────────────────────────────────────────────
df = pd.read_csv(CSV_PATH)

# ─── 4) vehiclesData.js ────────────────────────────────────────────────────────
vehicles = []
for _, r in df.iterrows():
    m = re.match(r"POINT \((-?\d+\.\d+) +(-?\d+\.\d+)\)", r["Vehicle Location"])
    coords = [float(m.group(1)), float(m.group(2))] if m else [0,0]
    vehicles.append({
        "vin": r["VIN (1-10)"],
        "county": r["County"],
        "city": r["City"],
        "state": r["State"],
        "postalCode": int(r["Postal Code"]),
        "modelYear": int(r["Model Year"]),
        "make": r["Make"],
        "model": r["Model"],
        "evType": r["Electric Vehicle Type"],
        "range": int(r["Electric Range"]),
        "msrp": float(re.sub(r"[^\d.]", "", str(r["Base MSRP"])) or 0),
        "district": r["Legislative District"],
        "dolId": r["DOL Vehicle ID"],
        "utility": r["Electric Utility"],
        "censusTract": r["2020 Census Tract"],
        "coordinates": coords
    })
write_js("vehiclesData.js", "vehiclesData", vehicles)

# ─── 5) insightsData.js ───────────────────────────────────────────────────────
total = len(vehicles)
avg_range = round(sum(v["range"] for v in vehicles) / total, 1)
top_make  = Counter(v["make"]   for v in vehicles).most_common(1)[0][0]
top_county= Counter(v["county"] for v in vehicles).most_common(1)[0][0]
insights = {
    "totalEVs": total,
    "avgRange": avg_range,
    "topMake": top_make,
    "topCounty": top_county
}
write_js("insightsData.js", "insightsData", insights)

# ─── 6) trendsData.js ─────────────────────────────────────────────────────────
yc = Counter(v["modelYear"] for v in vehicles)
trends = [{"year": y, "count": c} for y, c in sorted(yc.items())]
write_js("trendsData.js", "trendsData", trends)

# ─── 7) mockPieData.js ────────────────────────────────────────────────────────
tc = Counter(v["evType"] for v in vehicles)
pie = [
    {"id": t, "label": t, "value": c, "color": f"hsl({(i*137)%360}, 70%, 50%)"}
    for i, (t, c) in enumerate(tc.items())
]
write_js("mockPieData.js", "mockPieData", pie)

# ─── 8) mockBarData.js ────────────────────────────────────────────────────────
bar_map = {}
for v in vehicles:
    by_year = bar_map.setdefault(v["modelYear"], {})
    by_year[v["make"]] = by_year.get(v["make"], 0) + 1
bar = [{"year": y, **makes} for y, makes in sorted(bar_map.items())]
write_js("mockBarData.js", "mockBarData", bar)

# ─── 9) mockLineData.js ───────────────────────────────────────────────────────
line_map = {}
for v in vehicles:
    by_make = line_map.setdefault(v["make"], {})
    by_make[v["modelYear"]] = by_make.get(v["modelYear"], 0) + 1
line = [
    {"id": make, "data": [{"x": y, "y": c} for y, c in sorted(years.items())]}
    for make, years in line_map.items()
]
write_js("mockLineData.js", "mockLineData", line)

# ─── 🔟 mockGeoCoordinates.js ─────────────────────────────────────────────────
geo = [{"id": v["vin"], "coordinates": v["coordinates"], "value": 1} for v in vehicles]
write_js("mockGeoCoordinates.js", "mockGeoCoordinates", geo)

print("✅ All modules written to", OUT_DIR)
