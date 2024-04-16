import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { icon } from "@fortawesome/fontawesome-svg-core";
const UserAim = () => {
    return (
        <Card
            // loading

            title={setTitle()} bordered={false}
            style={{

                height: "100%",
                backgroundColor: "#EEEEEE"
            }}>
            <Row gutter={8}>
                <Col span={12}>Ngày thi:</Col>
                <Col style={{ fontWeight: "bold" }} span={12}>14/03/2024</Col>
            </Row>
            <Row gutter={8} >
                <Col span={12}>Tới kì thi:</Col>
                <Col style={{ fontWeight: "bold" }} span={11}>0 ngày</Col>
                <Col span={1} style={{ cursor: 'pointer' }} className="button-card">
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}>Mục tiêu:</Col>
                <Col style={{ fontWeight: "bold" }} span={12}>600</Col>
            </Row>
            <Row style={{ marginTop: 12 }}>


                <Button style={{ width: "100%", borderRadius: 20 }}
                    icon={<FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>}
                >
                    Thống kê kết quả
                </Button>
            </Row>
        </Card >
    );
}
const setTitle = () => {
    return (
        <div style={{ padding: 8, textAlign: 'center' }}>
            <Avatar style={{ color: "#EEEEEE", backgroundColor: "#31363F" }} size={64} icon={<UserOutlined />} />
            <p>Day la user name</p>
        </div >
    )
}

export default UserAim;