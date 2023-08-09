
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/Notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';

function App()  {
  const[alert,setAlert] = useState(null);

  const showAlert = (message,type)=> {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert}/>
            <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home  showAlert={showAlert} />}></Route>
                  <Route exact path="/about" element={<About />}></Route>
                  <Route exact path="/Login" element={<Login showAlert={showAlert}/>}></Route>
                  <Route exact path="/Signup" element={<SignUp showAlert={showAlert }/>}></Route>
                </Routes>
            </div>
        </Router>
       </NoteState>
    </>
  );
}

export default App;
