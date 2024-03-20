import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Alert, Input } from 'antd';
import TextValidate from '../../common/validateTextInput'
import NumberValidate from '../../common/validateNumber';
import { GlobalStateProvider, useGlobalState } from '../../common/globaleState';
import { useMutation, useQueryClient } from 'react-query';
import * as yearSV from '../../../services/yearService'
import FormItem from 'antd/es/form/FormItem';
import UseMutationCustom from '../../common/useMutationCustom';
import { useForm } from 'antd/es/form/Form';
const ModalAddYear = ({ message, onClose, open, isUpdate, dataCurrent }) => {
    const { globalState, setGlobalState } = useGlobalState()
    const queryClient = useQueryClient()
    const [year, setYear] = useState({
        year: '',
        description: ''
    })
    const Submit = (values) => {
        for (const key in values) {
            if (Object.hasOwnProperty.call(values, key)) {
                year[key] = values[key]
            }
        }
        addYearMutation.mutate(year)
    }

    const propName = {
        name: 'description',
        label: "Mô tả",
        required: false,
    }
    const propNumber = {
        name: 'year',
        label: "Năm",
        required: true,
        min: 2020,
        max: 2024
    }

    const handleReset = () => {
        setYear({ year: '', description: '' })
        form.resetFields();
    };

    // const addYearMutation = useMutation(yearSV.addYear,
    //     {
    //         onSuccess: (data) => {
    //             queryClient.invalidateQueries("getYear")
    //             setYear({ year: '', description: '' })
    //             handleReset()
    //             setGlobalState({ message: 'Thêm mới thành công', success: true, handle: true })
    //             setTimeout(
    //                 () => {
    //                     setGlobalState({ message: '', success: false, handle: false })
    //                 }
    //             )
    //         },
    //         onError: (data) => {
    //             setGlobalState({ message: 'Thêm mới thật bại ', success: false, handle: true })
    //             setTimeout(
    //                 () => {
    //                     setGlobalState({ message: '', success: false, handle: false })
    //                 }
    //             )
    //         }
    //     }
    // )

    // const updateYear = useMutation(yearSV.update,
    //     {
    //         onSuccess: (data) => {
    //             queryClient.invalidateQueries("getYear")
    //             // setYear({ year: '', description: '' })
    //             // handleReset()
    //             setGlobalState({ message: 'Cập nhật thành công', success: true, handle: true })
    //             setTimeout(
    //                 () => {
    //                     setGlobalState({ message: '', success: false, handle: false })
    //                 }
    //             )
    //         },
    //         onError: (data) => {
    //             setGlobalState({ message: 'Cập nhật thật bại ', success: false, handle: true })
    //             setTimeout(
    //                 () => {
    //                     setGlobalState({ message: '', success: false, handle: false })
    //                 }
    //             )
    //         }
    //     }
    // )

    const addYearMutation = UseMutationCustom(yearSV.addYear, "Thêm mới thành công", "Thêm mới thất bại", "getYear", handleReset)
    const [form] = Form.useForm();
    return (
        <>
            <Modal
                title={message}
                open={open}
                maskClosable={false}
                onOk={() => form.submit()}
                onCancel={onClose}
                cancelText="Hủy bỏ"
                okText={isUpdate ? "Cập nhật" : "Thêm mới"}
                style={{ textAlign: 'center' }}
            >
                <Form
                    // ref={formRef}
                    labelCol={{ offset: 2, span: 3 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    onFinish={Submit}
                >
                    {
                        isUpdate ?
                            <>
                                <Form.Item
                                    label='Id'
                                    name='id'

                                >
                                    <Input style={{ color: 'black' }} disabled defaultValue={Number(dataCurrent.id)} >
                                    </Input>
                                </Form.Item>
                                <Form.Item
                                    label='Năm'
                                    name='year'
                                >
                                    <Input disabled style={{ color: 'black' }} defaultValue={Number(dataCurrent.year)} >
                                    </Input>
                                </Form.Item>

                                <TextValidate prop={propName} hasDefault={dataCurrent.description} />
                            </>
                            :
                            <>
                                <NumberValidate prop={propNumber} />

                                <TextValidate prop={propName} />
                            </>
                    }


                </Form>
            </Modal >


        </>
    );
};
export default ModalAddYear;