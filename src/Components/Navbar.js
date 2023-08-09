import React from 'react'
import {Link,useNavigate,useLocation} from "react-router-dom";

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  // React.useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><i>iNoteBook</i></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active" : " "}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active" : " "}`}  to="/about">About</Link>
        </li>
        
      </ul>
      {! localStorage.getItem('token')?<form className="d-flex">
      <Link className="btn btn-primary mx-2" to="/Login"  role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/Signup" role="button">Sign Up</Link>
      </form> : <button className="btn btn-primary" onClick={handleLogOut} role="button">Log Out</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
