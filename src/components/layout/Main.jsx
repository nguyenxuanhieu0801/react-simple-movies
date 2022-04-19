import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Header from "./Header";

const Main = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default Main;
