import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import LeafletMap from "../../components/LeafletMap";
import PieChart from "../../components/PieChart";
import { VehiclesData } from "../../data/vehiclesData";

// Utility function to export array of objects as CSV
const downloadCSV = (data, filename = "ev-report.csv") => {
  const csvContent = [
    Object.keys(data[0]).join(","), // headers
    ...data.map(row => Object.values(row).join(",")), // rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your EV Dashboard" />
        <Box>
          <Button
            onClick={() => downloadCSV(VehiclesData, "EV_Report.csv")}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="32,000+" subtitle="EV Registrations" progress="0.75" increase="+14%" icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="80+" subtitle="EV Makes" progress="0.50" increase="+21%" icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="200+" subtitle="Unique Models" progress="0.30" increase="+5%" icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="50+" subtitle="Counties Covered" progress="0.80" increase="+43%" icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>

        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex " justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                EV Registration Growth
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Since 2010
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} dataset="evLineData" />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Model Year Breakdown
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} dataKey="count" labelKey="year" dataset="evModelYearData" />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
            Top Makes
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} dataKey="count" labelKey="make" dataset="evBarMakeData" />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} padding="30px">
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
            Location Map
          </Typography>
          <Box height="200px">
            <LeafletMap />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} padding="30px">
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
            EV Type Breakdown
          </Typography>
          <Box height="200px">
            <PieChart dataset="evPieTypeData" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
