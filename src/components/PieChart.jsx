import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../themes";
import { useTheme } from "@mui/material";
import { evPieTypeData } from "../data/evPieTypeData";

const PieChart = ({ dataset = "evPieTypeData" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = dataset === "evPieTypeData" ? evPieTypeData : [];

  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: { text: { fill: colors.grey[100] } },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      enableArcLabels={false}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
