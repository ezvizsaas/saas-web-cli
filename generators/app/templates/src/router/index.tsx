import React, { Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../page/Home/index";
// import MfHeader from './components/MfHeader/index';
// import Loading from './components/Loading';
// import RouterAuth from "./RouterAuth";

export default () => {
  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <Suspense fallback={<div />}>
        <Route path="/" component={Home} />
      </Suspense>
    </Router>
  );
};
