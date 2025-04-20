import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Vehicles from "./scenes/vehicles";
import Insights from "./scenes/insights";
import EVTypeDistribution from "./scenes/evtypedistribution";
import ModelYearBreakdown from "./scenes/modelyearbreakdown";
import GrowthOverTime from "./scenes/growthovertime";
import FAQ from "./scenes/faq";
import LocationAnalysis from "./scenes/locationanalysis";
import Calendar from "./scenes/calendar";
import Trends from "./scenes/trends";


function App() {
  const [theme, colorMode] = useMode();
  return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/" element={<Dashboard />} /> 
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/evtypedistribution" element={<EVTypeDistribution />} /> 
              <Route path="/insights" element={<Insights />} /> 
              <Route path="/modelyearbreakdown" element={<ModelYearBreakdown />} /> 
              <Route path="/faq" element={<FAQ />} /> 
              <Route path="/growthovertime" element={<GrowthOverTime />} /> 
              <Route path="/locationanalysis" element={<LocationAnalysis />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/trends" element={<Trends />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
