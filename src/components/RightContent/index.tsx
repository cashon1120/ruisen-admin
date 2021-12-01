import { useState } from 'react';
import { Space } from 'antd';
import { Menu, Dropdown, Form, Input, message } from 'antd';
import React from 'react';
import styles from './index.less';
import ModalForm from '../ModalForm';
import HttpRequest from '@/utils/request';
import Uploader from '@/components/Upload';

export type SiderTheme = 'light' | 'dark';

const getUserInfo = () => {
  const userInfo = localStorage.getItem('useInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

const userInfo = getUserInfo();

const GlobalHeaderRight: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);

  const handleSubmitModal = (values: any) => {
    if (values.newPassword !== values.reNewPassword) {
      message.error('两次密码输入不一致');
      return;
    }
    delete values.reNewPassword;
    setLoading(true);
    HttpRequest({ method: 'put', url: 'admin/users/password', params: values, type: 'json' })
      .then((res: any) => {
        message.success('密码修改成功， 请重新登录');
        setTimeout(() => {
          handleLogout();
        }, 2000);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const [currentData, setCurrentDta] = useState<any>({});
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [avatar, setAvatar] = useState(userInfo.avatar);

  const handleUpdateAvatar = () => {
    setAvatarVisible(true);
  };
  const handleAvatarChange = (imgSrc: string) => {
    message.success('修改成功');
    setAvatarVisible(false);
    setAvatar(imgSrc);
  };

  const handleUpdateUserIfno = () => {
    setCurrentDta(getUserInfo());
    setVisibleInfo(true);
  };

  const handleSubmitInfo = (values: any) => {
    HttpRequest({
      method: 'put',
      url: 'admin/users/info',
      type: 'json',
      params: values,
    })
      .then(() => {
        message.success('操作成功');
        localStorage.setItem('useInfo', { ...getUserInfo(), ...values });
        setVisibleInfo(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('useInfo');
    location.href = '/login';
  };
  const menu = (
    <Menu style={{ marginTop: 10 }}>
      <Menu.Item key="password" onClick={() => setVisible(true)}>
        修改密码
      </Menu.Item>
      <Menu.Item key="avatar" onClick={handleUpdateAvatar}>
        修改头像
      </Menu.Item>
      <Menu.Item key="info" onClick={handleUpdateUserIfno}>
        修改资料
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Space>
      {/* <Dropdown overlay={menu}> */}
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          {userInfo.id ? (
            <>
              <img className={styles.avatar} src={avatar} />
              {userInfo.nickname}
            </>
          ) : (
            '未登录'
          )}
        </a>
      </Dropdown>
      <ModalForm
        title="修改密码"
        onFinish={handleSubmitModal}
        visible={visible}
        loading={loading}
        onCancel={() => setVisible(false)}
      >
        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[{ required: true, message: '旧密码不能为空！' }]}
        >
          <Input.Password placeholder="请输入旧密码！" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[{ required: true, message: '新密码不能为空！' }]}
        >
          <Input.Password placeholder="请输入新密码！" />
        </Form.Item>
        <Form.Item
          name="reNewPassword"
          label="确认密码"
          rules={[{ required: true, message: '确认密码不能为空！' }]}
        >
          <Input.Password placeholder="请输入确认密码！" />
        </Form.Item>
      </ModalForm>

      {avatarVisible ? (
        <ModalForm
          title="更新头像"
          onFinish={() => setAvatarVisible(false)}
          visible={avatarVisible}
          loading={loading}
          onCancel={() => setAvatarVisible(false)}
        >
          <Form.Item name="avatar" label="修改头像">
            <Uploader
              action="admin/users/avatar"
              data={{ fileType: 'AVATAR' }}
              imgSrc={avatar}
              name="file"
              onChange={handleAvatarChange}
            />
          </Form.Item>
        </ModalForm>
      ) : null}

      {visibleInfo ? (
        <ModalForm
          title="个人信息"
          onFinish={handleSubmitInfo}
          visible={true}
          loading={loading}
          initialValues={currentData}
          onCancel={() => setVisibleInfo(false)}
        >
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[{ required: true, message: '昵称不能为空！' }]}
          >
            <Input placeholder="请输入昵称！" />
          </Form.Item>

          <Form.Item name="intro" label="介绍">
            <Input placeholder="请输入介绍！" />
          </Form.Item>
        </ModalForm>
      ) : null}
    </Space>
  );
};
export default GlobalHeaderRight;
