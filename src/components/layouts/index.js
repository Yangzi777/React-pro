import React, { useEffect, useState } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, IeOutlined, MenuUnfoldOutlined, SmileOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons';
import { Layout, Menu, Switch, Space, Dropdown, Badge } from 'antd';
import LayoutsStyle from './layouts.module.less'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNotificationsData } from '../../store/actions/notifications'
const { Header, Content, Footer, Sider } = Layout;
function getItem (label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('图表信息', 'dashboard', <MailOutlined />, [
    getItem('图表演示', '/admin/dashboard', null),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')]),
  ]),
  getItem('文章列表', '/admin/article', <AppstoreOutlined />),
  getItem('设置', '/admin/settings', <SettingOutlined />,),
];



export default function Layouts (props) {
  const notificationsLength = useSelector(state => state.notifications.list.filter(item => item.hasRead === false).length)
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useState('light')
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNotificationsData())
  }, [])


  //  点击左侧导航的时候触发
  const onClick = ({ key }) => {
    //  通过编程式导航跳转
    navigate(key)

  };
  //  点击切换导航样式
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  }
  //  放大缩小菜单栏
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  //  下拉菜单的menu
  const menu = () => (
    <Menu
      onClick={onClick}
      items={[
        {
          key: '/admin/notifications',
          label: <Badge dot={notificationsLength != 0}>通知中心</Badge>
        },
        {
          key: 'admin/article',
          label: '文章列表',
          icon: <SmileOutlined />,
        },
        {
          key: '/admin/settings',
          label: '设置',
        },
        {
          key: '/logout',
          danger: true,
          label: '退出',
        },
      ]}
    />
  );
  return (
    <Layout>
      <Header className='header'>
        <div className={LayoutsStyle.header}>
          <h2><IeOutlined style={{ marginRight: '5px', color: 'rgb(29,187,238)', fontSize: '30px', }} />文章后台管理系统</h2>
          <Dropdown overlay={menu} className={LayoutsStyle.dropdown}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Badge size='small' count={notificationsLength} offset={[8, -8]}>欢迎您:张三</Badge>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div style={{ marginTop: '10px', color: 'rgb(0,21,41)', fontSize: '18px' }}>
          <button onClick={toggleCollapsed} style={{ border: 'none' }}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</button>
          Style<Switch onChange={changeTheme} />
        </div>
        <Layout
          className="site-layout-background"
          style={{
            padding: '24px 0',
          }}
        >
          <Sider className="site-layout-background" width={200} collapsed={collapsed} >

            <Menu
              theme={theme}
              style={{ height: '100%' }}
              onClick={onClick}
              selectedKeys={[location.pathname]}
              openKeys={['dashboard']}
              mode="inline"
              items={items}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Project ©2022 Created by Ant UED
      </Footer>
    </Layout>
  )
}
