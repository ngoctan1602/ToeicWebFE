import { Form, Input } from "antd";
import React from 'react';
const TextValidate = ({ prop, onChange }) => {
    return (
        <Form.Item
            hasFeedback
            label={prop.label}
            name={prop.name}
            rules={[
                {
                    required: prop.required, message: `Không được bỏ trống ${(prop.label).toLowerCase()}`
                },
                {
                    min: prop.min, message: `Ít nhất ${prop.min} kí tự`
                },
                {
                    max: prop.max, message: `Nhiều nhất ${prop.max} kí tự`
                },
            ]}
        >
            <Input allowClear type='text' defaultValue={prop.defaultValue}
            // onChange={(e) => onChange(prop.name, e.target.value)}
            />
        </Form.Item>
    );
}

export default TextValidate;