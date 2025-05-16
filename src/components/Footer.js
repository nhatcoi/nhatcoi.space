import React, {useEffect, useState} from 'react';
import VisitCounter from "./VisitCounter";

export const Footer = () => {


  // jsx
  return (
    <footer id="footer" className="footer">
      <div className="section-center">
        {/*<p className="footer-text">*/}
        {/*  */}
        {/*</p>*/}
          <VisitCounter />
      </div>
    </footer>
  );
};
