/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Dropdown } from 'antd';
import "./index.css"
import { Route, Switch, Redirect } from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import router from '../../utils/router';
import ProjectList from '../projectList';

const { SubMenu } = Menu;
const { Sider, Header, Content, Footer } = Layout;

// 所有二级路由
const routerSecond = ()=>router.reduce((prev, next) => {
    if (next?.children) {
        prev.push(next?.children)
    }
    return prev
},[]);
const Home = ({ history = () => { } }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    {router.map(oneRouter=>{
                        const {breadcrumbName, path, Icons, children} = oneRouter || {}
                        if(!children){
                            return <Menu.Item key={path} icon={Icons} >{breadcrumbName}</Menu.Item>
                        }
                        return <SubMenu key={path} title={breadcrumbName}>
                        {children.map(secondRouter=>{
                            const {breadcrumbName, path, Icons} = secondRouter || {}
                            return <Menu.Item key={path} icon={Icons} >{breadcrumbName}</Menu.Item>
                        })}
                    </SubMenu>
                    })}
                    
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: '100vh' }}>
                            {router.map((item, index) => (
                                <Route
                                    path={item.path}
                                    component={item.component}
                                    exact
                                    key={index}
                                />
                            ))}
                            <Redirect from="/home" to='/home/projectList' />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Home;