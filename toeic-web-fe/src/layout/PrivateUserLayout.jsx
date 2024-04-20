import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Route, useNavigate, Routes } from 'react-router';
import { UserRoutes } from "../router"
import { checkExpiredToken } from '../services/authServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

const items = [
    {
        key: '/course',
        label: "Khóa học của tôi",
    },
    {
        key: '/test',
        label: "Đề thi online",
    },

    checkExpiredToken() ? {
        key: '/logout',
        icon: faRightFromBracket
    } :
        {
            key: '/login',
            label: "Đăng nhập",
        }

]
const PrivateUserLayout = ({ children }) => {
    useEffect(() => {
        !checkExpiredToken()
            && navigate('/login')
    }, [])
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const logout = () => {
        navigate('/login')
        localStorage.removeItem("accessToken")
    }
    return (
        <Layout style={{ width: "100%", minHeight: "100vh" }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    onClick={({ key }) => key !== '/logout' ? navigate(`${key}`) : logout()}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}

                    // items={items}
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end', // căn chỉnh các item sang bên phải
                    }}
                >
                    {items.map(item => (
                        <Menu.Item key={item.key} icon={<FontAwesomeIcon icon={item.icon} />}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                    margin: "8px 0px"
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 500,

                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,

                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
            </Footer>
        </Layout>
    );
};

export default PrivateUserLayout;


