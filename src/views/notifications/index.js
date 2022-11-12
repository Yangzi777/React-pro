import React from 'react'
import { Card, List, Avatar, Button, Badge } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { notificationsById, notificationsAll } from '../../store/actions/notifications';
export default function Notifications () {
  const list = useSelector(state => state.notifications.list)
  const dispatch = useDispatch()
  return (
    <Card title={'通知中心'} extra={<Button onClick={() => {
      dispatch(notificationsAll())
    }} disabled={list.every(item => item.hasRead === true)}>全部标记为已读</Button>}>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<Badge dot={!item.hasRead}><a href="https://ant.design">{item.title}</a></Badge>}
              description={item.desc}
            />
            {!item.hasRead && <Button onClick={() => {
              dispatch(notificationsById(item.id))
            }}>标记为已读</Button>}
          </List.Item>
        )}
      />
    </Card>
  )
}
