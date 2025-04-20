import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { VehiclesData } from "../../data/vehiclesData";
import Header from "../../components/Header";

const Vehicles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "make", headerName: "Make", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    { field: "year", headerName: "Year", type: "number", flex: 0.6 },
    { field: "type", headerName: "EV Type", flex: 1.5 },
    { field: "evCount", headerName: "Registrations", type: "number", flex: 0.7 },
    { field: "avgRange", headerName: "Avg Range (mi)", type: "number", flex: 0.7 },
    { field: "avgMSRP", headerName: "Avg MSRP ($)", type: "number", flex: 0.7 },
  ];

  return (
    <Box m="20px">
      <Header title="VEHICLES" subtitle=" Vehicle Types and Their Popularity" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={VehiclesData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Vehicles;
