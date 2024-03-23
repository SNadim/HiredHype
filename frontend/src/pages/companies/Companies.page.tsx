import { Add } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompaniesGrid from "../../components/companies/CompaniesGrid.component";
import httpModule from "../../helpers/http.modules";
import { Icompany } from "../../types/global.typing";
import "./companies.scss";
const Companies = () => {
  const [companies, setCompanies] = useState<Icompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  useEffect(() => {
    setLoading(true);
    httpModule
      .get<Icompany[]>("/company/Get")
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content companies">
      <div className="heading">
        <h2>Companies</h2>
        <Button variant="outlined" onClick={() => redirect("/companies/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : companies.length === 0 ? (
        <h1>No Company</h1>
      ) : (
        <CompaniesGrid data={companies} />
      )}
    </div>
  );
};

export default Companies;
