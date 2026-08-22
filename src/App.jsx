import { useState } from "react";
import AppShell from "./components/AppShell";
import MarketingSite from "./components/MarketingSite";
import { About, AIInsights, Analytics, Dashboard, Monitoring, Prediction, Recommendations, RiskMap, Warnings } from "./components/DashboardPages";

export default function App() {
  const [inApp, setInApp] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [location, setLocation] = useState("Pune");

  const openDashboard = (target) => {
    setInApp(true);
    if (target) setPage(target.toLowerCase().replace(" ", ""));
  };

  const pages = {
    dashboard: <Dashboard location={location} setPage={setPage} />,
    monitoring: <Monitoring location={location} />,
    prediction: <Prediction location={location} />,
    riskmap: <RiskMap location={location} setLocation={setLocation} setPage={setPage} />,
    warnings: <Warnings location={location} />,
    analytics: <Analytics location={location} />,
    ai: <AIInsights key={location} location={location} />,
    recommendations: <Recommendations />,
    about: <About />,
  };

  return !inApp ? <MarketingSite onOpenDashboard={openDashboard} /> : <AppShell page={page} setPage={setPage} location={location} setLocation={setLocation} onExit={() => setInApp(false)}>{pages[page] || pages.dashboard}</AppShell>;
}
