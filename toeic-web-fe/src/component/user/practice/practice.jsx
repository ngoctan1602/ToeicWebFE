import { useEffect, useState } from "react";
import * as QuestionSv from '../../../services/questionService'
import * as TestSv from '../../../services/testServices'
import UseMutationCustom from "../../common/useMutationCustom";
import { useQuery } from "react-query";
import { Button, Col, Divider, Radio, Row } from "antd";
import { useNavigate } from "react-router";
import CountdownTimer from "../common/countdown.";
import clock from "../../../assets/clock.png"

const Practice = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pathVariable = window.location.pathname.split('/').filter(Boolean).pop();
    const navigate = useNavigate();
    const queryParameters = {};
    for (const [key, value] of urlParams.entries()) {
        if (queryParameters[key]) {
            if (Array.isArray(queryParameters[key])) {
                queryParameters[key].push(value);
            } else {
                queryParameters[key] = [queryParameters[key], value];
            }
        } else {
            queryParameters[key] = value;
        }
    }
    if (Object.keys(queryParameters).length === 0) {
        return <>Vui lòng chọn part</>
    }
    const time = queryParameters.time_limit;
    const [parts, setParts] = useState([]);

    useEffect(() => {
        if (queryParameters.part) {
            // console.log(queryParameters.part.length)
            setParts(queryParameters.part);
        }
    }, []);
    const [nameTest, setNameTest] = useState()
    const { data: getTest, isLoadingTest, isErrorTest } = useQuery(['getTest', pathVariable],
        () => TestSv.getTestById({ idTest: pathVariable })
    );
    useEffect(() => {
        if (!isLoadingTest && !isErrorTest) {
            // setNameTest(getTest.data)
            if (getTest !== undefined) {
                if (getTest.data !== undefined) {
                    setNameTest(getTest.data.name)
                }
            }
        }
    }, [isLoadingTest, isErrorTest, getTest])

    // const [questionQueries, setQuestionQueries] = useState();

    const [curentPart, setCurrentPart] = useState(queryParameters.part[0]);
    const { data: questions, isLoading, isError } = useQuery(['questions', curentPart],
        () => QuestionSv.getQuestionByTestAndPart({ idTest: pathVariable, idPart: curentPart })
    );

    const [selectedPart1, setSelectedPart1] = useState({});
    useEffect(() => {
        if (!isLoading && !isError) {
            // setNameTest(getTest.data)
            if (questions !== undefined) {
                if (questions.data !== undefined) {
                    if (parseInt(curentPart) === 1 && !selectedPart1) {
                        // console.log(questions)
                        const newObj = questions.data.reduce((acc, obj) => {
                            acc[obj.questionDTO.id] = 0;
                            return acc;
                        }, {});
                        setSelectedPart1(newObj)
                    }
                }
            }
        }
    }, [isLoading, isError, questions, curentPart, selectedPart1])

    const handleChangePart = (idPart) => {
        setCurrentPart(idPart);
    };



    return (
        <div style={{ width: '100%', minHeight: 500 }}>

            {
                (!isLoadingTest && !isErrorTest) &&
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 500, margin: 4 }}>
                        {
                            nameTest
                        }
                        {/* {getTest.data.name} */}
                    </p>
                    <Button onClick={() => navigate(-1)}>
                        Thoát
                    </Button>
                    <Button onClick={() => console.log(selectedPart1)}>Nộp bài</Button>
                </div>
            }
            <div style={{ display: 'flex' }}>
                {
                    parts.length > 1 ?
                        parts.map((part, index) => (
                            <p onClick={() => handleChangePart(part)}
                                className={curentPart === part ? "padding-p active-blue" : "padding-p"} >Part {part}</p>
                        ))
                        :
                        <p onClick={() => handleChangePart(parts)}
                            className={"padding-p active-blue"} >Part {parts}</p>
                }
                {/* <CountdownTimer totalMinutes={parseInt(time)} /> */}
            </div>
            <Divider></Divider>
            <Row style={{ minHeight: 400 }}>
                <Col span={20}>
                    {
                        (!isLoading && !isError && questions) &&
                        parseInt(curentPart) === 1 &&
                        <Part1 questions={questions.data} selectedPart1={{ selectedPart1: selectedPart1, setSelectedPart1: setSelectedPart1 }} />
                    }
                </Col>
                <Col span={4} style={{ maxHeight: 1000, padding: 8, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}>
                    <CountdownTimer totalMinutes={parseInt(time)} />
                    {
                        (!isLoading && !isError && questions) &&
                        <GetButtonQuestion questions={questions.data}></GetButtonQuestion>
                    }

                </Col>
            </Row>
        </div >
    );
}

