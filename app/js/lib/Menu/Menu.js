import React, { Component, Fragment } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;


class Menu1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: ['sub1'],
            rootSubmenuKeys : ['sub1', 'sub2', 'sub4'],
        };
        this.onOpenChange = this.onOpenChange.bind(this);
    }

    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render() {
        const { address } = this.props;
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                theme="dark"
            >
                <Menu.Item key="3">Address</Menu.Item>
                <Menu.Item key="4">{address}</Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                    <Menu.Item key="1">Create</Menu.Item>
                    <Menu.Item key="2">Historys</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
export default Menu1;