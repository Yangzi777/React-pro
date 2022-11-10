import React from 'react'
import { Card, Button, Form, Input, InputNumber, DatePicker } from 'antd'
export default function Edit () {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card title='文章编辑'>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your title!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="阅读量"
          name="amount"
          rules={[
            {
              required: true,
              message: 'Please input your amount!',
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="作者"
          name="author"
          rules={[
            {
              required: true,
              message: 'Please input your author!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="发布时间"
          name="currentAt"
          rules={[
            {
              required: true,
              message: 'Please input your currentAt!',
            },
          ]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          label="文章内容"
          name="content"
          rules={[
            {
              required: true,
              message: 'Please input your content!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            编辑文章
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

