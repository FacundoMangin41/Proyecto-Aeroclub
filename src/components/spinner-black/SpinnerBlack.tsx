import "./SpinnerBlack.css";
import React, { useState, useEffect } from "react";

export const SpinnerBlack = () => {
  return (
    <div className="spinnerContainer">
      <h3 className="cargando">Cargando...</h3>
      <div className="spinner"></div>
    </div>
  );
};
