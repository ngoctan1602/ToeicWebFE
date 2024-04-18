import { Card, Col, Row, Button, ConfigProvider } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faEye, faPen } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
const CardTest = ({ item }) => {
    const navigate = useNavigate();
    return (
        <ConfigProvider
            theme={{
                token: {
                    lineWidth: 2
                },
            }}
        >
            <Card
                onClick={() => navigate(`/test/${item.idTest}`, { state: { id: item.idTest } })}
                // bordered={false}
                hoverable
                style={{ width: 280, minHeight: 200, margin: "8px 8px" }}
                title={setTitle(item.name)}
            >
                <Row gutter={8}>
                    <Col span={16}>Số phần thi</Col>
                    <Col style={{ fontWeight: "bold" }} span={8}>{item.totalPart}</Col>
                </Row>
                <Row gutter={8} >
                    <Col span={16}>Tổng thời gian:</Col>
                    <Col style={{ fontWeight: "bold" }} span={8}>{item.totalQuestion}</Col>
                    {/* <Col span={1} style={{ cursor: 'pointer' }} className="button-card">
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </Col> */}
                </Row>
                <Row gutter={8}>
                    <Col span={16}>Số câu hỏi</Col>
                    <Col style={{ fontWeight: "bold" }} span={8}>{item.totalTime}</Col>
                </Row>
                <Row gutter={8}>
                    <Col span={16}>Số người tham gia</Col>
                    <Col style={{ fontWeight: "bold" }} span={8}>200</Col>
                </Row>

                <Row style={{ marginTop: 12 }}>

                    <Button style={{ width: "100%", borderRadius: 20 }}
                        icon={<FontAwesomeIcon icon={faEye}></FontAwesomeIcon>}
                    >
                        Chi tiết
                    </Button>
                </Row>
            </Card>
        </ConfigProvider>
    );
}
const setTitle = (name) => {
    console.log(name)
    return (
        <div style={{ padding: 8, textAlign: 'center' }}>
            <p>{name}</p>
        </div >
    )
}

export default CardTest;