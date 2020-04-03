/*
 * @Author: xuqing6@hikvison.com.cn
 * @Date: 2019-07-16 15:35:45
 * @LastEditors: xuqing6@hikvison.com.cn
 * @LastEditTime: 2019-09-24 16:15:03
 */
import { singleLoginProvider } from "./provider/index";
import { message } from "antd";
import config from "./config";

class HttpError {
  public customCode?: Number;
  public httpCode?: Number;
  public message?: String;
  public data?: any;

  constructor(errorObj: {
    customCode?: Number;
    message?: String;
    httpCode?: Number;
    data?: any;
  }) {
    this.customCode = errorObj.customCode;
    this.message = errorObj.message;
    this.httpCode = errorObj.httpCode;
    this.data = errorObj.data;
  }
}

/**
 * @param params 参数
 * @returns {*}   返回导出拼接字符串
 */
function paramSerializer(params: any) {
  if (!params) return "";
  const urlPart = [];
  for (const k in params) {
    if (!params.hasOwnProperty(k)) {
      continue;
    }
    const value = params[k];
    if (value === null || typeof value === "undefined") continue;
    if (Array.isArray(value)) {
      for (let i = 0, l = value.length; i < l; i++) {
        urlPart.push(k + "=" + value[i]);
      }
    } else {
      urlPart.push(k + "=" + value);
    }
  }
  return urlPart.join("&");
}

async function handleError(e: HttpError) {
  let msg = "";
  if (!e.customCode) {
    return;
  }
  if (
    Object.keys(config.specialErrorCode).find(
      code => Number(code) === e.customCode
    )
  ) {
    // 处理特殊的code
  }
  if (config.errorCode.find(code => code === e.customCode)) {
    return Promise.reject(e);
  }

  if (
    e instanceof TypeError ||
    (e.message && e.message.indexOf("fetch") > -1)
  ) {
    msg = "网络错误或服务异常, 请稍后再试";
  }

  return Promise.reject({
    message: msg || e.message || "服务异常"
  });
}
async function parseResponse(res: Response) {
  if (res.status === 401) {
    singleLoginProvider.gotoLogin();
    throw new HttpError({
      httpCode: 401,
      message: "登录过期，请重新登录"
    });
  }
  if (res.status === 404) {
    throw new HttpError({
      httpCode: 404,
      message: "服务异常或网络错误"
    });
  }
  if (String(res.status).indexOf("50") > -1) {
    throw new HttpError({
      httpCode: res.status,
      message: "服务异常或网络错误"
    });
  }
  const result = await res.json();
  if (result.code !== "200") {
    throw new HttpError({
      httpCode: 200,
      customCode: result.code,
      message: result.msg,
      data: result.data
    });
  }
  return result;
}
function handleHttpError(e: any) {
  if (e.customCode === "50043") {
    Promise.reject(e.message);
    return;
  }
  if (
    e instanceof TypeError ||
    (e.message && e.message.indexOf("fetch") > -1)
  ) {
    message.error("网络错误或服务异常, 请稍后再试");
    return;
  }
  if (e.message) {
    message.error(e.message);
  } else {
    message.error("系统错误");
  }
  if (e.message) {
    message.error(e.message);
  } else {
    message.error("系统错误");
  }
}
export {
  paramSerializer,
  handleError,
  HttpError,
  handleHttpError,
  parseResponse
};
