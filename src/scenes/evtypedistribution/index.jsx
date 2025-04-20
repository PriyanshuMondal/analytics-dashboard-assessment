import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const EVTypeDistribution = () => {
  return (
    <Box m="20px">
      <Header title="EV TYPE DISTRIBUTION" subtitle="BEVs vs PHEVs" />
      <Box height="75vh">
        <PieChart dataset="evPieTypeData" />
      </Box>
    </Box>
  );
};

export default EVTypeDistribution;
