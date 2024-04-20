import { useEffect, useState } from "react";
import * as QuestionSv from '../../../services/questionService'
import * as TestSv from '../../../services/testServices'
import UseMutationCustom from "../../common/useMutationCustom";
import { useQuery } from "react-query";
import { Button, Col, Divider, Row } from "antd";
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
    // console.log(questions)


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
                    1
                </Col>
                <Col span={4} style={{ padding: 8, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}>
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

export default Practice;

