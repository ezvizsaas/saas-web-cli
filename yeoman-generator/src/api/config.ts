const hostname = "";

export default {
  whiteURLList: [],
  errorCode: [],
  specialErrorCode: {
    "10002": {
      message: "accessToken 已过期，请重新登录后再试",
    }
  },
  imageUploadUrl: `${hostname}/api/user/auth/upload`,
};
