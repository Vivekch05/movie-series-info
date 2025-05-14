import React from 'react';

function Loader() {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <div className="loader__spinner-inner"></div>
      </div>
      <p className="loader__text">Loading...</p>
    </div>
  );
}

export default Loader; 