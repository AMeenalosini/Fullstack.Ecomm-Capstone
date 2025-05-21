/*****************************************************************************************************************/
/****     This code is to RENDER the LOGIN & REGISTRATION form for new/existing users                         ****/
/*****************************************************************************************************************/
/** Step 1: Import the required libraries/code                                                                 ***/
/** Step 2: Create a functional component "Profile"                                                            ***/
/** Step 3: Declare the required state variables and hooks                                                     ***/
/** Step 4: Handle input changes for registration and login forms                                              ***/
/** Step 5: Submit registration form and store token                                                           ***/
/** Step 6: Submit login form and store token                                                                  ***/
/** Step 7: Fetch user details if token is present and redirect to account                                     ***/
/** Step 8: Render Registration and Login forms with basic validation                                          ***/
/*****************************************************************************************************************/

/** Step 1: Import the required libraries/code ***/
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation, useUserQuery } from "../api/ecommApi";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../features/users/userDetailsSlice";

/** Step 2: Create a functional component "Profile" ***/
export default function Profile() {
  /** Step 3: Declare the required state variables and hooks ***/
  const [register] = useRegisterMutation();                    // Register API
  const [login] = useLoginMutation();                          // Login API
  const navigate = useNavigate();                              // For navigation
  const dispatch = useDispatch();                              // For Redux state
  const [showPassword, setShowPassword] = useState(false);    // Toggle password visibility
  /** Step 3a: Input state variables **/
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [e_add, setEmail] = useState("");
  const [ph_no, setPhone] = useState("");
  const [m_add, setMaddress] = useState("");
  const [b_add, setBaddress] = useState("");
  /** Step 3b: Login form state **/  
  const [inputpassword, setIpPassword] = useState("");
  const [inputuser, setIpUser] = useState("");
  const [errors, setErrors] = useState(null);               // Error handling
  const [authToken, setAuthToken] = useState(null);         // Local token state

/** Step 4: Handle changes in registration form **/
  const handleRegChange = (event) => {
    if (errors) {
      setErrors(null);
    }

  const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "mailaddress") {
      setMaddress(value);
    } else if (name === "billaddress") {
      setBaddress(value);
    }
    
  };

/** Step 4b: Handle changes in login form **/
  const handleIpChange = (event) => {
    if (errors) {
      setErrors(null);
    }

  const { name, value } = event.target;

    if (name === "inputuser") {
      setIpUser(value);
    } else if (name === "inputpassword") {
      setIpPassword(value);
    } 
  };

/** Step 5: Handle registration form submit **/
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, data } = await register({ username, password, name, email_address: e_add, mailing_address: m_add, phone_number: ph_no, billing_address: b_add });
      if (error) {
        setErrors("Something went wrong", error);
      return;
    }
  // Store token and trigger user query
    localStorage.setItem("token", data.token);
    setAuthToken(data.token); 
  };

/** Step 6: Handle login form submit **/
  const handleLogin = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ username : inputuser, password : inputpassword });
    if (error) {
      setErrors("Something went wrong", error);
      return;
    }
    // Store token and trigger user query
    localStorage.setItem("token", data.token);
    setAuthToken(data.token); 
  };

/** Step 7: Fetch user details if token exists **/
  const { data: userData, isLoading: isUserLoading, error: userError } = useUserQuery(undefined, {
    skip: !localStorage.getItem("token"), // Skip fetching until token is set
  });

  useEffect(() => {
    if (userError) {
      console.error("User fetch error:", userError);
    }
    if (userData) {
      dispatch(setUserDetails(userData));   // Save to Redux
      navigate("/account");                 // Redirect to Account page
    }
  }, [userData, userError, dispatch, navigate]);

  /** Step 8: Render forms **/
  return (
    <div className = "wrapperStyle">
    <section className="sectionStyle">
      <h2>New User! Register</h2>
      {errors && <p>Error: {errors}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            value={name}
            name="name"
            placeholder="Name"
            onChange={handleRegChange}
          />
        </label>
        <label>
          Username:{" "}
          <input
            value={username}
            name="username"
            placeholder="Username"
            onChange={handleRegChange}
          />
        </label>
        <label>
          Email: {" "}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={e_add}
            onChange={handleRegChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleRegChange}
          />
        </label>
        <div className="showPasswordWrapper">
          <button onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword)}}>
            Show Password
          </button>
        </div>
        <label>
          Phone:{" "}
          <input
            value={ph_no}
            name="phone"
            placeholder="Phone"
            onChange={handleRegChange}
          />
        </label>
        <label>
          Mailing Address:{" "}
          <input
            value={m_add}
            name="mailaddress"
            placeholder="Mailaddress"
            onChange={handleRegChange}
          />
        </label>
        <label>
          Billing Address:{" "}
          <input
            value={b_add}
            name="billaddress"
            placeholder="Billingaddress"
            onChange={handleRegChange}
          />
        </label>
        <input type="submit" className="submitBtn" />
        </form>
    </section>

    <section className="sectionStyle">
    <h2>Existing user! Login</h2>
    {errors && <p>Error: {errors}</p>}
    <form onSubmit={handleLogin}>
      <label>
        Username: {" "}
        <input
          type="text"
          name="inputuser"
          placeholder="Username"
          value={inputuser}
          onChange={handleIpChange}
        />
      </label>
      <label>
        Password:{" "}
        <input
          type={showPassword ? "text" : "password"}
          name="inputpassword"
          placeholder="Password"
          value={inputpassword}
          onChange={handleIpChange}
        />
      </label>
      <div className="showPasswordWrapper">
          <button onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword)}}>
            Show Password
          </button>
       </div>
      <input type="submit" className="submitBtn" />
    </form>
  </section>
  </div>
  );
}