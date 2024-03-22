import { useEffect, useState } from "react";
import httpModule from "../../../helpers/http.modules";
import { Icompany } from "../../../types/global.typing";
import "./companies.scss";
const Companies = () => {
  const [companies, setCompanies] = useState<Icompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  return <div>Company page</div>;
};

export default Companies;
