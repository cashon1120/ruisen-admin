import {useState} from 'react'
import {Space} from 'antd';
import {Menu, Dropdown, Form, Input, message} from 'antd'
import React from 'react';
import styles from './index.less';
import ModalForm from '../ModalForm';
import HttpRequest from '@/utils/request';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight : React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmitModal = (values: any) => {
    if(values.newPassword !== values.reNewPassword){
      message.error('两次密码输入不一致')
      return
    }
    delete values.reNewPassword
    setLoading(true)
    HttpRequest({method: 'put', url: 'admin/users/password', params: values, type: 'json'}).then((res: any) => {
      message.success('密码修改成功， 请重新登录')
      setTimeout(() => {
        handleLogout()
      }, 2000);
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('useInfo')
    location.href = '/login'
  }
  const menu = (
    <Menu style={{marginTop: 10}}>
      <Menu.Item onClick={() => setVisible(true)}>修改密码</Menu.Item>
      <Menu.Item onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  );

  const getUserName = () => {
    const userInfo = localStorage.getItem('useInfo')
    if(userInfo){
      console.log(userInfo)
      return JSON.parse(userInfo)
    }
    return null
  }

  const userInfo = getUserName()

  return (
    <Space>
      {/* <Dropdown overlay={menu}> */}
      <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
          {userInfo.id ? <><img className={styles.avatar} src={userInfo.avatar} />{userInfo.nickname}</> : '未登录'}
        </a>
      </Dropdown>
      <ModalForm
        title="修改密码"
        onFinish={handleSubmitModal}
        visible={visible}
        loading={loading}
        onCancel={() => setVisible(false)}
      >
        <Form.Item name="oldPassword" label="旧密码" rules={[{ required: true, message: '旧密码不能为空！' }]}>
            <Input.Password  placeholder="请输入旧密码！" />
        </Form.Item>
        <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: '新密码不能为空！' }]}>
            <Input.Password  placeholder="请输入新密码！" />
        </Form.Item>
        <Form.Item name="reNewPassword" label="确认密码" rules={[{ required: true, message: '确认密码不能为空！' }]}>
            <Input.Password  placeholder="请输入确认密码！" />
        </Form.Item>
      </ModalForm>
    </Space>
  );
};
export default GlobalHeaderRight;
