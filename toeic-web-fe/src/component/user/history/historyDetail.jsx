import { useQuery } from "react-query";
import * as HistorySV from "../../../services/historyServices"
import { Row, Col, Skeleton, Button, Divider, Card, Radio } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faCaretDown, faCheck, faCheckCircle, faCircleArrowDown, faCircleXmark, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const HistoryDetail = () => {
    const pathVariable = window.location.pathname.split('/');
    const historyId = pathVariable[2] && pathVariable[2]
    const testId = pathVariable[4] && pathVariable[4]
    const {
        isLoading,
        isError,
        error,
        data: getHistory
    } = useQuery("history", () => HistorySV.getHistoryOverView({ idHistory: historyId, idTest: testId }))
    const [curentPart, setCurrentPart] = useState(0);
    const { data: questions, isLoadingQuestion, isErrorQuestion } = useQuery(['questions', curentPart],
        () => HistorySV.getSelected({ idHistory: historyId, idTest: testId, idPart: curentPart })
    );
    useEffect(
        () => {
            if (!isLoading && !isError) {
                if (getHistory.data !== undefined) {
                    if (getHistory.data.partResponses !== undefined && getHistory.data.partResponses.length >= 1) {
                        setCurrentPart(getHistory.data.partResponses[0].id)
                    }
                }
            }
        }, [isLoading, isError, getHistory]
    )
    return (
        <div>
            <Row >
                {
                    isLoading &&
                    <Skeleton active paragraph={{ rows: 2 }}
                        title={false}
                        className="custom-skeleton"
                        style={{ width: "600px" }}
                    />
                }
                <Col span={24} >
                    {
                        !isLoading && !isError && getHistory && getHistory.data &&

                        <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 500 }}>
                            Kết quả luyện tập  {getHistory.data.name}
                        </p>
                    }
                </Col>
            </Row>
            {/* <Row style={{ width: '100%', margin: '20px' }}>
                {
                    !isLoading && !isError && getHistory !== undefined && getHistory.data !== undefined &&
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>

                        <div className="block-div" >
                            <p style={{ padding: 8 }}>
                                Thời gian làm bài {getHistory.data.totalTime}
                            </p>
                            <p style={{ padding: 8 }}>
                                Ngày hoàn thành {getHistory.data.dateCompleted.split("-").reverse().join("-")}
                            </p>
                            <p>
                                Tỉ lệ đúng = (số câu đúng)/ (số câu đúng + số câu sai)
                            </p>
                        </div>

                        <div className="block-div" style={{}}>
                            <FontAwesomeIcon size="2x" color="green" icon={faCheckCircle} />
                            <p style={{ padding: 8 }}>
                                Số câu đúng
                            </p>
                            <p style={{ padding: 8 }}>
                                {getHistory.data.totalCorrect}
                            </p>
                        </div>


                        <div className="block-div">
                            <FontAwesomeIcon size="2x" color="red" icon={faCircleXmark} />
                            <p style={{ padding: 8 }}>
                                Số câu sai
                            </p>
                            <p style={{ padding: 8 }}>
                                {getHistory.data.totalCorrect}
                            </p>
                        </div>



                        <div className="block-div">
                            <FontAwesomeIcon size="2x" color="#cfcfcf" icon={faMinusCircle} />
                            <p style={{ padding: 8 }}>
                                Số câu bỏ qua
                            </p>
                            <p style={{ padding: 8 }}>
                                {getHistory.data.totalCorrect}
                            </p>
                        </div>


                    </Col>
                }

            </Row> */}
            <Divider></Divider>
            <Row>
                {
                    isLoading &&
                    <Skeleton active paragraph={{ rows: 2 }}
                        title={false}
                        className="custom-skeleton"
                        style={{ width: "600px" }}
                    />
                }
                {
                    !isLoading && !isError && getHistory !== undefined && getHistory.data !== undefined &&

                    <Col>
                        <div style={{ display: 'flex' }}>
                            {
                                getHistory.data.partResponses.map((item, index) =>
                                (
                                    <p onClick={() => setCurrentPart(item.id)}
                                        className={
                                            (curentPart === item.id) ? "padding-p active-blue" :
                                                "padding-p"}>
                                        {item.name}

                                    </p>
                                )
                                )
                            }
                        </div>
                    </Col>
                }
            </Row>
            <Row style={{ width: '100%', margin: 8 }} gutter={[8, 8]}>
                <Col span={20}>
                    {
                        !isLoadingQuestion && !isErrorQuestion && questions !== undefined && questions.data !== undefined
                        && curentPart === 1 &&
                        <Part1 questions={questions.data}>

                        </Part1>
                    }
                </Col>
                <Col span={4} style={{ position: 'fixed', right: 50, top: 200 }}>
                    {
                        !isLoadingQuestion && !isErrorQuestion && questions !== undefined && questions.data !== undefined
                        && curentPart === 1 &&
                        < GetButtonQuestion questions={questions.data} />
                    }
                </Col>
            </Row>

        </div >
    );
}
const GetButtonQuestion = ({ questions, paragraph, scrollIntoView, part }) => {
    console.log(questions)
    const selectedIsTrue = (question, answer) => {
        if (question.selectedQuestion === null) {
            return 1
        }
        for (let i = 0; i < answer.length; i++) {
            if (answer[i].id === question.selectedAnswer && answer[i].isTrue) {
                return 2
            }
        }
        return 3
    }
    // console.log(selectedIsTrue(questions[2].question, questions[2].answer))
    return (

        <Row style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }} gutter={[4, 4]}>
            {
                // (paragraph && questions) ?
                //     questions.map((question, index) => (
                //         question.questionWithAnswerList.map((item, i) => (
                //             <Col span={8}>
                //                 <Button style={{
                //                     width: '100%'
                //                     , background: selected[item.questionDTO.id] !== 0 && selected[item.questionDTO.id] && '#67C6E3'

                //                 }}
                //                 >
                //                     {
                //                         part === 6 ?
                //                             4 * index + i + 1
                //                             :
                //                             3 * index + i + 1
                //                     }

                //                 </Button>
                //             </Col>
                //         ))
                //     )) :
                questions.map((item, index) => (
                    <Col span={8}>
                        {/* <Button
                            // onClick={() => scrollIntoView(item.questionDTO.id)}
                            style={{
                                width: '100%',
                                // background: selected[item.questionDTO.id] !== 0 && selected[item.questionDTO.id] && 'blue'
                            }}
                        >
                            {
                                index + 1
                            }
                        </Button> */}
                        {
                            // item.answer.map((answer, i) =>
                            // (
                            //     {
                            //         answer.id === question.question.selectedAnswer && answer.isTrue 
                            //         <Button>1</Button>
                            //     }
                            // )
                            // )
                            <Button style={{
                                width: '100%',
                                background: selectedIsTrue(item.question, item.answer) === 1 ? '' : selectedIsTrue(item.question, item.answer) === 2 ? 'blue' : 'red'
                            }}>{index + 1}</Button>
                        }
                    </Col>
                ))
            }
        </Row>
    )
}

