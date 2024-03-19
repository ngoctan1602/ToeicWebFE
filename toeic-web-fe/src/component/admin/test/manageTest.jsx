import { Row, Col, ConfigProvider, Button, Tooltip } from "antd";
import YearRow from "./year";
import TopicRow from "./topic";
import { useState } from "react";
import { FileAddFilled } from "@ant-design/icons";
import ModalAddYear from "./modalAddYear";
const ManageYearTopicOfTest = () => {
    const [openModalAdd, setOpenModelAdd] = useState(false)
    const callAdd = () => {
        setOpenModelAdd(false)
    }
    return (
        <>
            {
                openModalAdd &&
                <ModalAddYear message="Thêm mới năm phát hành" open={true} onClose={callAdd} ></ModalAddYear>
            }

            <Row gutter={[16, 16]} style={{ minHeight: '100%', width: '100%' }} >
                <Col Col span={23} >
                    <YearRow ></YearRow>
                </Col >
                <Col span={1} >
                    <Tooltip title={"Thêm mới năm phát hành"} color="green">
                        <Button
                            onClick={() => setOpenModelAdd(true)}
                            block style={{ marginTop: '5px' }}
                            icon={<FileAddFilled
                                style={{ color: 'green' }} />}>

                        </Button>
                    </Tooltip>
                </Col>

                {/* <Col span={20}  >
                <YearRow></YearRow>
            </Col>
            <Col span={4}>
                <Button></Button>
            </Col> */}

            </Row >
        </>
    );
}

export default ManageYearTopicOfTest;