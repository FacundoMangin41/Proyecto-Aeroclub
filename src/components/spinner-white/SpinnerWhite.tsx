import "./SpinnerWhite.css";
import React, { useState, useEffect } from "react";

export const SpinnerWhite = () => {
  return (
    <div className="spinnerContainer">
      <h3 className="cargando">Cargando...</h3>
      <div className="spinner"></div>
    </div>
  );
};
