import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import { Form, Link, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { login } from "../../Managers/UserManager";
import { Button } from "bootstrap";

export const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(username, password)
    .then(r => {
        if(r){
            const userProfile = {
                id: r.id,
                username: r.username,
                isAdmin: r.isAdmin
            }
            localStorage.setItem("FitnessAppUser", JSON.stringify(userProfile))
            setIsLoggedIn(true)
            navigate("/")
        } else {
            alert("Invalid username or password")
        }
    })
  }

  return (
    <form>
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
        <button onClick={loginSubmit}>Login</button>
      </FormGroup>
      <em>
        Not registered? <Link to="/register">Register</Link>
      </em>
    </form>
  );
};
