import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  
    const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password ,cpassword} = credentials;
    if (password !== cpassword) {
     props.showAlert("Password doesn't match","danger")
    }
    else{
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);

    //Redirect to the home page after sign up
    localStorage.setItem('token', json.authToken);
    navigate("/");
    props.showAlert("Created New Account Successfully","success");
  }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="mt-2 my-3">
      <h1 className="container mx-4" >SignUp to create a new account</h1>
      <form className="container mx-1 mx-md-4" onSubmit={handleSubmit}>

        <div className="d-flex flex-row align-items-center mb-4">
          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" className="form-control" onChange={onChange} />

          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" className="form-control" onChange={onChange} />

          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" onChange={onChange} autoComplete="on" minLength={5} required />

          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="cpassword">Repeat your password</label>
            <input type="password" id="cpassword" name="cpassword" className="form-control" onChange={onChange} autoComplete="on" minLength={5} required />
          </div>
        </div>


        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </div>

      </form>


    </div>
  )
}

export default SignUp

