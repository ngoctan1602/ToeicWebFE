import NotFoundImg from '../../assets/pagenotfound.jpg';
import { Row, Col } from 'antd';
const NotFoundPage = () => {
    return (
        <div style={{
            minHeight: "100vh", position: "relative", display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <img
                style={{ height: 500, width: 500 }}
                src={NotFoundImg}></img>
            <Row gutter={[8, 0]}>
                <Col>
                    Page not found
                </Col>
                <Col>
                    <a style={{ textDecoration: 'underline' }}>Go to home</a>
                </Col>
            </Row>
            {/* <p>Page not found</p> */}
        </div>
    );
}

export default NotFoundPage;