import Web3 from 'web3';
import { ethereumUrl } from './config';
// 获取智能合约
//import artifact from '../../contracts/Notepad_con.sol';
import artifact from '../../contracts/File_Image_storage.sol'

// 创建一个web3服务
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUrl));
// const networks = Object.keys(artifact.networks);
// const network = networks[networks.length - 1];
// console.log(network);
// console.log(networks);
// var { address } = artifact.networks[network];
// console.log(address);
// console.log(artifact.abi);
// // 生成智能合约
// const todo = new web3.eth.Contract(artifact.abi, address);


const networks2 = Object.keys(artifact.networks);
const network2 = networks2[networks2.length - 1];
console.log("networks2", networks2);
console.log("networks", network2);
var { address } = artifact.networks[network2];

const todo2 = new web3.eth.Contract(artifact.abi, address);
console.log("address2", address);


export default { web3, todo2};
