import { handleHttpError } from "../utils";
import qs from "qs";
import config from "../config";
import { resolve } from "dns";
import packageJson from "../../../package.json";

const location = window.location;
class SingleLoginProvider {
  private gettingToken?: Promise<{}>;

  async logout() {
    try {
      const url = "/openauth/logout";
      const headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      };
      const disconf = await this.getDisconf();
      const _config = {
        clientId: disconf.openauth_appkey
      };
      const res = await fetch(url, {
        body: qs.stringify({
          ..._config
        }),
        credentials: "include",
        headers,
        method: "post"
      });
      const result = await res.json();
      return result;
    } catch (e) {
      return handleHttpError(e);
    }
  }

  async getSaasToken(ys7Code: string) {
    try {
      const url = "/api/user/openauth/code/gettoken";
      const body = {
        ys7_code: ys7Code,
        grant_type: 2,
        clientType: 1
      };
      const res = await fetch(url, {
        headers: {
          userType: "enterprise",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        method: "post"
      });
      const result = await res.json();
      return result.data;
    } catch (e) {
      return handleHttpError(e);
    }
  }

  async getDisconf() {
    try {
      const disconf = sessionStorage.getItem("saas-disconf");
      if (disconf) {
        return JSON.parse(disconf);
      } else {
        const url = "/api/user/front/web/config";
        const body = {
          clientType: 1
        };
        const res = await fetch(url, {
          headers: {
            userType: "enterprise",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
          method: "post"
        });
        const result = await res.json();
        if (result && result.data) {
          sessionStorage.setItem("saas-disconf", result.data);
          return JSON.parse(result.data);
        }
      }
    } catch (e) {
      return handleHttpError(e);
    }
  }

  removeEnterpriseStorage() {
    localStorage.removeItem("timeStamp");
    localStorage.removeItem("token");
  }

  saveEnterpriseStorage(token: string) {
    localStorage.removeItem("timeStamp");
    localStorage.setItem("token", token);
  }

  gotoLogin(noRedirect?: any) {
    this.removeEnterpriseStorage();
    let query = "";
    if (process.env.NODE_ENV === "development") {
      return;
    }
    if (!noRedirect) {
      query = `?redirect_uri=${location.origin}/mainframe`;
    }
    if (location.href.indexOf("y.ys7.com") > -1) {
      location.href = `${packageJson.proxy}login`;
    } else {
      location.href = `/login${query}`;
    }
  }

  //
  gotoChildLogin() {
    this.removeEnterpriseStorage();
    location.href = `${location.origin}/sub/login`;
    // location.reload();
  }

  getToken(url?: string) {
    if (this.gettingToken) {
      return this.gettingToken;
    }
    this.gettingToken = new Promise(async (res, rej) => {
      if (localStorage.getItem("token")) {
        res();
        return;
      } else {
        await this.gotoLogin();
        return;
      }
    });
    return this.gettingToken;
  }
}

export default SingleLoginProvider;
