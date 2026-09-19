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
  fetchOffsetPage,
  type OffsetPaginationResponse,
} from "../api/pagination";
import CustomerTable from "./CustomerTable";

const PAGE_SIZE = 10;

export default function OffsetPagination() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  const [result, setResult] = useState<OffsetPaginationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);
    fetchOffsetPage(rowsPerPage, page)
      .then((response) => {
        if (active) setResult(response);
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
  }, [page, rowsPerPage]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Box>
          <IconButton component={Link} to="/" aria-label="Back to dashboard">
            ←
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Offset pagination
          </Typography>
          <Typography color="text.secondary">
            Page and offset-based customer results.
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
              count={result.total_records}
              page={page - 1}
              onPageChange={(_, nextPage) => setPage(nextPage + 1)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(Number(event.target.value));
                setPage(1);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} of ${count} customers`
              }
            />
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
