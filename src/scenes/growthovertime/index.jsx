import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const GrowthOverTime = () => {
  return (
    <Box m="20px">
      <Header title="GROWTH OVERTIME" subtitle="Visualizing EV Growth" />
      <Box height="75vh">
        <LineChart isDashboard={false} dataset="evLineData" />
      </Box>
    </Box>
  );
};

export default GrowthOverTime;
