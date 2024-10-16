import { useEffect, useState } from "react";
import { GetBiometricsByUserId } from "../../Managers/BiometricManager";
import { useNavigate } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";
import { Label, Table, Tooltip } from "reactstrap";

export const UserProfile = ({ currentUser }) => {
  const [biometrics, setBiometrics] = useState({});
  const [calculatedWeight, setCalculatedWeight] = useState(0);
  const [calculatedHeight, setCalculatedHeight] = useState("");
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const navigate = useNavigate();

  useEffect(() => {
    GetBiometricsByUserId(currentUser.id).then((data) => setBiometrics(data));
  }, []);
  const cmToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  };
  useEffect(() => {
    setCalculatedWeight(Math.round(biometrics.weight * 2.20462));
    setCalculatedHeight(cmToFeetInches(biometrics.height));
  }, [biometrics]);

  let maleCalorie = 0;
  let femaleCalorie = 0;

  const calorieCalculatorMale = () => {
    const step1 = 10 * biometrics.weight;
    const step2 = 6.25 * biometrics.height;
    const step3 = 5 * biometrics.age + 5;
    const step4 = step1 + step2 - step3;
    maleCalorie = step4;
  };
  const calorieCalculatorFemale = () => {
    const step1 = 10 * biometrics.weight;
    const step2 = 6.25 * biometrics.height;
    const step3 = 5 * biometrics.age + 161;
    const step4 = step1 + step2 - step3;
    femaleCalorie = step4;
  };

  calorieCalculatorMale();
  calorieCalculatorFemale();

  if (!biometrics.id) {
    return (
      <div className="coreComponent">
        <div>
          <b>{currentUser.username}</b>
        </div>
        <button
          className="exerciseButton"
          onClick={(event) => navigate(`/userprofile/create`)}
        >
          Add Information
        </button>
      </div>
    );
  } else {
    return (
      <div className="coreComponent">
        <div className="topButtonRight">
          <PencilSquare
            size={20}
            id="editTarget"
            onClick={(event) => navigate(`/userprofile/${biometrics.id}`)}
          ></PencilSquare>
          <Tooltip
            isOpen={toolTipOpen1}
            target="editTarget" // Tooltip target matches the Play icon id
            toggle={toggle1}
            placement="top" // You can adjust placement as needed
          >
            Edit
          </Tooltip>
        </div>
        <div>
          <b>{currentUser.username}</b>
        </div>
        <br></br>
        <div>
          <p>
            <b>Age: </b>
            {biometrics.age}
          </p>
          <p>
            <b>Height: </b>
            {calculatedHeight} / {biometrics.height}cm
          </p>
          <p>
            <b>Weight: </b>
            {calculatedWeight}lbs / {biometrics.weight}kgs
          </p>
        </div>
        <br />
        <br/>
        <Label><b>Recommended Daily Calories</b></Label>
        <Table>
          <thead>
            <tr>
              <th>Activity Level</th>
              <th>Male</th>
              <th>Female</th>
            </tr>
          </thead>
            <tbody>
              <tr className="table-info">
                <th scope="row" className="activityLevel">Sedentary</th>
                <td>{Math.round(maleCalorie * 1.2)}</td>
                <td>{Math.round(femaleCalorie * 1.2)}</td>
              </tr>
              <tr className="table-danger" >
                <th scope="row" className="activityLevel">Light</th>
                <td>{Math.round(maleCalorie * 1.375)}</td>
                <td>{Math.round(femaleCalorie * 1.375)}</td>
              </tr>
              <tr className="table-warning">
                <th scope="row" className="activityLevel">Moderate</th>
                <td>{Math.round(maleCalorie * 1.55)}</td>
                <td>{Math.round(femaleCalorie * 1.55)}</td>
              </tr>
              <tr className="table-success">
                <th scope="row" className="activityLevel">Very</th>
                <td>{Math.round(maleCalorie * 1.725)}</td>
                <td>{Math.round(femaleCalorie * 1.725)}</td>
              </tr>
              <tr className="table-primary">
                <th scope="row" className="activityLevel">Extremely</th>
                <td>{Math.round(maleCalorie * 1.9)}</td>
                <td>{Math.round(femaleCalorie * 1.9)}</td>
              </tr>
            </tbody>
        </Table>
      </div>
    );
  }
};
