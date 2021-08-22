import React, { Fragment } from "react";

import EmptyList from './empty-list'

import './_style.scss'
const arr = []

const Home = () => {
  return (
    <Fragment>
    <div className="home">
      {!arr.length ? <EmptyList /> : <p>Will come soon</p>}
    </div>
    </Fragment>

  );
};

export default Home;
