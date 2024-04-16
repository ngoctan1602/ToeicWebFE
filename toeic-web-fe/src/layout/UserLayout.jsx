import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Route, useNavigate, Routes } from 'react-router';
import { UserRoutes } from "../router"

const items = [
    {
        key: '/course',
        label: "Khóa học của tôi",
    },
    {
        key: '/test',
        label: "Đề thi online",
    },
    {
        key: '/login',
        label: "Đăng nhập",
    }
]
const UserLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
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
                    onClick={({ key }) => navigate(`${key}`)}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end', // căn chỉnh các item sang bên phải
                    }}
                />
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

// const GetContent = () => {
//     const [routes, setRoutes] = useState([]);
//     useEffect(() => {
//         const routes = [];
//         for (let key in UserRoutes) {
//             let Com = UserRoutes[key].component ? UserRoutes[key].component : null
//             console.log(Com)
//             routes.push(
//                 <Route path={UserRoutes[key].path} element={Com !== null && <Com></Com>}>

//                 </Route >)
//             console.log(key)
//         }
//         setRoutes(routes)
//     }, [])
//     return (
//         <div style={{ minheight: '480px', width: '100%' }}>
//             <Routes>
//                 {
//                     routes.length > 0 &&
//                     routes.map((item, index) => (
//                         item
//                     ))
//                 }

//             </Routes>
//         </div>
//     )
// }
export default UserLayout;