const GetButtonQuestion = ({ questions }) => {
    // console.log(questions)
    return (
        <Row style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }} gutter={[4, 4]}>
            {
                questions.map((item, index) => (
                    <Col span={8}>
                        <Button style={{ width: '100%' }}>
                            {
                                //  item.questionDTO.id
                                index + 1
                            }
                        </Button>
                    </Col>
                ))
            }
        </Row>
    )
}
const Part1 = ({ questions, selectedPart1 }) => {
    // console.log(selectedPart1)
    const contentAnswer = [
        "A", "B", "C", "D"
    ]
    // const [selected, setSelected] = useState([])
    // useEffect(
    //     () => {
    //         // const object = []
    //         if (questions) {
    //             // questions.map((item) => {
    //             //     let ob = item.questionDTO.id;
    //             //     object.push({
    //             //         questionId: ob,
    //             //         answerId: 0
    //             //     })
    //             // })
    //             const newObj = questions.reduce((acc, obj) => {
    //                 acc[obj.questionDTO.id] = 0;
    //                 return acc;
    //             }, {});
    //             setSelected(newObj)
    //         }
    //     }, []
    // )
    // useEffect(
    //     () => {
    //         console.log(selected[2])
    //     }, [selected]
    // )

    const handleSelected = (questionId, answerId) => {
        // setSelected(...selected, selected[])
        // console.log(questionId, answerId)
        // console.log(selected)
        // console.log(selected[questionId])
        selectedPart1.setSelectedPart1({ ...selectedPart1.selectedPart1, [questionId]: answerId })
        // setSelected({ ...selected, [questionId]: answerId })
        // console.log(selected[index])
    }
    return (
        <div>
            {
                questions &&
                questions.map((question, index) =>
                (
                    <Row style={{ padding: 8, width: '100%', margin: '4px 0px', minHeight: 200 }} gutter={[8, 8]}>
                        <Col span={10} style={{ height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src={question.questionDTO.image} alt="Question Image" />
                            </div>
                        </Col>

                        <Col offset={1} span={10}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>

                                <p style={{ fontWeight: 500, borderRadius: '50%', background: '#cfcfcf', padding: 12, margin: '0 8px' }}>
                                    {/* {index + 1} */}
                                    {question.questionDTO.id}
                                </p>
                                <audio controls>
                                    <source src={question.questionDTO.audio}></source>
                                </audio>
                            </div>
                            <Radio.Group
                                value={selectedPart1.selectedPart1[question.questionDTO.id]}
                                // value={selected[question.questionDTO.id]}
                                onChange={(e) => handleSelected(question.questionDTO.id, e.target.value)}>
                                {
                                    question.answerList.map((answer, index) => (
                                        <div style={{ width: '100%' }}>


                                            <Radio value={answer.id}>
                                                {/* <p>
                                                    {answer.content}
                                                </p> */}
                                                <p>

                                                    {answer.id}
                                                </p>
                                                <p>
                                                    {contentAnswer[index]}

                                                    {/* {answer.content} */}
                                                </p>
                                            </Radio>
                                        </div>
                                    ))
                                }
                            </Radio.Group>
                        </Col>
                        {/* <Button onClick={handleSelected}>
                            Nhaans thu di
                        </Button> */}
                    </Row>
                )
                )
            }
        </div >
    )
}

export default Practice;

