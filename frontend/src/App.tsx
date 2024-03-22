import { useContext } from "react";
import Navbar from "./components/navbar/Navbar.component";
import { ThemeContext } from "./context/theme.context";
const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app";
  return (
    <div className={appStyle}>
      <h1>
        <Navbar />
      </h1>
      <div className="wrapper">Routes</div>
    </div>
  );
};

export default App;
