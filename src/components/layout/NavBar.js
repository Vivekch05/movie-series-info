import React from 'react';
//import { Link } from 'react-router-dom';


function Navbar() {
  return (
    // <div>
    //   <nav className="navbar navbar-light bg-dark mb-5">
    //     <div className="container">
    //       <div className="navbar-header">
    //         <Link className="navbar-brand text-white text-xl brand-text" to="/">
    //           MovieSeriesInfo
    //         </Link>
    //       </div>
    //       <ul className="navbar-nav ml-auto text-light d-inline-block">
    //         <li className="nav-item d-inline-block mr-4">
    //           <i className="fab fa-imdb fa-5x" id="imdb-logo" />
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    // </div>
<div className="header">
  <h1>MovieSeriesInfo</h1>
  <i className="fab fa-imdb fa-5x" id="imdb-logo" />
</div>
  );
}

export default Navbar;