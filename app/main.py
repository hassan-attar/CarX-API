from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .dummy_data import CARS, CARS_EXTENDED

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/api/v1/cars")
async def get_cars():
    return CARS


@app.get("/api/v1/cars/{car_id}")
async def get_car_by_id(car_id: str):
    res = [car for car in CARS_EXTENDED if car["id"] == car_id]
    print(car_id)
    if(len(res) < 1):
      raise HTTPException(404, f"Car with id {car_id} not found")
    return res[0]
