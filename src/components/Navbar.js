import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Navbar = () => {
  let navigate = useNavigate();
  const logout= (e)=>{
    e.preventDefault();
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-light text-danger " data-bs-theme="dark">
        <div className="container-fluid ">
          <a className="navbar-brand " href="#">
            cloudBOOK
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item " style={{ color: 'red' }}>
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item text-danger">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              
            </ul>
            {localStorage.getItem('authToken')?<Link type="button" className="btn btn-warning" to="/profile">Profile</Link>:
<></>
              
            }
            {!localStorage.getItem('authToken')?
            <form className="d-flex" >
            <Link className="btn btn-outline-danger mx-2 " type="submit" to="/signup">
                Singup
              </Link>
              <Link className="btn btn-outline-danger mx-2" type="submit" to="/login">
                Login
              </Link>
              
            </form>:<button className="btn btn-outline-danger mx-2" type="submit" onClick={logout}>
                Logout
              </button>
              
             
            }
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

