import { Suspense, lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";
// import Home from "./components/pages/home/Home.page";

// Import with Lazy loading
import CustomLinearLoader from "./components/custom-linear-progress/CustomLinearLoader.component";
import { ThemeContext } from "./context/theme.context";
const Home = lazy(() => import("./components/pages/home/Home.page"));
const Companies = lazy(
  () => import("./components/pages/companies/Companies.page")
);

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";
  return (
    <div className={appStyle}>
      <h1>
        <Navbar />
      </h1>
      <div className="wrapper">
        <Suspense fallback={<CustomLinearLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
