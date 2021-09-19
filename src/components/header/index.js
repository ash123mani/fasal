import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";

import fasal from "../../assets/fasal.svg";
import { logOut } from "../../utils/firebaseUtils";

import "./_style.scss";

const Header = () => {
  const match = useRouteMatch("/login");

  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={fasal} alt="Fasal logo"/>
          <span className="header__title">Fasal</span>
        </Link>
      </div>
      {!match && (
        <div className="header__right">
          <Link to="/add-fasal">
            <PlusSquareOutlined className="header__profile" />
          </Link>
          <Link to="/profile">
            <UserOutlined className="header__profile" />
          </Link>
          <LogoutOutlined
            className="header__profile header__logout"
            onClick={() => logOut()}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
