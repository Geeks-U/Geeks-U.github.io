import axios from "axios";

const githubAxios = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Accept: "application/vnd.github.mercy-preview+json",
    Authorization:
      import.meta.env.MODE !== "production" && import.meta.env.VITE_GITHUB_TOKEN
        ? `token ${import.meta.env.VITE_GITHUB_TOKEN}`
        : "",
  },
  timeout: 10000,
})

// 你可以根据需要加请求拦截器、响应拦截器
githubAxios.interceptors.request.use(config => {
  // 这里可以做一些公共处理，比如加token
  return config;
});

githubAxios.interceptors.response.use(
  response => response,
  error => {
    // 统一处理错误
    return Promise.reject(error);
  }
);

export default githubAxios;
