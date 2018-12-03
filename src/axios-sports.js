import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.foxsmart.cn/api/edu/"
});

// instance.defaults.headers.common["authorization"] =
//   "Basic YmlsbGIyMTEyOnl5ZXl5ZSQx";

export default instance;
