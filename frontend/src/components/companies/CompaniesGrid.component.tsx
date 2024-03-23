import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { Icompany } from "../../types/global.typing";
import "./companiesGrid.scss";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "size", headerName: "Size", width: 150 },
  {
    field: "createAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createAt).format("YYYY-MM-DD"),
  },
];
interface ICompaniesGridProps {
  data: Icompany[];
}
const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CompaniesGrid;
