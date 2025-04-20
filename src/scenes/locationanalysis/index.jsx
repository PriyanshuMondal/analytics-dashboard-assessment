import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import { tokens } from "../../themes";

const LocationAnalysis = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="LOCATION ANALYSIS" subtitle="Distribution of EVs by County" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart isDashboard={false} />
      </Box>
    </Box>
  );
};

export default LocationAnalysis;
