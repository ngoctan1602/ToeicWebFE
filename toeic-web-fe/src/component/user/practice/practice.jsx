import { useEffect, useRef, useState } from "react";
import * as QuestionSv from '../../../services/questionService'
import * as TestSv from '../../../services/testServices'
import UseMutationCustom from "../../common/useMutationCustom";
import { useQuery } from "react-query";
import { BackTop, Button, Col, Divider, Radio, Row } from "antd";
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

    const { data: questionPara, isLoadingQuestionPara, isErrorQuestionPara }
        = useQuery(['questionPara', curentPart],
            () => QuestionSv.getQuestionByTestAndPartAndParagraph({ idTest: pathVariable, idPart: curentPart })
        );

    const [selectedPart1, setSelectedPart1] = useState({});
    const [selectedPart2, setSelectedPart2] = useState({});
    const [selectedPart3, setSelectedPart3] = useState({});
    const [selectedPart4, setSelectedPart4] = useState({});
    const [selectedPart5, setSelectedPart5] = useState({});
    const [selectedPart6, setSelectedPart6] = useState({});
    const [selectedPart7, setSelectedPart7] = useState({});

    const divRefs = useRef([]);
    const [focusDiv, setFocusDiv] = useState(-1);
    // const scrollToDiv = (index) => {
    //     if (divRefs.current[index]) {
    //         divRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    //     }
    //     setFocusDiv(index)
    // };
    const scrollToDiv = (index) => {
        if (divRefs.current[index]) {
            const div = divRefs.current[index];
            const rect = div.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const centerY = rect.top + scrollTop - (window.innerHeight / 2) + (rect.height / 2);
            window.scrollTo({ top: centerY, behavior: 'smooth' });
        }
        setFocusDiv(index);
    };


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

    useEffect(() => {
        if (!isLoading && !isError) {
            // setNameTest(getTest.data)
            if (questions !== undefined) {
                if (questions.data !== undefined) {
                    if (parseInt(curentPart) === 2 && !selectedPart2) {
                        // console.log(questions)
                        const newObj = questions.data.reduce((acc, obj) => {
                            acc[obj.questionDTO.id] = 0;
                            return acc;
                        }, {});
                        setSelectedPart2(newObj)
                    }
                }
            }
        }
    }, [isLoading, isError, questions, curentPart, selectedPart2])

    useEffect(() => {
        if (!isLoadingQuestionPara && !isErrorQuestionPara) {
            if (questionPara !== undefined) {
                if (questionPara.data !== undefined) {
                    if (parseInt(curentPart) === 3 && !selectedPart3) {
                        const newObj = questionPara.data.reduce((acc, obj) => {
                            obj.questionWithAnswerList.map((item, index) => {
                                acc[item.questionDTO.id] = 0;
                            }
                            )
                            return acc;
                        }, {});

                        setSelectedPart3(newObj)
                    }
                }
            }
        }
    }, [isLoadingQuestionPara, isErrorQuestionPara, questionPara, curentPart, selectedPart3])
    useEffect(() => {
        if (!isLoadingQuestionPara && !isErrorQuestionPara) {
            if (questionPara !== undefined) {
                if (questionPara.data !== undefined) {
                    if (parseInt(curentPart) === 4 && !selectedPart4) {
                        const newObj = questionPara.data.reduce((acc, obj) => {
                            obj.questionWithAnswerList.map((item, index) => {
                                acc[item.questionDTO.id] = 0;
                            }
                            )
                            return acc;
                        }, {});

                        setSelectedPart4(newObj)
                    }
                }
            }
        }
    }, [isLoadingQuestionPara, isErrorQuestionPara, questionPara, curentPart, selectedPart4])

    const handleChangePart = (idPart) => {
        setCurrentPart(idPart)
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
                                className={(curentPart === part) ? "padding-p active-blue" : "padding-p"} >Part {part}</p>
                        ))
                        :
                        <p onClick={() => handleChangePart(parts)}
                            className={"padding-p active-blue"} >Part {parts}</p>
                }
            </div>
            <Divider></Divider>
            <Row style={{ minHeight: 400 }}>
                <Col span={20}>
                    {
                        (!isLoading && !isError && questions) &&
                        parseInt(curentPart) === 1 &&
                        <Part1 divRefs={divRefs} questions={questions.data} selectedPart1={{ selectedPart1: selectedPart1, setSelectedPart1: setSelectedPart1 }} />
                    }

                    {
                        (!isLoading && !isError && questions) &&
                        parseInt(curentPart) === 2 &&
                        <Part2 questions={questions.data}
                            selectedPart2={{ selectedPart2: selectedPart2, setSelectedPart2: setSelectedPart2 }}
                        />
                    }

                    {
                        (!isLoadingQuestionPara && !isErrorQuestionPara && questionPara) &&
                        parseInt(curentPart) === 3 &&
                        <Part3 questions={questionPara.data}
                            selectedPart3={{ selectedPart3: selectedPart3, setSelectedPart3: setSelectedPart3 }}
                        />
                    }

                    {
                        (!isLoadingQuestionPara && !isErrorQuestionPara && questionPara) &&
                        parseInt(curentPart) === 4 &&
                        <Part3 questions={questionPara.data}
                            selectedPart3={{ selectedPart3: selectedPart4, setSelectedPart3: setSelectedPart4 }}
                        />
                    }
                </Col>
                <Col span={4} style={{
                    maxHeight: 1000, padding: 8,
                    // boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                }}>
                    <CountdownTimer totalMinutes={parseInt(time)} />
                    {
                        (!isLoading && !isError && questions && [1, 2, 5].includes(parseInt(curentPart))) &&
                        <GetButtonQuestion
                            scrollIntoView={scrollToDiv}
                            selected={parseInt(curentPart) === 1 ? selectedPart1 : parseInt(curentPart) === 2 ? selectedPart2 : selectedPart5}
                            questions={questions.data}>
                        </GetButtonQuestion>
                    }

                    {
                        (!isLoadingQuestionPara && !isErrorQuestionPara && questionPara && [3, 4, 6, 7].includes(parseInt(curentPart))) &&
                        <GetButtonQuestion
                            selected={parseInt(curentPart) === 3 ? selectedPart3 : parseInt(curentPart) === 4 ? selectedPart4 :
                                parseInt(curentPart) === 6 ?
                                    selectedPart6 : selectedPart7}

                            questions={questionPara.data} paragraph={true}>

                        </GetButtonQuestion>
                    }
                </Col>
            </Row>

            <BackTop></BackTop>
        </div >
    );
}

