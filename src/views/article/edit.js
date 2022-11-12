import React, { useState, useRef, useEffect } from 'react'
import { Card, Button, Form, Input, InputNumber, DatePicker, Spin, message } from 'antd'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { getArticlInfoById, saveArticle } from '../../api'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import * as moment from "moment/moment"
export default function Edit () {
  const [editor, setEditor] = useState(null)
  const toolbarConfig = {}
  const editorConfig = { placeholder: '请输入内容.....' }
  const formRef = useRef()
  const params = useParams()
  const [spinning, setSpinning] = useState(false)
  const navigate = useNavigate()
  //  及时销毁 editor 重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useEffect(() => {
    //  需要展示loading
    setSpinning(true)
    //  数据回填
    getArticlInfoById(params.id).then(res => {
      console.log(res)
      formRef.current.setFieldsValue({
        title: res.title,
        amount: res.amount,
        author: res.author,
        currentAt: moment(res.currentAt),
        content: res.content
      })
      //  发现富文本编辑器里面是没有内容的
      editor && editor.dangerouslyInsertHtml(res.content)
      // setHtml(res.content)
    }).finally(() => {
      setSpinning(false)
    })
    // setTimeout(() => {
    //   setHtml('<p>hello world</p>')
    // }, 1500)
  }, [editor])





  const onFinish = (values) => {
    //  需要展示loading
    setSpinning(true)
    values.currentAt = moment(values.currentAt).valueOf() //  转成时间戳形式 
    saveArticle(params.id, values).then(res => {
      message.success(res.msg)
      navigate('/admin/article') // 也可以写成-1返回上一页
    }).finally(() => {
      setSpinning(false)
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Spin spinning={spinning}>
      <Card title='文章编辑'>
        <Form
          ref={formRef}
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
            <>
              <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                  editor={editor}
                  defaultConfig={toolbarConfig}
                  mode="default"
                  style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                  defaultConfig={editorConfig}
                  onCreated={setEditor}
                  onChange={editor => {
                    formRef.current.setFieldsValue({
                      content: editor.getHtml()
                    })
                  }}
                  mode="default"
                  style={{ height: '500px', overflowY: 'hidden' }}
                />
              </div>
            </>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" block>
              编辑文章
            </Button>
          </Form.Item>
        </Form>
      </Card >
    </Spin>
  )
}