const Part1 = ({ questions }) => {
    const contentAnswer = [
        "A", "B", "C", "D"
    ]
    return (
        <div>
            {
                questions &&
                questions.map((question, index) =>
                (
                    <Row
                        // ref={(ref) => (divRefs.current[question.question.id] = ref)}

                        style={{
                            padding: 8, width: '100%', margin: index !== 0 && '8px 0px', minHeight: 200
                            , boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                        }} gutter={[8, 8]}>
                        <Col span={8} style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src={question.question.image} alt="Question Image" />
                            </div>
                        </Col>

                        <Col offset={1} span={10}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>

                                <p style={{ fontWeight: 500, borderRadius: '50%', background: '#cfcfcf', padding: 12, margin: '0 8px' }}>
                                    {index + 1}
                                    {/* {question.questionDTO.id} */}
                                </p>
                                <audio controls>
                                    <source src={question.question.audio}></source>
                                </audio>
                            </div>
                            <Radio.Group
                                style={{ width: '100%' }}
                                // value={selectedPart1.selectedPart1[question.questionDTO.id]}
                                // value={selected[question.questionDTO.id]}
                                // onChange={(e) => handleSelected(question.questionDTO.id, e.target.value)}
                                value={question.question.selectedAnswer !== null && question.question.selectedAnswer}
                            >
                                {
                                    question.answer.map((answer, index) => (
                                        <div style={{ width: '100%' }}>
                                            <Radio value={answer.id} disabled={true} >
                                                <p style={{
                                                    background:
                                                        (answer.id === question.question.selectedAnswer && answer.isTrue) ? '#E2F4C5' :
                                                            (answer.id === question.question.selectedAnswer && !answer.isTrue) && '#ec7063'
                                                }}>
                                                    {contentAnswer[index]}
                                                </p>
                                            </Radio>
                                            {/* {
                                                answer.isTrue &&
                                                <p>   {contentAnswer[index]}</p>
                                            } */}

                                        </div>
                                    ))
                                }
                            </Radio.Group>
                            {
                                question.answer.map((answer, index) => (
                                    <div style={{ margin: '8px 0px' }}>
                                        {
                                            answer.isTrue &&
                                            <p>  Đáp án đúng là {contentAnswer[index]}</p>
                                        }
                                    </div>

                                ))
                            }
                            <div style={{}}>
                                <p style={{ margin: '8px 0px' }}>
                                    Lời giải chi tiết
                                </p>
                                <p>
                                    {question.question.description}
                                </p>
                            </div>
                        </Col>
                    </Row>
                )
                )
            }
        </div >
    )
}

export default HistoryDetail;