import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    
 <nav className="navbar navbar-expand-lg bg-dark ">
  <div className="container-fluid ">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
      <ul className="navbar-nav">
       
        <li className="nav-item">
          <Link className="nav-link link-light" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to="/user">Add Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to='/book'>Add Books</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    
  )
}
