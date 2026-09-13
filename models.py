from sqlalchemy import Column, Integer, String, Date
from database import Base

class Customer(Base):
    __tablename__ = "customer"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(50))
    gender = Column(String(50))
    address = Column(String(50))
    street = Column(String(50))
    pincode = Column(String(50))
    created_at = Column(Date)