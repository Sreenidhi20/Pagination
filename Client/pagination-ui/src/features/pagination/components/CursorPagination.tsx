import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  fetchCursorPage,
  type CursorPaginationResponse,
} from "../api/pagination";
import CustomerTable from "./CustomerTable";

const PAGE_SIZE = 10;

export default function CursorPagination() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  const [cursor, setCursor] = useState<string | null>(null);
  const [cursorByPage, setCursorByPage] = useState<
    Record<number, string | null>
  >({ 1: null });
  const [result, setResult] = useState<CursorPaginationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);
    setResult(null);
    fetchCursorPage(rowsPerPage, cursor)
      .then((response) => {
        if (active) {
          setResult(response);
          if (response.next_cursor) {
            setCursorByPage((current) => ({
              ...current,
              [page + 1]: response.next_cursor,
            }));
          }
        }
      })
      .catch((requestError: unknown) => {
        if (active)
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load customers.",
          );
      });

    return () => {
      active = false;
    };
  }, [cursor, page, rowsPerPage]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Box>
          <IconButton component={Link} to="/" aria-label="Back to dashboard">
            ←
          </IconButton>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Cursor pagination
          </Typography>
          <Typography color="text.secondary">
            Navigate through customers with continuation cursors.
          </Typography>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {!result && !error ? (
          <CircularProgress sx={{ alignSelf: "center" }} />
        ) : (
          result && <CustomerTable customers={result.data} />
        )}
        {result && (
          <Paper elevation={1}>
            <TablePagination
              component="div"
              sx={{ display: "flex", justifyContent: "center" }}
              count={-1}
              page={page - 1}
              onPageChange={(_, nextPage) => {
                const nextPageNumber = nextPage + 1;
                setPage(nextPageNumber);
                setCursor(cursorByPage[nextPageNumber] ?? null);
              }}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(Number(event.target.value));
                setPage(1);
                setCursor(null);
                setCursorByPage({ 1: null });
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelDisplayedRows={({ from, to }) => `${from}-${to} customers`}
              slotProps={{
                actions: {
                  nextButton: { disabled: !result.has_more },
                },
              }}
            />
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
