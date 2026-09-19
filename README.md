# Pagination Project

This project shows two common ways to load customer data in pages.

It has two parts:

- `API`: A FastAPI backend that reads customer data from the database.
- `Client/pagination-ui`: A React frontend that displays the data and lets you move between pages.

## Pagination Types

### Offset Pagination

Offset pagination uses a page number and an offset.

For example, page 2 with 10 records per page starts after the first 10 records. The API also returns the total number of records and total pages.

This type is simple and works well when the data does not change often.

Example response from `GET /api/customers/offset?limit=2&offset=0`:

```json
{
  "total_records": 25,
  "limit": 2,
  "offset": 0,
  "total_pages": 13,
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Smith",
      "email": "john@example.com",
      "gender": "Male",
      "address": "Main Street",
      "street": "10 Main Street",
      "pincode": "10001",
      "created_at": "2026-01-01"
    }
  ]
}
```

### Cursor Pagination

Cursor pagination uses a cursor from the previous API response to find the next records.

The API returns a `next_cursor` value when more records are available. The frontend sends this cursor to load the next page.

This type is useful for large or frequently changing data because the database does not need to skip many records.

Example response from `GET /api/customers/cursor?limit=2`:

```json
{
  "next_cursor": "Mg==",
  "has_more": true,
  "limit": 2,
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Smith",
      "email": "john@example.com",
      "gender": "Male",
      "address": "Main Street",
      "street": "10 Main Street",
      "pincode": "10001",
      "created_at": "2026-01-01"
    }
  ]
}
```

## Requirements

- Python 3.10 or newer
- Node.js and npm
- A working database configured for the API

## Run the API

Open a terminal in the `API` folder:

```bash
cd API
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at:

```text
http://localhost:8000
```

## Run the Frontend

Open another terminal in the `Client/pagination-ui` folder:

```bash
cd Client/pagination-ui
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Frontend Pages

- `/`: Dashboard
- `/offset-pagination`: Offset pagination page
- `/cursor-pagination`: Cursor pagination page

## API Endpoints

- `GET /api/customers/offset`
- `GET /api/customers/cursor`
- `GET /api/healthz`

The frontend API URL is set in `Client/pagination-ui/.env` using `VITE_API_URL`.
