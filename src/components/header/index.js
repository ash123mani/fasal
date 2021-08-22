import React from 'react';
import { Link } from "react-router-dom";

import img from "../../assets/tree.png"

import './_style.scss'

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={img} />
          <span className="header__title">Fasal</span>
        </Link>
      </div>
    </div>
  )
}

export default Header
