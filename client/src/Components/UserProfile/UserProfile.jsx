import { useEffect, useState } from "react";
import { GetBiometricsByUserId } from "../../Managers/BiometricManager";
import { useNavigate } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";

export const UserProfile = ({ currentUser }) => {
  const [biometrics, setBiometrics] = useState({});
  const [calculatedWeight, setCalculatedWeight] = useState(0);
  const [calculatedHeight, setCalculatedHeight] = useState("");
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

  const calorieCalculatorMale = () => {
    const step1 = 10 * biometrics.weight
    const step2 = 6.25 * biometrics.height
    const step3 = 5*biometrics.age +5
    const step4 = step1 + step2 - step3
    console.log(step4)
  }
  const calorieCalculatorFemale = () => {
    const step1 = 10 * biometrics.weight
    const step2 = 6.25 * biometrics.height
    const step3 = 5*biometrics.age +161
    const step4 = step1 + step2 - step3
    console.log(step4)
  }

  calorieCalculatorMale()
  calorieCalculatorFemale()

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
            onClick={(event) => navigate(`/userprofile/${biometrics.id}`)}
          ></PencilSquare>
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
        <div>
            Calculate Calories?
        </div>
      </div>
    );
  }
};
