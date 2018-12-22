import React, { Component, Fragment } from 'react';
import Header2 from './Header/Header';
import Main2 from './Main/Main2';
import { Layout } from 'antd';
import Menu1 from './Menu/Menu';
import {Menu} from "antd/lib/menu";

const {
    Header, Footer, Sider, Content,
} = Layout;


class App2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            address: null,
            storys: [],
        };
        // 获取Tasks
        this.getStorys = this.getStorys.bind(this);
        this.addStorys = this.addStorys.bind(this);
    }

    async getStorys() {
        const { todo } = this.props;
        const Ids = await todo.methods.Get_ids().call();
        const promises = [];
        Ids.forEach((Id) => {
            promises.push(todo.methods.Get_Picture_By_id(Id).call());
        });
        return await Promise.all(promises);
    }

    // struct Picture {
//     string IPFS_hash;
//     string Title;
//     // story
//     string Description;
//     string Type;
//     string Emotion;
//     uint Timestamp;
// }

    async addStorys(ipfs_hash, title, description, type, emotion) {
        console.log("add");
        const { todo } = this.props;
        const receipt = await todo.methods
            .Post_Picture(ipfs_hash, title, description, type, emotion)
            .send({
                from: this.state.accounts[0],
                gas: 1000000
            });
        console.log(receipt);
        console.log("get");
        const storys = await this.getStorys();
        console.log(storys);
        this.setState({storys});
    }


    async componentDidMount(){
        const { web3, todo } = this.props;
        const accounts = await web3.eth.getAccounts();
        const storys = await this.getStorys();
        this.setState({
            accounts,
            address: todo.options.address,
            storys,
        });
    }



    render() {
        const { accounts, address, storys } = this.state;
        if(accounts.length === 0) return <div>Loading...</div>;
        return (
            <Fragment>
                <Layout>
                    <Sider> <Menu1 address = {address} /> </Sider>
                    <Layout>
                        <Header2/>
                        <Content ><Main2
                            storys={storys}
                            addStorys={this.addStorys}
                        /></Content>
                        <Footer>Address: {address}</Footer>
                    </Layout>
                </Layout>
            </Fragment>
        );
    }
}

export default App2;
