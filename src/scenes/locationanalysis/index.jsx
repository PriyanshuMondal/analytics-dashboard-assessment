import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../themes";
import LeafletMap from "../../components/LeafletMap";

const LocationAnalysis = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="LOCATION ANALYSIS" subtitle="EV Distribution by County (Mapped)" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <LeafletMap />
      </Box>
    </Box>
  );
};

export default LocationAnalysis;
