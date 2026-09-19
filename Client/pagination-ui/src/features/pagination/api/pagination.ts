export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;
  street: string;
  pincode: string | null;
  created_at: string;
};

export type OffsetPaginationResponse = {
  total_records: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  data: Customer[];
};

export type CursorPaginationResponse = {
  next_cursor: string | null;
  has_more: boolean;
  limit: number;
  data: Customer[];
};

const API_URL = import.meta.env.API_URL;

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchOffsetPage(
  limit: number,
  page: number,
): Promise<OffsetPaginationResponse> {
  const offset = (page - 1) * limit;
  return request<OffsetPaginationResponse>(
    `/api/customers/offset?limit=${limit}&offset=${offset}`,
  );
}

export function fetchCursorPage(
  limit: number,
  cursor: string | null,
): Promise<CursorPaginationResponse> {
  const cursorQuery = cursor ? `&cursor=${encodeURIComponent(cursor)}` : "";
  return request<CursorPaginationResponse>(
    `/api/customers/cursor?limit=${limit}${cursorQuery}`,
  );
}
