import { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetBiometricsByUserId,
  updateBiometrics,
} from "../../Managers/BiometricManager";
import { Input, Label } from "reactstrap";

export const BiometricsEdit = ({ currentUser }) => {
  const [biometrics, setBiometrics] = useState({});
  const navigate = useNavigate();
  const user = currentUser;
  useEffect(() => {
    GetBiometricsByUserId(currentUser.id).then((data) => setBiometrics(data));
  }, [user]);
  const handleSave = (event) => {
    event.preventDefault();
    const newBiometrics = {
      id: biometrics.id,
      userId: biometrics.userId,
      age: parseInt(biometrics.age),
      weight: parseInt(biometrics.weight),
      height: parseInt(biometrics.height),
    };
    updateBiometrics(newBiometrics).then(navigate("/userprofile"));
  };
  return (
    <div className="coreComponent">
      <div className="backButton">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate(`/userprofile`);
          }}
        />
      </div>
      <Label>Age:</Label>
      <Input
        defaultValue={biometrics.age}
        type="number"
        onChange={(event) => {
          const biometricsCopy = { ...biometrics };
          biometricsCopy.age = event.target.value;
          setBiometrics(biometricsCopy);
        }}
      ></Input>

      <Label>Height:</Label>
      <Input
        defaultValue={biometrics.height}
        type="number"
        onChange={(event) => {
          const biometricsCopy = { ...biometrics };
          biometricsCopy.height = event.target.value;
          setBiometrics(biometricsCopy);
        }}
      ></Input>
      <Label>Weight:</Label>
      <Input
        defaultValue={biometrics.weight}
        type="number"
        onChange={(event) => {
          const biometricsCopy = { ...biometrics };
          biometricsCopy.weight = event.target.value;
          setBiometrics(biometricsCopy);
        }}
      ></Input>
      <button className="exerciseButton" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};
