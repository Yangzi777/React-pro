import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import _ from 'lodash'
import { Card, Col, Row, Avatar, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getChartsData } from '../../api'
const { Meta } = Card;
export default function Dashboard () {
  const myRef = useRef()
  const myRef2 = useRef()
  const [barChart, setBarchart] = useState(null)
  const [pieChart, setPiechart] = useState(null)
  const [open, setOpen] = useState(false);
  const [echartsDatas, setEchartsData] = useState(null)
  useEffect(() => {
    getChartsData().then(res => {
      let data = _.groupBy(res.list, 'category')
      chartsView(data)  //  渲染柱状图
      setEchartsData(data)
    })
  }, [])
  //  渲染饼图的方法
  const chartsPieView = (data) => {
    if (!myRef2.current) return
    let myChart
    if (!pieChart) {
      myChart = echarts.init(myRef2.current);
      setPiechart(myChart)
    } else {
      myChart = pieChart
    }

    //  处理数据
    let list = []
    for (let key in data) {
      list.push({
        name: key,
        value: data[key].length
      })
    }
    console.log(list)
    myChart.setOption({
      title: {
        text: '图表数据展示',
        subtext: '文章信息',
      },
      tooltip: {},
      // xAxis: {
      //   data: Object.keys(data)
      // },
      // yAxis: {},
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: '文章分类数量',
          type: 'pie',
          radius: [20, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: list
        }
      ]
    });
    //  当窗体发生变化的时候，myChart也要跟着变化
    window.onresize = function () {
      myChart.resize()
    }
  }
  //  渲染柱状图的方法
  const chartsView = (data) => {
    let myChart
    if (!barChart) {
      myChart = echarts.init(myRef.current);
      setBarchart(myChart)
    } else {
      myChart = barChart
    }
    myChart.setOption({
      title: {
        text: '图表数据展示',
        subtext: '文章信息',
        borderWidth: 2,
        borderColor: 'pink'
      },
      tooltip: {},
      legend: {
        data: ['文章阅读量']
      },
      xAxis: {
        data: Object.keys(data)
      },
      yAxis: {},
      series: [
        {
          name: '文章阅读量',
          type: 'bar',
          data: Object.values(data).map(item => item.length)
        }
      ]
    });
    //  当窗体发生变化的时候，myChart也要跟着变化
    window.onresize = function () {
      myChart.resize()
    }
  }
  return (
    <>
      <div ref={myRef} style={{ height: 400 }}></div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={() => {
                setOpen(true)
                setTimeout(() => {
                  chartsPieView(echartsDatas)   //  渲染饼图
                }, 0)
              }
              } />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Col>
      </Row>
      {/* 右侧抽屉 */}
      <Drawer
        title="饼图数据"
        placement={'right'}
        closable={false}
        onClose={() => { setOpen(false) }}
        open={open}
        key={'right'}
      >
        <div ref={myRef2} style={{ height: 400 }}></div>
      </Drawer>
    </>
  )
}
