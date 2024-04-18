import { Row, Col, Skeleton, Button, Divider, Card } from "antd";
import UserAim from "../common/useraim";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as TopicSV from '../../../services/topicService'
import * as YearSV from '../../../services/yearService'
import * as TestSV from '../../../services/testServices'
import { Input, Space } from 'antd';
import CardTest from "./cardTest";
const { Search } = Input;
const Test = () => {
    const [topicSelected, setTopicSelected] = useState(0);
    const [yearSelected, setYearSelected] = useState(0);
    return (
        <div style={{
            width: "100%",
        }}>
            < Row style={{
                minHeight: 300
            }} gutter={[8, 8]} >
                <Col style={{
                    fontSize: 20,
                    padding: 8
                }} span={18}>
                    Thư viện đề thi
                    <Row
                        style={{

                            minHeight: 40
                        }}>
                        <Col span={24}
                        >
                            <GetAllTopic topicSelected={{ topicSelected: topicSelected, setTopicSelected: setTopicSelected }} setYearSelected={setYearSelected} />
                        </Col>
                        <Col span={24}
                            style={{ minHeight: "100px" }}
                        >
                            <GetYearByTopic topicSelected={topicSelected} yearSelected={{ yearSelected: yearSelected, setYearSelected: setYearSelected }} />
                        </Col>
                        <Col span={22}
                        >
                            <Search
                                placeholder="Nhập từ khóa muốn tìm kiếm:"
                                allowClear
                                size="large"
                                onSearch={(values) => console.log(values)}
                            // onSearch={onSearch}
                            />
                        </Col>
                    </Row>

                </Col>
                <Col style={{ fontSize: 20, padding: 8 }} span={6}>
                    <UserAim></UserAim>
                </Col>
                <Col span={24}>
                    <div style={{ width: "100%", height: 2, backgroundColor: "rgba(17, 17, 26, 0.05)" }}></div>
                </Col>
            </Row >
            <Row style={
                {
                    // background: "red",
                    minHeight: 300
                }
            }>
                {
                    topicSelected !== 0 && yearSelected !== 0 ?

                        <GetTestByYearAndTopic topicSelected={topicSelected} yearSelected={yearSelected}></GetTestByYearAndTopic>
                        : <p>Không có đề thi</p>
                }
            </Row>
        </div >
    );
}
const GetTestByYearAndTopic = ({ topicSelected, yearSelected }) => {
    const { isLoading, isError, error, data: getTestByYearAndTopic, refetch } = useQuery(
        ["getTestByYearAndTopic", topicSelected, yearSelected], // Cung cấp một khóa duy nhất cho truy vấn
        () => TestSV.getTestByYearAndTopic({
            idTopic: topicSelected !== 0 && topicSelected,
            idYear: yearSelected !== 0 && yearSelected
        }),
        {
            enabled: !!topicSelected || !!yearSelected, // Kích hoạt truy vấn chỉ khi topicSelected có giá trị
            refetchOnWindowFocus: false, // Tắt tự động truy vấn lại khi cửa sổ nhận lại tiêu điểm
        }
    );

    useEffect(() => {
        if (!isLoading && !isError && getTestByYearAndTopic != undefined) {
            if (getTestByYearAndTopic.data != null) {
                setTest(getTestByYearAndTopic.data);
            }
            else if (getTestByYearAndTopic.data === null)
                setTest([])

        }
    }, [isLoading, isError, getTestByYearAndTopic]);

    useEffect(() => {
        // Truy vấn lại khi topicSelected thay đổi
        if (topicSelected || yearSelected) {
            refetch();
        }
    }, [topicSelected, yearSelected, refetch]);
    const [test, setTest] = useState([]);
    return (
        <div>
            {
                isLoading ?
                    <Skeleton active paragraph={{ rows: 2 }}
                        title={false}
                        className="custom-skeleton"
                        style={{ width: "600px" }}
                    />
                    : (!isError && test.length > 0) ?

                        <div style={{ padding: 8, display: "flex", flexWrap: 'wrap' }}>
                            {
                                test.map((item, index) => (
                                    <CardTest item={item}></CardTest>
                                ))
                            }
                        </div>
                        :
                        <p style={{ marginTop: 16, fontSize: 16 }}>Không có đề thi thuộc chủ đề </p>
            }
        </div>
    )
}

const GetYearByTopic = ({ topicSelected, yearSelected }) => {
    const { isLoading, isError, error, data: getYearByTopic, refetch } = useQuery(
        ["getYearByTopic", topicSelected], // Cung cấp một khóa duy nhất cho truy vấn
        () => YearSV.getYearByTopicId({ idTopic: topicSelected !== 0 && topicSelected }),
        {
            enabled: !!topicSelected, // Kích hoạt truy vấn chỉ khi topicSelected có giá trị
            refetchOnWindowFocus: false, // Tắt tự động truy vấn lại khi cửa sổ nhận lại tiêu điểm
        }
    );

    useEffect(() => {
        if (!isLoading && !isError && getYearByTopic != undefined) {
            if (getYearByTopic.data != null)
                setYear(getYearByTopic.data);
            else if (getYearByTopic.data === null)
                setYear([])

        }
    }, [isLoading, isError, getYearByTopic]);

    useEffect(() => {
        // Truy vấn lại khi topicSelected thay đổi
        if (topicSelected) {
            refetch();
        }
    }, [topicSelected, refetch]);
    const [year, setYear] = useState([]);
    return (
        <div >
            {
                isLoading ?
                    <Skeleton active paragraph={{ rows: 2 }}
                        title={false}
                        className="custom-skeleton"
                        style={{ width: "600px" }}
                    />
                    : (!isError && year.length > 0) ?
                        <div className="flex-display">
                            {
                                year.map((item, index) => (
                                    <p style={{ background: item.id === yearSelected.yearSelected && "#CCD3CA" }}
                                        key={index} className="p-flex"
                                        onClick={() => yearSelected.setYearSelected(item.id)}>
                                        {item.year}
                                    </p>
                                ))
                            }
                        </div>
                        :
                        <p style={{ marginTop: 16, fontSize: 16 }}>Không có năm thuộc chủ đề </p>
            }

        </div>
    )
}
const GetAllTopic = ({ topicSelected, setYearSelected }) => {
    const onChangeTopicSelected = (values) => {
        topicSelected.setTopicSelected(values),
            setYearSelected(0)
    }
    const {
        isLoading,
        isError,
        error,
        data: getTopic
    } = useQuery("getTopic", TopicSV.getTopic)
    useEffect(() => {
        if (!isLoading && !isError && getTopic.data !== undefined) {
            setTopic(getTopic.data)
        }
    }, [isLoading, isError, getTopic])
    const [topic, setTopic] = useState([]);

    return (
        <div>
            {
                isLoading ?
                    <Skeleton active paragraph={{ rows: 2 }}
                        title={false}
                        className="custom-skeleton"
                        style={{ width: "600px" }}
                    />
                    : (!isError && topic.length > 0) ?
                        <div className="flex-display">
                            {
                                topic.map((item, index) => (
                                    <p style={{ background: item.id === topicSelected.topicSelected && "#CCD3CA" }} key={index} className="p-flex" onClick={() => onChangeTopicSelected(item.id)}>{item.name}</p>
                                ))
                            }
                        </div>
                        :
                        <p style={{ marginTop: 16, fontSize: 16 }}>Không có topic đề thi</p>
            }
        </div>

    )
}
export default Test;