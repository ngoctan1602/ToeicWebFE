import { Button, Col, Form, Row, Steps, Table } from "antd";
import { useState } from "react";
import Part1 from "./part1";
import Part2 from "./part2";
import CheckValue from "../../../common/checkEmtyValue";
import { useGlobalState } from "../../../common/globaleState";

const steps = [
    {
        title: 'Part 1',
        content: 'Part-1',
    },
    {
        title: 'Part 2',
        content: 'Part-2',
    },
    {
        title: 'Part 3',
        content: 'Part-3',
    },
    {
        title: 'Part 4',
        content: 'Part-4',
    },
    {
        title: 'Part 5',
        content: 'Part-5',
    },
    {
        title: 'Part 6',
        content: 'Part-6',
    },
    {
        title: 'Part 7',
        content: 'Part-7',
    },
];
const AddNewTest = () => {
    const { globalState, setGlobalState } = useGlobalState();
    const [current, setCurrent] = useState(0);
    const [yearSelected, setYearSelected] = useState();
    const [topicSelected, setTopicSelected] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const nextStep = () => {
        if (current === 0) {
            if (CheckValue(yearSelected) && CheckValue(topicSelected)
                && selectedRowKeys.length > 0 && selectedRowKeys.length <= 6) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn đầy đủ năm ra đề, đề thi và số lượng câu hỏi part 1 là 6" })
            }
        }
    }
    return (
        <div>
            <Steps items={steps} current={current}>

            </Steps>
            <Row style={{ minHeight: "400px", margin: "16px 0px" }}>
                {
                    (current === 0) &&
                    <Col span={24}>
                        <Part1 year={{ yearSelected: yearSelected, setYearSelected: setYearSelected }}
                            topic={{ topicSelected: topicSelected, setTopicSelected: setTopicSelected }}
                            row={{ selectedRowKeys: selectedRowKeys, setSelectedRowKeys: setSelectedRowKeys }}
                        ></Part1>
                    </Col>
                }
                {
                    (current === 1) &&
                    <Col span={24}>
                        <Part2></Part2>
                    </Col>
                }
            </Row>

            <Row style={{}}>
                <Col span={1} offset={0}>
                    <Button

                        onClick={() => setCurrent(current - 1)}
                        disabled={current >= 1 ? false : true}>
                        Prev
                    </Button>
                </Col>
                <Col span={1} offset={21}>
                    <Button
                        onClick={nextStep}
                        disabled={(current >= 0 && current <= 5) ? false : true}>
                        Next
                    </Button>
                </Col>
            </Row>
        </div >
    );
}

export default AddNewTest;