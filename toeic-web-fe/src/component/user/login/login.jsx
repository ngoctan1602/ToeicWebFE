import { Button, Card, Col, Form, Input, Row } from "antd";
import TextValidate from "../../common/validateTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import learn from "../../../assets/learn.jpg"
import { jwtDecode } from 'jwt-decode';
const Login = () => {
    const decoded = jwtDecode("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5udG4yOUBnbWFpbC5jb20iLCJpYXQiOjE3MTM0NDgwMjAsImV4cCI6MTcxMzQ0ODE3MH0.auwV2VUpKDB8q0QZ6OTY3DkyHzS9uQyj8cvDyAAP_HU");
    console.log(decoded)
    console.log(decoded.exp < Date.now() / 1000)
    const propGmail = {
        label: "Gmail",
        name: 'gmail',
        required: true,
    }
    const propPassword = {
        label: 'Mật khẩu',
        name: 'pasword',
        required: true,
        password: true
    }
    const labelColLayout = {
        labelCol: { span: 4 }, // Thiết lập độ rộng của cột nhãn
        wrapperCol: { span: 20 }, // Thiết lập độ rộng của cột input
    };
    const [formLogin] = Form.useForm();
    const login = () => {

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
                    <Button onClick={() => login()} style={{ width: '100%', background: 'red' }}>
                        Đăng nhập
                    </Button>
                </Col>
            </Card>
        </div>
    );
}

export default Login;