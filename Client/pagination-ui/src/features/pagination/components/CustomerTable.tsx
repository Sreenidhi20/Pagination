import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Customer } from "../api/pagination";

type CustomerTableProps = {
  customers: Customer[];
};

export default function CustomerTable({ customers }: CustomerTableProps) {
  if (customers.length === 0) {
    return <Alert severity="info">No customers found.</Alert>;
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} hover>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{`${customer.first_name} ${customer.last_name}`}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.gender}</TableCell>
              <TableCell>{`${customer.street}, ${customer.address}`}</TableCell>
              <TableCell>{customer.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
