import "./App.css";
import { registerUser } from "./services/registerUser";
import { useState } from "react";

export function App() {
  const onSubmit = (data) => {
    onSubmit(data);
  };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [formValidation, setFormValidation]=useState({
    email: undefined,
    name: undefined,
    age: undefined, 
    password: undefined,
    // passwordCheck: undefined,
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();

    (formIsValid && isTermsAccepted) ? registerUser({email, name, age, password}) : null;
  };



  const handleEmailChange = (event) => {
    const value = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato de correo electrónico

    setFormValidation({
      ...formValidation,
      email: value.length === 0 ? "email is required" : !emailRegex.test(value) ? "email is invalid" : "",
    })

    setEmail(value);
  };

  const handleNameChange = (event) => {
    const value=event.target.value;

    setFormValidation({
      ...formValidation,
      name: value.length == 0 ? "name is required":"",
    });

    setName(value);
  };

  const handleAgeChange = (event) => {
    const value=event.target.value;
    const ageRegex=/^\d+$/;
    const ageLimit = 18;

    setFormValidation({
      ...formValidation,
      age: value === "" ? "age is required" : !ageRegex.test(value) ? "age is invalid" : value < ageLimit ? "you must be above 18 to register" : "",
    });

    setAge(value);
  };

  const handlePasswordChange = (event) => {
    const value=event.target.value;

    setFormValidation({
      ...formValidation,
      password: value.length === 0 ? "password is required" : value.length < 5 ? "password is too short": "",
    });

    setPassword(value);
  };

  const handlePasswordCheckChange=(event) => {
    const value=event.target.value;
    
    setFormValidation({
      ...formValidation,
      passwordCheck: value !== password ? "passwords do not match" : "",
    })

    setPasswordCheck(value);
  };

  console.log({formValidation});

  const handleTermsChange = (event) => {
    setIsTermsAccepted(event.target.checked);
  };
  

  const formIsValid = Object.values(formValidation).every((value) => value === "");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
            value={email} 
            onChange={handleEmailChange}
            type="email" 
            placeholder="Email" 
            />
            {formValidation.email && (
              <span style={{color:"red"}}>{formValidation.email}</span>
              )}
          </label>
        </div>
        <div>
          <label>Name
            <input 
            value={name}
            type="text" 
            placeholder="Name"
            onChange = {handleNameChange} 
            />
            {formValidation.name && (
              <span style={{color:"red"}}>{formValidation.name}</span> 
              )}
          </label>
        </div>
        <div>
          <label>Age
            <input 
            value={age}
            type="number" 
            placeholder="Age"
            onChange={handleAgeChange} 
            />
            {formValidation.age && (
              <span style={{color:"red"}}>{formValidation.age}</span>
              )}
          </label>
        </div>
        <div>
          <label>
            Password
            <input
            value={password} 
            type="password" 
            placeholder="Password"
            onChange={handlePasswordChange} 
            />
            {formValidation.password &&(
              <span style={{color: "red"}}>{formValidation.password}</span>
              )}
          </label>
        </div>
        <div>
          <label>
            Password check
            <input
            value={passwordCheck} 
            type="password" 
            placeholder="Password check"
            onChange={handlePasswordCheckChange} 
            />
            {formValidation.passwordCheck && (
              <span style={{color: "red"}}>{formValidation.passwordCheck}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            <input 
            type="checkbox" 
            checked={isTermsAccepted}
            onChange={handleTermsChange}
            />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
        </div>
        <button disabled={!formIsValid || !isTermsAccepted}>Sign up</button>
        {!isTermsAccepted && (
          <span className="error" role="alert">please read and accept the terms and conditions</span>
        )}
      </form>
    </div>
  );
}
