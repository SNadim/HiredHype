import { Add } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidatesGrid from "../../components/candidates/candidatesGrid.component";
import httpModule from "../../helpers/http.modules";
import { ICandidate } from "../../types/global.typing";
import "./candidates.scss";
const Candidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICandidate[]>("/Candidate/Get")
      .then((res) => {
        setCandidates(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content candidates">
      <div className="heading">
        <h2>candidates</h2>
        <Button variant="outlined" onClick={() => redirect("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : candidates.length === 0 ? (
        <h1>No Candidate</h1>
      ) : (
        <CandidatesGrid data={candidates} />
      )}
    </div>
  );
};

export default Candidates;
