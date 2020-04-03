import React, { ReactNode } from "react";
import { observer, inject } from "mobx-react";
import "./index.less";
import accountStore from "../../store/accountStore";
import mobxStore from "../../store/index";
import { Button, Modal, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { singleLoginProvider } from "../../api/provider/index";

interface AppHeaderProps {
  accountStore?: accountStore;
  children: ReactNode | string; // 页面内容
}
const { confirm } = Modal;
@inject(mobxStore.accountStore.namespace)
@observer
class AppHeader extends React.Component<AppHeaderProps> {
  componentDidMount() {
    this.initData();
    window.addEventListener("storage", this.tokenListener);
  }

  // 初始化
  initData = () => {
    this.props.accountStore!.getCompanyInfo();
    this.props.accountStore!.getUserInfo();
  };

  // 监听token是否发生变化
  tokenListener = (e?: any) => {
    e.preventDefault();
    if (e.key === "token") {
      message.warning("数据有更新，将进行自动刷新", 2, () => {
        location.href = "/";
      });
    }
  };

  logout = () => {
    confirm({
      centered: true,
      maskClosable: true,
      title: "退出登录",
      content: (
        <div className="ui-basic-dialog__main">
          <p className="ui-basic-dialog__text">确认退出登录？</p>
        </div>
      ),
      okText: "确定",
      okType: "primary",
      cancelText: "取消",
      onOk: this.confirmLogout
    });
  };

  confirmLogout = () => {
    return singleLoginProvider
      .logout()
      .then(_ => {
        singleLoginProvider.gotoLogin();
      })
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(err => {
        singleLoginProvider.gotoLogin();
        return Promise.resolve(false);
      });
  };

  componentWillUnmount() {
    window.removeEventListener("storage", this.tokenListener);
  }
  render() {
    return (
      <div className={`saas-app-layout`}>
        <div className="saas-app-layout__header">
          <div className="saas-app-layout__left">
            <a className="saas-app-layout__logo" href="/mainframe">
              <img
                src={require("./../../assets/images/logo_ezviz.jpg")}
                alt="ezviz"
              />
              <strong>{"企业控制台"}</strong>
            </a>
          </div>
          <div className="saas-app-layout__right">
            <div className="saas-app-layout__nick">
              您好，
              {["管理员，", "创建者，", ""][
                this.props.accountStore!.userInfo.userType || 2
              ] || ""}
              {this.props.accountStore!.userInfo.mobile}
            </div>
            <div className="saas-app-layout__logout">
              <Button type="link" onClick={this.logout}>
                <LogoutOutlined />
                {/* <MfIcon type="iconicn_exitx1" /> */}
                安全退出
              </Button>
            </div>
          </div>
        </div>
        <div className="saas-app-layout__header__h2">
          {/* <img
            src={require("../../assets/images/icn_shebeituoguan.png")}
            alt=""
          /> */}
          设备托管
        </div>
        <div className={`saas-app-layout-main`}>{this.props.children}</div>
      </div>
    );
  }
}

export default AppHeader;
