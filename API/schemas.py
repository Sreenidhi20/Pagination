from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import List, Optional

class CustomerResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    gender: str
    address: str
    street: str
    pincode: Optional[str] = None 
    created_at: date

    model_config = ConfigDict(from_attributes=True)


class LimitOffsetPaginationResponse(BaseModel):
    total_records: int
    limit: int
    offset: int
    total_pages: int
    current_page: int
    data: List[CustomerResponse]



class CursorPaginationResponse(BaseModel):
    next_cursor: Optional[str]
    has_more: bool
    limit: int
    data: List[CustomerResponse]
