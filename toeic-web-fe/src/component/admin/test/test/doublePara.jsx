import { Col, Form, Row, Select, Steps, Table, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useGlobalState } from "../../../common/globaleState";
import * as QuestionSV from "../../../../services/questionService";
import updateValue from "../../../common/changeValueUsestate";
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'img',
        key: 'img',
        render: (text) => <img style={{ width: 50, height: 50 }} src={text}></img>
    },

];
const DoublePara = ({ row }) => {
    const { globalState, setGlobalState } = useGlobalState();
    const {
        isLoadingPara,
        isErrorPara,
        errorQues,
        data: getParaPart7Double
    } = useQuery("getParaPart7Double", () => QuestionSV.getParagraphByPartAndType({ idPart: 7, idType: 2 }))

    const [paragraphs, setParagraphs] = useState([])
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        let listQuestion = [];
        for (let i = 0; i < selectedRows.length; i++) {
            for (let j = 0; j < selectedRows[i].listQues.length; j++) {
                listQuestion.push(selectedRows[i].listQues[j].id)
            }
        }
        updateValue(row.setListQuestion, listQuestion)
        updateValue(row.setSelectedRowKeys, selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: row.selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        if (globalState.connect) {
            if (!isLoadingPara && !isErrorPara && getParaPart7Double !== undefined) {
                if (getParaPart7Double.data !== null) {
                    setParagraphs(getParaPart7Double.data)
                    console.log(getParaPart7Double.data)
                }
            }
        }
    }, [isLoadingPara, globalState.connect, isErrorPara, getParaPart7Double]);
    return (

        <Row align={"middle"} gutter={[16, 16]} style={{ width: "100%" }}>
            <Col offset={19} span={3}>
                Số câu đã chọn
            </Col>
            <Col span={2}
            >
                <Tooltip title={"Số đoạn đôi trong part 7 là 2"} color="green" >
                    <p style={{ position: "absolute", color: row.selectedRowKeys.length === 2 ? 'green' : 'red' }}>
                        {row.selectedRowKeys.length}
                    </p>
                    <QuestionCircleOutlined style={{ marginLeft: 20, cursor: 'pointer' }} />
                </Tooltip>
            </Col>
            <Col span={24}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    rowKey={"id"}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p
                                style={{
                                    margin: "0px 8px",
                                    textAlign: 'start'
                                }}
                            >
                                Câu hỏi: {record.listQues.map((item, index) =>
                                (<p>
                                    {item.content}
                                </p>))
                                }
                            </p>
                        ),
                    }}
                    pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                    dataSource={(!isLoadingPara && !isErrorPara) ? paragraphs : null}
                />
            </Col>
        </Row>

    );
}

export default DoublePara;