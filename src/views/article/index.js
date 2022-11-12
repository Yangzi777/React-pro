import React, { useEffect, useRef, useState } from 'react';
import { Card, Table, Button, Tag, Tooltip, Modal, message } from 'antd';
import { getArticleList, deleteArticleById } from '../../api';
import { useCallbackState } from '../../utils'
import { useTranslation } from 'react-i18next'
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
export default function ArticleList () {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  const [columns, setColumuns] = useState([])
  const { t, i18n } = useTranslation();
  const [total, setTotal] = useState(0)
  // const [pageData, setPagedata] = useState({ limited: 10, offset: 0 }) // offset:0 第二页10-19
  const [pageData, setPageData] = useCallbackState({ limited: 10, offset: 0 })
  const pageRef = useRef({ offset: 0, limited: 10 })
  const ButtonGroup = Button.Group


  //  多种类型判断
  const changeAmount = amount => {
    if (amount < 300) {
      return {
        placement: 'bottom',
        title: '小于300',
        color: 'skyblue'
      }
    } else if (amount >= 300 && amount < 400) {
      return {
        placement: 'bottom',
        title: '在300-400之间',
        color: 'green'
      }
    } else {
      return {
        placement: 'top',
        title: '高于400',
        color: 'pink'
      }
    }
  }
  useEffect(() => {
    getArticleListData(pageData)
  }, [t])
  const getArticleListData = (val) => {
    getArticleList(val).then(res => {
      let columns = Object.keys(res.list[0]).map(item => {
        //  如果是发布时间这一列，需要单独处理
        if (item === 'currentAt') {
          return {
            title: t(`columnsTitle.${item}`),
            render: (text) => {
              return moment(text.currentAt).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        }
        //  如果是阅读量这一行，需要单独操作
        if (item === 'amount') {
          return {
            title: t(`columnsTitle.${item}`),
            render: (text) => {
              return (
                <Tooltip placement={changeAmount(text.amount).placement} title={changeAmount(text.amount).title}>
                  <Tag color={changeAmount(text.amount).color}>{text.amount}</Tag >
                </Tooltip>)
            },
            sortDirections: ['ascend', 'descend'], //  默认是降序排序
            sorter: (a, b) => a.amount - b.amount, // 按照阅读量排序
            filters: [
              {
                value: '>=250',
                text: '高于250'
              },
              {
                value: '<250',
                text: '低于250'
              }
            ],
            onFilter: (value, record) => {
              if (value === '>=250') {
                return record.amount >= 250
              } else {
                return record.amount < 250
              }
            }
          }
        }
        return {
          title: t(`columnsTitle.${item}`),
          dataIndex: item
        }
      })
      //  push一列
      columns.push({
        title: '操作',
        render: text => {
          return <ButtonGroup>
            <Button onClick={() => toEdit(text)} type='primary' icon={<EditOutlined />}></Button>
            <Button type='primary' icon={<DeleteOutlined />} onClick={() => deleteActicle(text)} danger ></Button>
          </ButtonGroup>
        }


      })
      setDataSource(res.list)
      setColumuns(columns)
      setTotal(res.total) //  设置total=2300
    })
  }

  //  跳转到编辑页面
  const toEdit = text => {
    navigate('/admin/article/edit/' + text.id)
  }
  //  删除文章的方法
  const deleteActicle = text => {
    Modal.confirm({
      content: <>确定要删除<span style={{ color: 'pink' }}>{text.title}</span>文章吗</>,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const hide = message.loading('deleteLoading.......', 0);
        deleteArticleById(text.id).then(res => {
          hide()  //  取消loading窗口
          message.success('Delete Success!');
          getArticleListData(pageRef.current)  //  重新请求列表数据
        })
      }
    })
  }

  //  点击页码的时候触发
  const onChange = (page, pageSize) => {
    setPageData({
      limited: pageSize,
      offset: pageSize * (page - 1)
    }, function (val) {
      pageRef.current = val
      getArticleListData(val)
    })

  }
  return (
    <Card title="文章列表" extra={<Button type='primary' onClick={() => {
      i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
    }}>
      {t('lang')}
    </Button>}>
      <Table
        rowKey={record => record.id}
        dataSource={dataSource}
        columns={columns}
        scroll={{ y: 300, scrollToFirstRowOnChange: false, x: 600 }}
        pagination={{
          total,
          onChange
        }}
      />
    </Card>
  )
}


