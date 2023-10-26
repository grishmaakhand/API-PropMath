from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Set up CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
   allow_origins=["http://localhost:3000"],  # Replace with your React frontend's URL
    allow_methods=["GET", "POST"],   # You can specify specific HTTP methods like ["GET", "POST"]
    allow_headers=["Authorization", "Content-Type"],  # You can specify specific headers if needed
)

class CalculationRequest(BaseModel):
    operation: str
    number1: float
    number2: float

@app.get("/")
async def root():
    return {"message": "Hello, World"}

@app.post("/calculate")
async def calculate(calculation_request: CalculationRequest):
    operation = calculation_request.operation
    number1 = calculation_request.number1
    number2 = calculation_request.number2

    if operation == "addition":
        result = number1 + number2
        
    elif operation == "subtraction":
        result = number1 - number2
    elif operation == "multiplication":
        result = number1 * number2
    else:
        return {"error": "Invalid operation"}

    return {"result": result}
