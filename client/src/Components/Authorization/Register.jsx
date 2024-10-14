import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { CreateUser, GetAllUsers, login } from "../../Managers/UserManager";
import { ArrowLeft } from "react-bootstrap-icons";

export const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetAllUsers().then((data) => setUsers(data));
  }, []);

  const showRejectionSnackbar = () => {

    
    var x = document.getElementById("rejection");
    
    // Add the "show" class to DIV
    x.className = "show";
    
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  const showValidationSnackbar = () => {

    
    var x = document.getElementById("validation");
    
    // Add the "show" class to DIV
    x.className = "show";
    
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    let sameUser = false;
    
   users.some((u) => {
    if( u.userName === username){
      return sameUser = true
    }
   })

    if(sameUser){
      showRejectionSnackbar();
      
    } else if (username === "" || password === ""){
      showValidationSnackbar();
    }
    else{
      showApprovalSnackbar();
      const userProfile = {
        username: username,
        password: password,
        isAdmin: false,
      };
      localStorage.setItem("FitnessAppUser", JSON.stringify(userProfile));
      CreateUser(userProfile).then(login(username, password)).then(setIsLoggedIn(true)).then(navigate("/"));
    }


    
  };

  return (
    <Form className="loginForm">
      <div id="rejection">Username taken.</div>
      <div id="validation">Please fill out all fields.</div>
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
            required
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </FormGroup>
      </fieldset>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <button className="exerciseButton" onClick={(e) => loginSubmit(e)}>
          Register
        </button>
      </FormGroup>
    </Form>
  );
};
