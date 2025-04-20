import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const ModelYearBreakdown = () => {
  return (
    <Box m="20px">
      <Header title="MODEL YEAR BREAKDOWN" subtitle="Distribution Across Vehicle Years" />
      <Box height="75vh">
        <BarChart
          isDashboard={false}
          dataKey="count"
          labelKey="year"
          dataset="evModelYearData" // ✅ fixed from evLineData
        />
      </Box>
    </Box>
  );
};

export default ModelYearBreakdown;