const GetButtonQuestion = ({ questions, selected, paragraph, scrollIntoView }) => {
    // console.log(questions)
    console.log(selected)
    return (
        <Row style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }} gutter={[4, 4]}>
            {
                (paragraph && questions) ?
                    questions.map((question, index) => (
                        question.questionWithAnswerList.map((item, i) => (
                            <Col span={8}>
                                <Button style={{
                                    width: '100%'
                                    , background: selected[item.questionDTO.id] !== 0 && selected[item.questionDTO.id] && '#67C6E3'

                                }}
                                >
                                    {
                                        3 * index + i + 1
                                    }
                                </Button>
                            </Col>
                        ))
                    )) :
                    questions.map((item, index) => (
                        <Col span={8}>
                            <Button
                                onClick={() => scrollIntoView(item.questionDTO.id)}
                                style={{
                                    width: '100%',
                                    background: selected[item.questionDTO.id] !== 0 && selected[item.questionDTO.id] && 'blue'
                                }}
                            >
                                {
                                    //  item.questionDTO.id
                                    // console.log(selected[item.questionDTO.id])
                                    index + 1
                                    // console.log(selected)
                                }
                            </Button>
                        </Col>
                    ))
            }
        </Row>
    )
}
const Part1 = ({ questions, selectedPart1, divRefs }) => {
    // console.log(selectedPart1)
    const contentAnswer = [
        "A", "B", "C", "D"
    ]

    const handleSelected = (questionId, answerId) => {
        selectedPart1.setSelectedPart1({ ...selectedPart1.selectedPart1, [questionId]: answerId })
    }
    return (
        <div>
            {
                questions &&
                questions.map((question, index) =>
                (
                    <Row
                        ref={(ref) => (divRefs.current[question.questionDTO.id] = ref)}

                        style={{
                            padding: 8, width: '100%', margin: index !== 0 && '8px 0px', minHeight: 200
                            , boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                        }} gutter={[8, 8]}>
                        <Col span={8} style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src={question.questionDTO.image} alt="Question Image" />
                            </div>
                        </Col>

                        <Col offset={1} span={10}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>

                                <p style={{ fontWeight: 500, borderRadius: '50%', background: '#cfcfcf', padding: 12, margin: '0 8px' }}>
                                    {index + 1}
                                    {/* {question.questionDTO.id} */}
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
const Part2 = ({ questions, selectedPart2 }) => {

    const contentAnswer = [
        "A", "B", "C"
    ]


    const handleSelected = (questionId, answerId) => {
        selectedPart2.setSelectedPart2({ ...selectedPart2.selectedPart2, [questionId]: answerId })
    }
    return (
        <div>
            {
                questions &&
                questions.map((question, index) =>
                (
                    <Row style={{
                        padding: 8, width: '100%', margin: index !== 0 && '8px 0px', minHeight: 200
                        , boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                    }} gutter={[8, 8]}>
                        <Col offset={1} span={20}>
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
                                value={selectedPart2.selectedPart2[question.questionDTO.id]}
                                // value={selected[question.questionDTO.id]}
                                onChange={(e) => handleSelected(question.questionDTO.id, e.target.value)}
                            >
                                {
                                    question.answerList.map((answer, index) => (
                                        <div style={{ width: '100%' }}>
                                            <Radio value={answer.id}>
                                                {/* <p>
                                                    {answer.content}
                                                </p> */}
                                                {/* <p>

                                                    {answer.id}
                                                </p> */}
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
                    </Row>
                )
                )
            }
        </div >
    )
}

const Part3 = ({ questions, selectedPart3 }) => {
    console.log(selectedPart3)


    const handleSelected = (questionId, answerId) => {
        selectedPart3.setSelectedPart3({ ...selectedPart3.selectedPart3, [questionId]: answerId })
    }
    return (
        <div>
            {
                questions &&
                questions.map((question, index) =>
                (
                    <Row style={{
                        padding: 8, width: '100%', margin: index !== 0 && '8px 0px', minHeight: 200
                        , boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                    }} gutter={[8, 8]}>
                        <Col span={8} style={{
                            flexDirection: 'column', height: 400, display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div
                            // style={{ maxWidth: '100%' }}
                            >

                                <audio controls>
                                    <source src={question.audio}></source>
                                </audio>
                            </div>
                            {
                                question.img &&
                                <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>
                                    <img style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }} src={question.img} alt="Question Image" />
                                </div>
                            }
                        </Col>
                        <Col span={16}>

                            {/* <p>
                                {question.content}
                            </p> */}
                            {
                                question.questionWithAnswerList.map((item, i) => (
                                    <div>
                                        <div style={{ display: 'flex', padding: 8, alignItems: 'center', }}>
                                            <p style={{ fontWeight: 500, borderRadius: '50%', background: '#cfcfcf', padding: 12, margin: '0 8px' }}>
                                                <p>{index * 3 + i + 1}</p>
                                            </p>
                                            <p>{item.questionDTO.content}</p>
                                        </div>

                                        <Radio.Group
                                            value={selectedPart3.selectedPart3[item.questionDTO.id]}
                                            // value={selected[question.questionDTO.id]}
                                            onChange={(e) => handleSelected(item.questionDTO.id, e.target.value)}
                                        >
                                            {
                                                item.answerList.map((answer, index) => (
                                                    <div style={{ width: '100%' }}>
                                                        <Radio value={answer.id}>

                                                            {/* <p>

                                                                {answer.id}
                                                            </p> */}
                                                            <p>
                                                                {/* {contentAnswer[index]} */}

                                                                {answer.content}
                                                            </p>
                                                        </Radio>
                                                    </div>
                                                ))
                                            }
                                        </Radio.Group>
                                    </div>
                                ))
                            }
                        </Col>
                    </Row>
                )
                )
            }
        </div >
    )
}


export default Practice;

