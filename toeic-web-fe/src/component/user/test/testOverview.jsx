import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, ConfigProvider, Input, Row, Select, Skeleton, Tabs, message } from 'antd';
const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.45)',
};
import { useLocation } from 'react-router-dom';
import UserAim from '../common/useraim';
import fight from '../../../assets/fighting.jpg'
import learn from '../../../assets/learn.jpg'
import study from '../../../assets/study.jpg'
import tryhard from '../../../assets/tryhard.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faClockFour, faTimes, faUserPen } from '@fortawesome/free-solid-svg-icons';
import * as TestSV from '../../../services/testServices'
import { useQuery } from 'react-query';
import { getValueCheck, updateSelectedList } from '../../common/selectedList';
import { useGlobalState } from '../../common/globaleState';
import { useNavigate } from 'react-router-dom';
const TestOverView = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const idTest = pathParts[pathParts.length - 1];
    const [hasData, setHasData] = useState(true);
    return (
        <div style={{ minHeight: 500 }}>
            <Row style={{ width: '100%' }}>
                <Col span={17}>
                    < GetOverViewTest id={idTest} />
                    {/* {
                        hasData &&
                        <GetTab></GetTab>
                    } */}
                </Col>
                <Col offset={1} span={6}>
                    <Row style={{ width: '100%' }} gutter={[8, 8]} >
                        <Col span={24}>
                            <UserAim></UserAim>
                        </Col>
                        <Col flex={1} >
                            <GetSlider></GetSlider>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
};
const GetOverViewTest = ({ id }) => {
    const [checked, setChecked] = useState(true);
    const click = () => {
        setChecked(!checked)
    }
    const {
        isLoading,
        isError,
        error,
        data: getTest
    } = useQuery("getTest", () => TestSV.getTestById({ idTest: id }))
    useEffect(() => {
        if (!isLoading && !isError && getTest.data !== undefined) {
            setTest(getTest.data)
        }
    }, [isLoading, isError, getTest])
    const [test, setTest] = useState();

    return (
        <div style={{ width: '100%' }}>
            {
                isLoading && <Skeleton active paragraph={{ rows: 2 }}
                    title={false}
                    className="custom-skeleton"
                    style={{ width: "600px" }}
                />
            }
            {
                (!isLoading && !isError && test != null)
                    ?
                    <Row style={{ width: '100%' }}>
                        <Col span={24} className='font-test'>
                            {test.name}
                        </Col>
                        <Col span={24} className='flex-display'>
                            <p className={checked ? 'padding-p active' : 'padding-p'} onClick={click}>
                                Thông tin đề thi
                            </p>
                            <p className={!checked ? 'padding-p active' : 'padding-p'} onClick={click}>
                                Đáp án/ transcript
                            </p>
                        </Col>
                        {
                            checked &&
                            <Col span={20}>
                                <p className='font-size-p'> <FontAwesomeIcon icon={faClockFour}></FontAwesomeIcon> Thời gian làm bài: {test.totalTime} phút | {test.totalPart} phần thi | {test.totalQuestion} câu hỏi | 2499 bình luận</p>
                                <p className='font-size-p' > <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon> 6000 nghìn người đã tham gia luyện đề thi này</p>
                                <p className='font-size-p warning'>Chú ý: để được quy đổi sang scaled score (ví dụ trên thang điểm 990 cho TOEIC ), vui lòng chọn chế độ làm FULL TEST.

                                </p>
                            </Col>
                        }
                    </Row>
                    : <p>Không có dữ liệu bài thi</p>
            }
            {
                (!isLoading && !isError && test != null && test.partResponse.length > 0)
                &&

                <GetTab parts={test.partResponse} testId={id}></GetTab>
            }
        </div>
    )

}
const GetTab = ({ parts, testId }) => {
    const { globalState, setGlobalState } = useGlobalState();
    const [checkedItems, setCheckedItems] = useState({});
    const navigate = useNavigate();
    const startTest = () => {
        const listId = getValueCheck(checkedItems)
        if (listId.length === 0) {
            setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn phần thi" })
            console.log("Hello")
        }
        const queryString = listId.map(part => `part=${part}`).join('&');
        console.log(timeSelected)
        navigate(`/practice/${testId}/?${queryString}` + `&time_limit=${timeSelected}`)
    }
    const time = Array(Math.ceil(135 / 5)).fill().map((_, idx) => {
        const value = (idx + 1) * 5;
        return { label: value + " phút", value };
    });
    time.push({ label: "Chọn thời gian", value: 0 })
    const [timeSelected, setTimeSelected] = useState(0);
    const items = [
        {
            key: '1',
            label: 'Luyện tập',
            children: <div style={{ width: '100%' }}>
                <Row style={{ width: '100%' }} gutter={[8, 8]}>
                    <Col span={24}>
                        <p className='protips'>
                            Pro tips: Hình thức luyện tập từng phần và chọn mức thời gian phù hợp sẽ giúp bạn tập trung vào giải đúng các câu hỏi thay vì phải chịu áp lực hoàn thành bài thi.
                        </p>
                    </Col>
                    <Col>
                        <p style={{ fontSize: 16, padding: '10px 0px' }}>
                            Chọn phần bạn muốn làm:
                        </p>
                    </Col>
                    {
                        parts.map((item, index) => (
                            <Col span={24} style={{ fontSize: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input type='checkbox' style={{ width: 18, height: 18 }}
                                        checked={checkedItems[item.id] || false}
                                        // onChange={() => handleChange(item.id)}
                                        onChange={() => updateSelectedList(setCheckedItems, item.id)}
                                    />
                                    <p style={{ margin: 6 }}>
                                        {item.name}
                                    </p>
                                </div>
                                {/* này là thay dữ liệu động */}
                                <div style={{ display: 'flex' }}>
                                    <p className='padding-p-margin-left-right'>[Part 7] Câu hỏi tìm thông tin</p>
                                    <p className='padding-p-margin-left-right '>[Part 7] Câu hỏi tìm thông tin</p>
                                    <p className='padding-p-margin-left-right '>[Part 7] Câu hỏi tìm thông tin</p>
                                </div>
                            </Col>
                        ))
                    }
                    <Col span={24}>
                        <p style={{ fontSize: 16, padding: '10px 0px' }}>
                            Chọn thời gian làm bài (Để trống làm bài không giới hạn)
                        </p>
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontSize: 16
                                },
                            }}
                        >

                            <Select
                                defaultValue={0}
                                onChange={(value) => setTimeSelected(value)}
                                showSearch
                                placeholder="Chọn thời gian làm bài"
                                options={time}
                                style={{ width: '100%' }}
                            />
                        </ConfigProvider>

                    </Col>
                    <Col span={10} offset={6}>
                        <Button
                            style={{ width: '100%' }}
                            onClick={() => startTest()} >
                            Luyện tập
                        </Button>
                    </Col>
                </Row>
            </div>,
        },
        {
            key: '2',
            label: 'Làm full test',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Thảo luận',
            children: 'Content of Tab Pane 3',
        },
    ];
    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        titleFontSize: 16
                    },
                },
            }}
        >
            <Tabs items={items} tabBarStyle={{ fontWeight: '500' }} />
        </ConfigProvider>
    )
}
const GetSlider = () => {
    return (
        <Carousel autoplay speed={250} >
            <div>
                <img src={study} style={{ width: "100%" }} >
                </img>
            </div>
            <div>
                <img src={tryhard} style={{ width: "100%" }} >
                </img>
            </div>
            <div>
                <img src={learn} style={{ width: "100%" }} >
                </img>
            </div>
            <div>
                <img src={fight} style={{ width: "100%" }} >
                </img>

            </div>

        </Carousel>
    )
}
export default TestOverView;