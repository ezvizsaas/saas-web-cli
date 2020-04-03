import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./assets/css/reset.less";
import "./assets/css/saastyle.less";
import "./assets/css/common.less";

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "moment/locale/zh-cn";
import { Provider } from "mobx-react";
import store from "./store/index";
import Router from "./router/index";
import SaaSAppLayout from "./components/SaaSAppLayout";

moment.locale("zh-cn");
ReactDOM.render(
  <Provider {...store}>
    <SaaSAppLayout>
      <Router />
    </SaaSAppLayout>
  </Provider>,
  document.getElementById("root")
);
