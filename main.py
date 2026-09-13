from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Success", "message": "FastAPI Pagination API is running!"}