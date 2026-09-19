import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./features/Dashboard/Dashboard";
import CursorPagination from "./features/pagination/components/CursorPagination";
import OffsetPagination from "./features/pagination/components/OffsetPagination";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/offset-pagination" element={<OffsetPagination />} />
        <Route path="/cursor-pagination" element={<CursorPagination />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
