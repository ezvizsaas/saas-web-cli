/*
 * @Author: dongwenjuan@hikvison.com.cn
 * @Date: 2019-10-18 14:09:04
 * @LastEditors: dongwenjuan@hikvison.com.cn
 * @LastEditTime: 2019-10-18 14:36:19
 */

import { handleHttpError, parseResponse } from "../utils";
import net from "../net";

// 根据组织id查询组织详情
interface OrgDetailParams {
  id: number; //	组织id
}

// 根据组织id查询组织列表
interface OrgTreeParams {
  parentId: number; //	传入该节点的组织ID，顶级节点不用传	(主框架和应用顶级节点除外)
  companyId?: number; //	企业ID（没有传， 默认为登录企业ID）
  appId?: number; //	 用于区分是主框架调用接口还是应用调用接口 （0：默认主框架， 其他：应用）
}

// 获取某个机构的成员列表
interface MemberParams {
  companyId?: number; // 企业ID（没有传， 默认为登录企业ID）
  pageNo: number; // 第几页
  pageSize: number; // 每页的数量
  orgId: number; // 机构ID
  userName?: string; // 姓名，模糊搜索
  queryType?: number; // 查询方式，默认为0，查询直属的成员，（0：直属成员；1：包含子组织成员）
  applyStatus?: number; // 申请状态，为空不传，代表全部，0：已邀请;1:已同意;2:拒绝
}

const api = {
  userInfo: "/api/user/member/login/info", // 查询登录用户的详情
  company: "/api/user/company/info/get", // 获取某个企业信息的详情
  orgDetail: "/api/org/info", // 根据组织树详情
  orgTree: "/api/org/tree", // 根据组织树列表
  memberList: "/api/user/member/list/page" // 获取某个机构的成员列表
};

class AccountProvider {
  // 查询登录用户的详情
  async userInfo() {
    try {
      const url = api.userInfo;
      const res = await net.requst(url, {
        headers: {
          userType: "enterprise",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({}),
        method: "post"
      });
      return parseResponse(res);
    } catch (e) {
      return handleHttpError(e);
    }
  }

  // 获取某个企业信息的详情
  async companyInfo() {
    try {
      const url = api.company;
      const res = await net.requst(url, {
        headers: {
          userType: "enterprise",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({}),
        method: "post"
      });
      return parseResponse(res);
    } catch (e) {
      return handleHttpError(e);
    }
  }

  // 根据组织树详情
  async orgDetail(data: OrgDetailParams) {
    try {
      const url = api.orgDetail;
      const res = await net.requst(url, {
        headers: {
          userType: "enterprise",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "post"
      });
      return parseResponse(res);
    } catch (e) {
      return handleHttpError(e);
    }
  }

  // 根据组织树列表
  async orgTree(data: OrgTreeParams) {
    try {
      const url = api.orgTree;
      const res = await net.requst(url, {
        headers: {
          userType: "enterprise",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "post"
      });
      return parseResponse(res);
    } catch (e) {
      return handleHttpError(e);
    }
  }

  // 获取某个机构的成员列表
  async memberList(data: MemberParams) {
    try {
      const url = api.memberList;
      const res = await net.requst(url, {
        headers: {
          userType: "enterprise",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "post"
      });
      return parseResponse(res);
    } catch (e) {
      return handleHttpError(e);
    }
  }
}

export default new AccountProvider();
