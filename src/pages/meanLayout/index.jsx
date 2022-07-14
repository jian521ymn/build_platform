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

const routerSecond = () => {
    return router.reduce((all, next) => {
        if (next.children) {
            return [...all, ...next.children]
        }
        return all
    }, [])
}
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
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                  }}
            >
                <div className="logo" />
                <Menu 
                    theme="dark" 
                    mode="inline" 
                    // defaultSelectedKeys={} 
                    onSelect={({ item, key, keyPath, selectedKeys, domEvent })=>{
                        console.log(item, key, keyPath, selectedKeys, domEvent);
                        history.push(key)
                    }}
                >
                    {router.map(oneRouter=>{
                        const {breadcrumbName, path, Icons, children, unShow} = oneRouter || {}
                        if(!children){
                            return !unShow && <Menu.Item key={path} icon={Icons} >{breadcrumbName}</Menu.Item>
                        }
                        return <SubMenu key={path} title={breadcrumbName}>
                        {children.map(secondRouter=>{
                            const {breadcrumbName, path, Icons, unShow} = secondRouter || {}
                            return !unShow && <Menu.Item key={path} icon={Icons} >{breadcrumbName}</Menu.Item>
                        })}
                    </SubMenu>
                    })}
                    
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header className="site-layout-sub-header-background" style={{
                    position: 'fixed',
                    left: '216px',
                    top: '0',
                    bottom: 0,
                    padding:0,
                    width:'100vw',
                    zIndex:'100'
                  }} />
                <Content style={{ margin: '80px 0 16px 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: '100vh' }}>
                            {routerSecond().map((item, index) =>{
                                const props =item?.props || {}
                                return  (
                                    <Route
                                        path={item.path}
                                        exact
                                        key={index}
                                    >
                                        <item.component {...props} history={history} />
                                    </Route>
                                )
                            })}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Home;