import React, { Fragment } from "react";

import useProvideAuth from "../../hooks/useProvideAuth";
import authContext from "./context.js";
import Loader from "../loader";
import Header from "../header"

import "./_style.scss";

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth() || {};

  const { isLoading } = auth;

  if (isLoading) {
    return (
      <Fragment>
        <Header />
        <div className="base-loader">
          <Loader />
        </div>
      </Fragment>
    );
  }

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default ProvideAuth;
