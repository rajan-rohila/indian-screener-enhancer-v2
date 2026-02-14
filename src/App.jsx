import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import {
  AppLayout,
  SideNavigation,
  TopNavigation,
} from "@cloudscape-design/components";
import Home from "./pages/Home/Home";
import Recommendations from "./pages/Recommendations/Recommendations";
import SunIcon from "./assets/icons/SunIcon";
import MoonIcon from "./assets/icons/MoonIcon";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(true);

  const handleToggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyMode(newMode ? Mode.Dark : Mode.Light);
  };

  return (
    <>
      <div id="h">
        <TopNavigation
          identity={{
            href: "/",
            title: "Indian Screener Enhancer",
          }}
          utilities={[
            {
              type: "button",
              iconSvg: darkMode ? <SunIcon /> : <MoonIcon />,
              ariaLabel: darkMode ? "Switch to light mode" : "Switch to dark mode",
              onClick: handleToggleTheme,
            },
          ]}
          i18nStrings={{
            overflowMenuTriggerText: "More",
            overflowMenuDismissAriaLabel: "Close",
          }}
        />
      </div>
      <AppLayout
        headerSelector="#h"
        toolsHide={true}
        navigationOpen={navOpen}
        onNavigationChange={({ detail }) => setNavOpen(detail.open)}
        navigation={
          <SideNavigation
            activeHref={location.pathname}
            onFollow={(event) => {
              event.preventDefault();
              navigate(event.detail.href);
            }}
            items={[
              { type: "link", text: "Home", href: "/" },
              { type: "link", text: "Recommendations", href: "/recommendations" },
            ]}
          />
        }
        content={
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        }
      />
    </>
  );
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export { AppWithRouter };
