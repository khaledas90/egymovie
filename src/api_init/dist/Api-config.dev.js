"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var axiosInstance = _axios["default"].create({
  baseURL: "https://api.themoviedb.org/3/movie",
  headers: {
    Accept: "application/json"
  },
  params: {
    include_adult: false,
    include_video: false,
    language: "en-US",
    sort_by: "popularity.desc",
    api_key: "b861945f893a34d1bf12f51064b87a83"
  }
});

axiosInstance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
var _default = axiosInstance;
exports["default"] = _default;