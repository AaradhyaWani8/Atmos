import { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import MarketingSite from "./components/MarketingSite";
import { About, AIInsights, Analytics, Dashboard, Monitoring, Prediction, Recommendations, RiskMap, Warnings } from "./components/DashboardPages";
import { applyTheme } from "./data/climateData";

export default function App() {
  const [inApp, setInApp] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [location, setLocation] = useState("Pune");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

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

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  return !inApp
    ? <MarketingSite onOpenDashboard={openDashboard} theme={theme} onToggleTheme={toggleTheme} />
    : <AppShell page={page} setPage={setPage} location={location} setLocation={setLocation} onExit={() => setInApp(false)} theme={theme} onToggleTheme={toggleTheme}>{pages[page] || pages.dashboard}</AppShell>;
}
