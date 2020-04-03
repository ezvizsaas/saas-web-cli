/*
 * @Author: xuqing6@hikvison.com.cn
 * @Date: 2019-07-15 10:30:51
 * @LastEditors: dongwenjuan@hikvison.com.cn
 * @LastEditTime: 2019-09-30 14:10:58
 */
import "isomorphic-fetch";
import { paramSerializer } from "./utils";
// import { provider. } from "./provider/index";
import { singleLoginProvider } from "./provider/index";
import { handleError } from "./utils";

class HttpOpts {
  public headers?: Object;
  public body?: string;
  public method?: string;
}

class Net {
  public async requst(url: string, opts: HttpOpts): Promise<any> {
    this.handleTimeout();
    const options = this.handerOpts(opts);
    return fetch(url, options);
  }

  private handleTimeout() {
    const cacheTime = localStorage.getItem("timeStamp");
    if (
      cacheTime &&
      new Date().getTime() - Number(cacheTime) > 60 * 60 * 1000
    ) {
      singleLoginProvider.gotoLogin();
    }
    localStorage.setItem("timeStamp", String(new Date().getTime()));
  }
  private handerOpts(opts: HttpOpts) {
    const isForm =
      !opts.headers ||
      (!!opts.headers &&
        JSON.stringify(opts.headers).indexOf("x-www-form-urlencoded") > -1);
    const params = {
      clientType: 1,
      // appId: 1,
      ...(opts.body
        ? typeof opts.body === "string"
          ? JSON.parse(opts.body)
          : opts.body
        : {})
    };
    const data: any = {
      method: "POST",
      headers: {
        userType: "enterprise",
        "Content-Type": "application/x-www-form-urlencoded",
        ...(opts.headers || {})
      },
      body: isForm ? paramSerializer(params) : JSON.stringify(params)
    };
    delete opts.body;
    delete opts.headers;
    if (localStorage.getItem("token")) {
      data.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return data;
  }
}

export default new Net();
