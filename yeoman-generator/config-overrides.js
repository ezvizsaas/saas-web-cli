/*
 * @Author: xuqing6@hikvison.com.cn
 * @Date: 2019-06-13 10:56:37
 * @LastEditors: xuqing6@hikvison.com.cn
 * @LastEditTime: 2019-09-06 16:22:14
 */
const {
  override,
  fixBabelImports,
  disableEsLint,
  addPostcssPlugins,
  addDecoratorsLegacy,
  addLessLoader
} = require("customize-cra");

module.exports = override(
  disableEsLint(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "project": "saas-app",
      "@primary-color": "#658FFF",
      "@tree-title-height": "44px",
      "@input-height-lg": "48px"
    },
    localIdentName: "[local]--[hash:base64:5]"
  }),
  addDecoratorsLegacy()
);
