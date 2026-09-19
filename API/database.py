import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from sqlalchemy.orm import Session


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is missing from the .env file!")


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()

def check_db_health(db: Session) -> bool:
    """Executes a minimalist query to verify the database is alive."""
    try:
        db.execute(text("SELECT 1"))
        return True
    except Exception:
        return False

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()