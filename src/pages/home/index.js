import React from "react";

import { getFasals } from "../../utils/firebaseUtils";
import Loader from "../../components/loader";

import EmptyList from "./empty-list";
import FasalList from "./fasal-list";

import "./_style.scss";

class Home extends React.Component {
  state = {
    fasals: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    getFasals()
      .then((fasals) => {
        this.setState({ fasals });
        console.log("fasals", fasals)
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { fasals, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="home">
          <Loader />
        </div>
      );
    }

    if (!fasals.length) {
      return (
        <div className="home">
          <EmptyList />
        </div>
      );
    }

    return <FasalList fasals={fasals} />;
  }
}

export default Home;
