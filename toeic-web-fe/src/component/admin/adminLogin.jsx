import { Form } from "antd";
import TextValidate from "../common/validateTextInput";
const AdminLogin = () => {
    const propUserName = {
        name: 'username',
        label: "Tên đăng nhập",
        required: true,
    }
    const propPassword = {
        name: 'password',
        label: "Mật khẩu",
        required: true,
    }
    return (
        <div style={{
            width: "100%", minHeight: "100vh", display: "flex",
            alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                width: "80%", minHeight: 400, boxShadow: 1, display: "flex",
                justifyContent: "center"
            }}>
                <Form style={{
                    width: "80%"
                }} >
                    <TextValidate prop={propUserName}></TextValidate>
                    <TextValidate prop={propPassword}></TextValidate>
                </Form>
            </div>
        </div >
    );
}

export default AdminLogin;