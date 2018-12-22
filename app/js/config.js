import truffle from '../../truffle-config.js';
const ENV = 'development';

// 获取端口号与启动地址
// env 是端口号，函数
const getEthereumUrl = (env) => {
  const network = truffle.networks[env];
  return `http://${network.host}:${network.port}`;
};

// 设置config
const config = {
  ethereumUrl: getEthereumUrl(ENV),
};

// 封装成控件
export default config;