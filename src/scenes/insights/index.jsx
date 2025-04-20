import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Insights = () => {
  return (
    <Box m="20px">
      <Header title="TOP VEHICLE MAKERS" subtitle="Based on Number of Registrations" />
      <Box height="75vh">
        <BarChart isDashboard={false} dataKey="count" labelKey="make" dataset="evBarMakeData" />
      </Box>
    </Box>
  );
};

export default Insights;
