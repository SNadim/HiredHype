import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.modules";
import { ICreateJobDto, Icompany } from "../../types/global.typing";
import "./jobs.scss";

const levelsArray: string[] = [
  "Intern",
  "Junior",
  "MidLevel",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    level: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState<Icompany[]>([]);
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<Icompany[]>("/company/Get")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
      });
  }, []);
  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === "") {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("/Job/Create", job)
      .then((res) => redirect("/jobs"))
      .catch((err) => console.log(err));
  };
  const handleClickBackBtn = () => {
    redirect("/jobs");
  };
  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New job</h2>
        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levelsArray.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
