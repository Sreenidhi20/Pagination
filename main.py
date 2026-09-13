from fastapi import FastAPI, Depends, Response, status
from sqlalchemy.orm import Session
from database import get_db, check_db_health

app = FastAPI()

@app.get("/api/healthz")
def simple_health_check(response: Response, db: Session = Depends(get_db)):
    is_alive = check_db_health(db)
    
    if is_alive:
        return {"status": "UP", "database": "CONNECTED"}
    response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    return {"status": "DOWN", "database": "DISCONNECTED"}

@app.get("/")
def read_root():
    return {"status": "Success", "message": "FastAPI Pagination API is running!"}