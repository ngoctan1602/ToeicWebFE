import { Button, Card, Col, Form, Input, Row } from "antd";
import TextValidate from "../../common/validateTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import learn from "../../../assets/learn.jpg"
import { jwtDecode } from 'jwt-decode';
import CheckValue from "../../common/checkEmtyValue";
import * as AuthSV from '../../../services/authServices'
import UseMutationCustom from "../../common/useMutationCustom";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../common/globaleState";
import { useNavigate } from 'react-router-dom'
const Login = () => {
    // const decoded = jwtDecode("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5udG4yOUBnbWFpbC5jb20iLCJpYXQiOjE3MTM0NDgwMjAsImV4cCI6MTcxMzQ0ODE3MH0.auwV2VUpKDB8q0QZ6OTY3DkyHzS9uQyj8cvDyAAP_HU");
    // console.log(decoded)
    // console.log(decoded.exp < Date.now() / 1000)
    const navigate = useNavigate();
    const propGmail = {
        label: "Gmail",
        name: 'gmail',
        required: true,
    }
    const propPassword = {
        label: 'Mật khẩu',
        name: 'password',
        required: true,
        password: true
    }
    const labelColLayout = {
        labelCol: { span: 4 }, // Thiết lập độ rộng của cột nhãn
        wrapperCol: { span: 20 }, // Thiết lập độ rộng của cột input
    };
    const [formLogin] = Form.useForm();
    const [token, setToken] = useState(null);
    const loginMutation = UseMutationCustom(AuthSV.login,
        "Đăng nhập thành công", "Đăng nhập thất bại", "account", setToken)
    useEffect(() => {
        // Thực hiện các hành động cần thiết khi token thay đổi
        console.log(token)
        if (token !== null) {
            localStorage.setItem("accessToken", token.data.accessToken)
            navigate('/test')
            window.location.reload();
        }
    }, [token]);
    const login = () => {
        formLogin.submit();
        const account = {
            email: formLogin.getFieldValue("gmail"),
            password: formLogin.getFieldValue("password")
        }
        if (CheckValue(account.email) && CheckValue(account.password)) {
            loginMutation.mutate(account)
        }

    }
    return (
        <div style={{
            opacity: 0.9,
            width: '100%', height: 500, display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            background: `url(${learn}) no-repeat center center fixed`,
            backgroundSize: 'cover'
        }}>
            <Card style={{ width: '50%', height: 300, boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px" }}>
                <Col span={24} style={{ fontWeight: 500, fontSize: 16, textAlign: "center", margin: 12 }}>
                    Đăng nhập
                </Col>
                <Form {...labelColLayout} form={formLogin}>
                    <Row>
                        <Col span={24}>
                            <TextValidate prop={propGmail}></TextValidate>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <TextValidate prop={propPassword}></TextValidate>
                        </Col>
                    </Row>
                </Form>
                <Col span={12} offset={6}>
                    <Button onClick={() => login()} style={{ width: '100%' }}>
                        Đăng nhập
                    </Button>
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'center', margin: "8px 0px" }} span={24}>
                    <p>Bạn chưa có tài khoản? </p>
                    <a>Đăng kí ngay</a>
                </Col>
            </Card>
        </div>
    );
}

export default Login;