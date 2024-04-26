import { useQuery } from "react-query";
import * as HistorySV from "../../../services/historyServices"
import { Col, Row, Tag } from "antd";
import { useNavigate } from "react-router";

const HistoryOverView = ({ idTest }) => {
    const {
        isLoading,
        isError,
        error,
        data: getHistory
    } = useQuery("history", () => HistorySV.getHistoryByTestAndUser({ idTest: idTest }))
    return (
        <div>
            {/* Day la trang lich su + {idTest} */}
            {
                getHistory && !isLoading && !isError
                && getHistory.data &&
                <GetHistory history={getHistory.data} idTest={idTest}></GetHistory>
            }
        </div>
    );
}

const GetHistory = ({ history, idTest }) => {
    const navigate = useNavigate();
    return (
        <div style={{ width: 'full', padding: 4 }}>
            <p>Lịch sử làm bài của bạn</p>
            <Row style={{ fontSize: 16, fontWeight: '500', margin: '12px 0px' }}>
                <Col span={6}>Ngày làm</Col>
                <Col span={6}>Thời gian làm bài</Col>
                <Col span={6}>Luyện tập</Col>
                <Col span={3} style={{ textAlign: 'center' }}>Kết quả</Col>
                {/* <Col span={6}>Xem chi tiết</Col> */}
            </Row>
            {
                history &&
                history.map((item, index) =>
                    <Row style={{ fontSize: 16, fontWeight: '400', margin: '12px 0px' }} >
                        <Col span={6}>{item.dateCompleted.split("-").reverse().join("-")}
                        </Col>
                        <Col span={6}>{item.totalTime}</Col>
                        <Col span={6} style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                item.partResponses &&
                                item.partResponses.map((part, i) => (
                                    <Tag style={{ margin: 4 }} color="#76885B">{part.name}</Tag>
                                ))
                            }
                        </Col>
                        <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
                            <p>
                                {item.totalCorrect}
                            </p>
                            /
                            <p> {item.totalQuestion}</p>
                        </Col>
                        <Col span={3} >
                            <p onClick={() => navigate(`/history/${item.id}/test/${idTest}`)} style={{ textAlign: 'end', cursor: 'pointer' }} className="pointer-p">
                                Xem chi tiết
                            </p>
                        </Col>
                    </Row>
                )
            }

        </div >
    )
}
export default HistoryOverView;