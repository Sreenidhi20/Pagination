import base64
import math
from fastapi import FastAPI, Depends, Query, Response, status
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db
import models
import schemas

app = FastAPI()

@app.get("/api/customers/offset", response_model=schemas.LimitOffsetPaginationResponse)
def get_customers_offset(
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db)
):
    total_records = db.query(models.Customer).count()
    customers = (
        db.query(models.Customer)
        .order_by(models.Customer.id.asc())
        .limit(limit)
        .offset(offset)
        .all()
    )
    total_pages = math.ceil(total_records / limit) if total_records > 0 else 1
    current_page = (offset // limit) + 1

    return {
        "total_records": total_records,
        "limit": limit,
        "offset": offset,
        "total_pages": total_pages,
        "current_page": current_page,
        "data": customers
    }

@app.get("/api/customers/cursor", response_model=schemas.CursorPaginationResponse)
def get_customers_cursor(
    limit: int = Query(default=10, ge=1, le=100),
    cursor: Optional[str] = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Customer).order_by(models.Customer.id.asc())
    if cursor:
        try:
            decoded_id = int(base64.b64decode(cursor).decode("utf-8"))
            query = query.filter(models.Customer.id > decoded_id)
        except Exception:
            pass

    customers = query.limit(limit + 1).all()
    has_more = len(customers) > limit

    if has_more:
        results_data = customers[:-1]
        last_id = str(results_data[-1].id)
        next_cursor = base64.b64encode(last_id.encode("utf-8")).decode("utf-8")
    else:
        results_data = customers
        next_cursor = None

    return {
        "next_cursor": next_cursor,
        "has_more": has_more,
        "limit": limit,
        "data": results_data
    }

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
