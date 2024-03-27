import { Button, Col, ConfigProvider, Divider, Form, Grid, Input, Radio, Row, Select, Space, Upload } from "antd";
import { useQuery } from "react-query";
import * as PartSV from '../../../../services/partServices'
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { addImage } from "../../../../services/yearService";
import UseMutationCustom from "../../../common/useMutationCustom";
import TextValidate from "../../../common/validateTextInput";
import * as questionSV from "../../../../services/questionService"
import CheckValueField from "../../../common/checkUndefinedValue";
const propAnswer = []
for (let index = 0; index < 3; index++) {
    propAnswer.push({
        name: `answer${index + 1}`,
        label: "Đáp án " + (index + 1),
        required: true,
        min: 3,
        max: 30
    })
}

const AddQuetion = () => {


    const [form] = new Form.useForm();
    const [formQuestion] = new Form.useForm();
    const [indexAnswer, setIndex] = useState(0);


    const [parts, setParts] = useState([]);

    const {
        isLoading,
        isError,
        error,
        data: getPart
    } = useQuery("getPart", PartSV.getPart)

    useEffect(() => {
        if (!isLoading && !isError
            // && getPart.data.length > 0
        ) {
            console.log(getPart);
            // const updatedParts = getPart.data.map(element => ({
            //     value: element.id,
            //     label: element.name
            // }));
            // setParts(updatedParts);
        }

    }, []);

    const [partSelected, setPartSelected] = useState(0);
    const handleChange = (value) => {
        setPartSelected(value)
    };



    const handleSubmit = (file, audio) => {
        if (audio === true) {
            formQuestion.setFieldsValue({
                fileAudio: file?.fileList[0].originFileObj
            })

        }
        else {

            formQuestion.setFieldsValue({
                fileImage: file?.fileList[0].originFileObj
            })
        }

    }

    const setValueAddQuestion = () => {

        const addValue = {
            idPart: partSelected,
            contentQues: formQuestion.getFieldValue('question'),
            descriptionQues: 'Hello',
            audioQues: formQuestion.getFieldValue('fileAudio'),
            imageQues: formQuestion.getFieldValue('fileImage'),
        }
        return addValue;
    }
    const setValueAddAnswer = () => {

        const addValue = []
        for (let i = 0; i < 3; i++) {
            addValue.push(
                {
                    content: form.getFieldValue(`answer${i + 1}`),
                    isTrue: indexAnswer === i ? true : false
                })
        }
        return addValue;
    }
    const submitAddQuestion = () => {

        form.submit()
        formQuestion.submit()
        const formData = setValueAddQuestion();
        const checkQuestion = CheckValueField(formData);
        const formDataAnswer = setValueAddAnswer();
        const checkAnswer = CheckValueField(formDataAnswer);
        if (checkQuestion && checkAnswer) {

            var form_data = new FormData();
            for (var key in formData) {
                form_data.append(key, formData[key]);
            }
            for (let i = 0; i < formDataAnswer.length; i++) {
                form_data.append(`answerRequests[${i}].content`, formDataAnswer[i].content);
                form_data.append(`answerRequests[${i}].isTrue`, formDataAnswer[i].isTrue);
            }

            console.log(form_data.get("answerRequests[0].content"))
            addYearMutation.mutate(form_data)
        }

    }

    const addYearMutation = UseMutationCustom(questionSV.addQuestion, "Thêm mới thành công", "Thêm mới thất bại", "getQuestion", null)


    return (
        <>

            <Row >
                <Row align={'middle'} style={{ width: "50%" }}>
                    <Col offset={0} flex={1}>
                        <p>Chọn part</p>
                    </Col>
                    {
                        (!isLoading && !isError) &&
                        <Col Col flex={3}>
                            <Select
                                mode='single'
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                showSearch
                                tokenSeparators={[',']}
                                options={parts}
                            />
                        </Col>
                    }
                </Row >
                <Row align={'middle'} style={{ width: "50%", paddingLeft: 16 }}>
                    <Col offset={0} flex={1} align='center'>
                        <p>Thêm đáp án</p>
                    </Col>



                </Row >
            </Row>

            <Row>

                {
                    (partSelected === 1 || partSelected === 2) &&
                    <div style={{ margin: "16px 0px", width: "50%" }}>
                        <Form
                            name="formQuestion"
                            form={formQuestion}
                        // onFinish={(values) => console.log(values)}
                        >



                            <Row align={'middle'} style={{ margin: "16px 0px" }}>

                                {

                                    <Col Col flex={1}>

                                        <Form.Item
                                            label="Thêm câu hỏi"
                                            name="question"
                                            initialValues={
                                                '' // Giá trị ban đầu của inputField
                                            }
                                            rules={[
                                                {
                                                    required: true, message: "Không được bỏ trống"
                                                },
                                                {
                                                    min: 3, message: "Ít nhất 3 kí tự"
                                                },
                                                {
                                                    max: 60, message: "Nhiều nhất 60 kí tự"
                                                },
                                            ]}>
                                            <Row>
                                                <Col offset={3} flex={1}>
                                                    <TextArea allowClear rows={4}></TextArea>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                    </Col>
                                }
                            </Row >
                            <Row align={'middle'} style={{ margin: "16px 0px" }} >
                                <Col Col flex={1}>

                                    <Form.Item
                                        label="Thêm file nghe"
                                        name="fileAudio"
                                        valuePropName="file"
                                        getValueFromEvent={(event) => {
                                            return event?.file
                                        }}
                                        rules={[
                                            {
                                                required: true, message: "Vui lòng chọn file"
                                            },
                                        ]}>
                                        <Row>
                                            <Col offset={3} flex={1}>
                                                <Upload
                                                    listType="picture"
                                                    beforeUpload={(file) => {
                                                        return new Promise((resolve, reject) => {
                                                            if (file.size > 3) {
                                                                reject('File size exceed')
                                                            }
                                                            else {
                                                                resolve('success')
                                                            }
                                                        })
                                                    }}
                                                    accept=".mp3"
                                                    maxCount={1}
                                                    customRequest={(info) => { }}
                                                    action={null}
                                                    onChange={(file) =>
                                                        // formQuestion.setFieldsValue({ fileaudio: file.file.originFileObj })

                                                        handleSubmit(file, true)
                                                    }
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                                                </Upload>
                                            </Col>
                                        </Row>
                                    </Form.Item>

                                </Col>



                            </Row >
                            <Row align={'middle'} style={{ margin: "16px 0px" }} >
                                <Col Col flex={1}>

                                    <Form.Item
                                        label="Thêm file hình ảnh"
                                        name="fileImage"
                                        valuePropName="file"
                                        getValueFromEvent={(event) => {
                                            return event?.file
                                        }}
                                        rules={[
                                            {
                                                required: true, message: "Vui lòng chọn file"
                                            },
                                        ]}>
                                        <Row>
                                            <Col offset={2} flex={1}>
                                                <Upload
                                                    listType="picture"
                                                    beforeUpload={(file) => {
                                                        return new Promise((resolve, reject) => {
                                                            if (file.size > 3) {
                                                                reject('File size exceed')
                                                            }
                                                            else {
                                                                resolve('success')
                                                            }
                                                        })
                                                    }}
                                                    accept="image/png, image/gif, image/jpeg"
                                                    maxCount={1}
                                                    customRequest={(info) => { }}
                                                    action={null}
                                                    onChange={(file) =>
                                                        // formQuestion.setFieldsValue({ fileaudio: file.file.originFileObj })

                                                        handleSubmit(file, false)
                                                    }
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                                                </Upload>
                                            </Col>
                                        </Row>
                                    </Form.Item>

                                </Col>



                            </Row >

                            {/* <Form.Item>
                                <Button htmlType="submit">

                                </Button>
                            </Form.Item> */}
                        </Form>

                    </div >
                }


                {
                    (partSelected === 1 || partSelected === 2) &&
                    <div style={{ margin: "16px 0px", width: "50%", paddingLeft: 16 }}>
                        <Form name="form"
                            form={form}
                            onFinish={(values) => console.log(form.getFieldValue("answer1"))}
                            style={{ width: "100%" }}
                        >

                            <Radio.Group
                                style={{ width: "100%" }}
                                buttonStyle='outline' onChange={(e) => setIndex(e.target.value)} value={indexAnswer} >
                                {
                                    propAnswer.map((prop, index) => (
                                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>

                                            <Radio style={{ paddingBottom: 20 }} value={index}
                                            >
                                            </Radio>

                                            <TextValidate prop={prop}></TextValidate>
                                        </div>
                                    ))
                                }
                            </Radio.Group>
                            {/* <Form.Item>
                                <Button htmlType="submit"></Button>
                            </Form.Item> */}
                        </Form>


                        <Button onClick={() => submitAddQuestion()}>
                            Tạo câu hỏi
                        </Button>
                    </div >
                }
            </Row >

        </>
    );
}

export default AddQuetion;
