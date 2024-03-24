import { Suspense, lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";
// import Home from "./components/pages/home/Home.page";

// Import with Lazy loading
import CustomLinearLoader from "./components/custom-linear-progress/CustomLinearLoader.component";
import { ThemeContext } from "./context/theme.context";

const Home = lazy(() => import("./pages/home/Home.page"));
const Companies = lazy(() => import("./pages/companies/Companies.page"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany.page"));
const Jobs = lazy(() => import("./pages/jobs/Jobs.page"));
const AddJob = lazy(() => import("./pages/jobs/AddJob.page"));
const Candidates = lazy(() => import("./pages/candidates/Candidates.page"));
const AddCandidate = lazy(() => import("./pages/candidates/AddJob.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";
  return (
    <div className={appStyle}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany />} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path="add" element={<AddJob />} />
            </Route>
            <Route path="/candidates">
              <Route index element={<Candidates />} />
              <Route path="add" element={<AddCandidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
