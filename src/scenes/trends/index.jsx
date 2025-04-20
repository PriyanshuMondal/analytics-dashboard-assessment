import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Trends = () => {
  return (
    <Box m="20px">
      <Header title="EV REGISTRATION TRENDS" subtitle="EV Adoption Over the Years" />
      <Box height="75vh">
        <LineChart isDashboard={false} dataset="evLineData" />
      </Box>
    </Box>
  );
};

export default Trends;
