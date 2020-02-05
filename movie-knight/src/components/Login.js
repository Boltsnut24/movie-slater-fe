import React, {useState} from 'react';
import { login } from '../actions/index';
import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";

//Oauth//
import ReactDOM from 'react-dom';
import GoogleLogin, {GoogleLogout} from 'react-google-login';

const Login = props =>{

        const [loginInfo, setLogininfo] = useState({ email: "", password: "" });

        const [logged, setLogged] = useState({ logged: false });

        const handleSubmit = event => {
          event.preventDefault();
          props.login(loginInfo)
          // .then(() => props.history.push('/'))
          props.history.push('/')
          setLogininfo({ email: "", password: "" });
        };

        const handleChange = event => {
          setLogininfo({ ...loginInfo, [event.target.name]: event.target.value });
        };

        //Oauth
        const responseGoogle = (response) => {
          console.log("what we are getting back from google",response);
          const { tokenId, profileObj } = response;
          localStorage.setItem("token", tokenId);
          localStorage.setItem("user_email", profileObj.email);
          localStorage.setItem("user_name", profileObj.name);
          setLogged({logged:true});
        }

        const logoutGoogle = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_name");
          setLogged({logged:false});
        }
        //Oauth      
    return(
        <div>
          <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br/>
          <input
            required
            type="text"
            name="email"
            placeholder="email"
            value={loginInfo.email}
            onChange={handleChange}
            />
          <br/>
          <label>Password</label>
          <br/>
          <input
            required
            type="password"
            name="password"
            placeholder="password"
            value={loginInfo.password}
            onChange={handleChange}
            />
          <br/>
          <button type='submit'>Log In</button>
        </form>

        {/* Oauth */}
        <GoogleLogin
          clientId="1058848707297-n2rl4b301ivq0gipo2pbenr80sa5mtp2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />

        <GoogleLogout
          clientId="1058848707297-n2rl4b301ivq0gipo2pbenr80sa5mtp2.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logoutGoogle}
        >
        </GoogleLogout>
        {/* Oauth */}
        </div> 
    )

}

const mapStateToProps = state => {
  return {
      userData: state.userData
  };
};

export default connect(mapStateToProps, { login })(Login)