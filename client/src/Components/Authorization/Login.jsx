import { useEffect, useState } from "react";
import { FormGroup } from "react-bootstrap";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { GetAllUsers, login } from "../../Managers/UserManager";
import { Button } from "bootstrap";
import "./Authorization.css"

export const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetAllUsers().then((data) => setUsers(data))
  }, [])

  const showInvalidLoginSnackbar = () => {

    
    var x = document.getElementById("invalidLogin");
    
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
   if(sameUser === false){
    showInvalidLoginSnackbar();
   } else {
     login(username, password)
     .then(r => {
         if(r){
             const userProfile = {
                 id: r.id,
                 username: r.userName,
                 isAdmin: r.isAdmin
             }
             localStorage.setItem("FitnessAppUser", JSON.stringify(userProfile))
             setIsLoggedIn(true)
             navigate("/home")
         }
     })

   }
  }

  const location = useLocation();

  useEffect(() => {
    // Check if the location state contains a message
    if (location.state && location.state.message) {
      // Display the snackbar
      const snackbar = document.getElementById("savedLogin");
      snackbar.className = "show"; // Add the "show" class to display the snackbar

      // Hide the snackbar after 3 seconds
      setTimeout(() => {
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000);
    }
  }, [location]);

  return (
    <form className="loginForm">
      <div id="savedLogin">User created. Please login.</div>
      <h1>trAIner</h1>
      <div id="invalidLogin">Invalid username or password.</div>
      <fieldset>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </FormGroup>
      </fieldset>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <button className="exerciseButton" onClick={loginSubmit}>Login</button>
      </FormGroup>
      <em>
        Not registered? <Link to="/register">Register</Link>
      </em>
    </form>
  );
};
