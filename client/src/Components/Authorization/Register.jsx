import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import { CreateUser, login } from "../../Managers/UserManager";
import { ArrowLeft } from "react-bootstrap-icons";

export const Register = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();

    const userProfile = {
      username: username,
      password: password,
      isAdmin: false,
    };
    localStorage.setItem("FitnessAppUser", JSON.stringify(userProfile));
    CreateUser(userProfile)
    navigate("/login");
  };

  return (
    <form className="loginForm">
      <div className="backButton">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate(`login`);
          }}
        />
      </div>
      <fieldset>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </FormGroup>
      </fieldset>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <button className="exerciseButton" onClick={loginSubmit}>Register</button>
      </FormGroup>
    </form>
  );
};
