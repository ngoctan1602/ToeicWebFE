import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    PoweroffOutlined,
    LineChartOutlined,
    ReadOutlined,
    TeamOutlined,
    CalendarOutlined,
    UserOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Alert, Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, danger) {
    return {
        key,
        icon,
        children,
        label,
        danger
    };
}
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, useNavigate, Routes } from 'react-router';
import { AdminRouter } from '../router';
import { GlobalStateProvider, useGlobalState } from '../component/common/globaleState';
import { checkUrlOnline } from '../api/BaseAPI';
const items = [
    getItem('Thông tin người dùng', 'admin/account', <UserOutlined />),
    getItem('Thông kê điểm thi', '2', <LineChartOutlined />),
    getItem('Quản lý bài thi', 'sub1', <ReadOutlined />, [
        getItem('Bài thi', 'admin/test', <ReadOutlined />),
        getItem('Tạo mới bài thi', 'admin/test/create', <CalendarOutlined />),
        getItem('Chủ đề / Năm', 'admin/test/year', <CalendarOutlined />)
    ]),
    getItem('Câu hỏi', 'sub2', <QuestionCircleOutlined />, [
        getItem('Tạo mới', 'admin/question'),
        getItem('Quản lý', '8')
    ]),
    getItem('Đăng xuất', '9', <PoweroffOutlined />, null, true),
];
const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    return (

        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                {/* <div className="demo-logo-vertical" /> */}
                <Menu

                    onClick={({ key }) => navigate(`/${key}`)}
                    theme="light"
                    mode="inline"
                    items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}

                >
                    <p style={{ textAlign: 'center', fontSize: '16px' }}>Hệ thống quản lý thông tin dành cho người quản trị</p>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 480,
                            width: '100%',
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
                {/* <ToastContainer /> */}
            </Layout>
        </Layout >


    );
};


// const GetContent = () => {
//     const [routes, setRoutes] = useState([]);
//     useEffect(() => {
//         const routes = [];
//         for (let key in AdminRouter) {
//             let Com = AdminRouter[key].component ? AdminRouter[key].component : null
//             console.log(Com)
//             routes.push(
//                 <Route path={AdminRouter[key].path} element={Com !== null && <Com></Com>}>

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

export default AdminLayout;