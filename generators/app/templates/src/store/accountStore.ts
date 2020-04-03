import { observable, action } from "mobx";
import { accountProvider } from "../api/provider/index";

interface CompanyInfo {
  businessEntity: string;
}
interface UserInfo {
  companyUserName: string;
  mobile: string;
  userType: number;
}

export default class AccountStore {
  namespace = "accountStore";
  @observable
  companyInfo: CompanyInfo = {
    businessEntity: ""
  };
  @observable
  userInfo: UserInfo = {} as UserInfo;

  @action
  async getCompanyInfo() {
    try {
      const res = await accountProvider.companyInfo();
      this.companyInfo = res.data;
    } catch (error) {}
  }

  @action
  async getUserInfo() {
    try {
      const res = await accountProvider.userInfo();
      this.userInfo = res.data;
    } catch (error) {}
  }
}
