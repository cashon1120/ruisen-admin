import { useState, memo } from 'react';
import { Menu, Dropdown, Form, Input, message } from 'antd';
import React from 'react';
import styles from './index.less';
import ModalForm from '../ModalForm';
import HttpRequest from '@/utils/request';
import Uploader from '@/components/Upload';
import { formatImgSrc } from '@/utils/commonUtils';
import { LockOutlined, SmileOutlined, FileOutlined, LogoutOutlined } from '@ant-design/icons';

export type SiderTheme = 'light' | 'dark';

const getUserInfo = () => {
  const userInfo = localStorage.getItem('useInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return {};
};

const GlobalHeaderRight: React.FC = () => {
  const [visiblePassword, setVisiblePasswrod] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserInfo());
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = (values: any) => {
    if (values.newPassword !== values.reNewPassword) {
      message.error('两次密码输入不一致');
      return;
    }
    delete values.reNewPassword;
    setLoading(true);
    HttpRequest({ method: 'put', url: 'admin/users/password', params: values, type: 'json' })
      .then(() => {
        message.success('密码修改成功， 请重新登录');
        setTimeout(() => {
          handleLogout();
        }, 2000);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const [currentData, setCurrentDta] = useState<any>({});
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [avatar, setAvatar] = useState(formatImgSrc(userInfo.avatar));

  const handleUpdateAvatar = () => {
    setAvatarVisible(true);
  };
  const handleAvatarChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    const image = imgs[0];
    if (image.status === 'done') {
      if (image.response.code !== 20000) {
        message.error(image.response.message);
        return;
      }
      const img = image.response.data;
      message.success('修改成功');
      localStorage.setItem('useInfo', JSON.stringify({ ...getUserInfo(), avatar: img }));
      setAvatar(formatImgSrc(img));
    }
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
        localStorage.setItem('useInfo', JSON.stringify({ ...getUserInfo(), ...values }));
        setUserInfo(getUserInfo());
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
    <Menu>
      <Menu.Item key="password" icon={<LockOutlined />} onClick={() => setVisiblePasswrod(true)}>
        修改密码
      </Menu.Item>
      <Menu.Item key="avatar" icon={<SmileOutlined />} onClick={handleUpdateAvatar}>
        修改头像
      </Menu.Item>
      <Menu.Item key="info" icon={<FileOutlined />} onClick={handleUpdateUserIfno}>
        修改资料
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()} className={styles.userWrapper}>
          {userInfo.id ? (
            <>
              <div className={styles.avatarWrapper}>
                <img className={styles.avatar} src={avatar} />
              </div>
              {userInfo.nickname}
            </>
          ) : (
            '未登录'
          )}
        </a>
      </Dropdown>

      {visiblePassword ? (
        <ModalForm
          title="修改密码"
          onFinish={handleUpdatePassword}
          visible={visiblePassword}
          loading={loading}
          onCancel={() => setVisiblePasswrod(false)}
        >
          <Form.Item
            name="oldPassword"
            label="旧密码"
            rules={[{ required: true, message: '旧密码不能为空!' }]}
          >
            <Input.Password placeholder="请输入旧密码!" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[{ required: true, message: '新密码不能为空!' }]}
          >
            <Input.Password placeholder="请输入新密码!" />
          </Form.Item>
          <Form.Item
            name="reNewPassword"
            label="确认密码"
            rules={[{ required: true, message: '确认密码不能为空!' }]}
          >
            <Input.Password placeholder="请输入确认密码!" />
          </Form.Item>
        </ModalForm>
      ) : null}

      {avatarVisible ? (
        <ModalForm
          title="修改头像"
          footer={null}
          onFinish={() => {}}
          visible={avatarVisible}
          loading={loading}
          onCancel={() => setAvatarVisible(false)}
        >
          <Form.Item name="avatar" label="选择头像" extra="图片建议大小: 80*80">
            <Uploader
              action="admin/users/avatar"
              data={{ fileType: 'AVATAR' }}
              defaultFile={avatar}
              onChange={handleAvatarChange}
            />
          </Form.Item>
        </ModalForm>
      ) : null}

      {visibleInfo ? (
        <ModalForm
          title="修改资料"
          onFinish={handleSubmitInfo}
          visible={true}
          loading={loading}
          initialValues={currentData}
          onCancel={() => setVisibleInfo(false)}
        >
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[{ required: true, message: '昵称不能为空!' }]}
          >
            <Input placeholder="请输入昵称!" maxLength={10} />
          </Form.Item>

          <Form.Item name="intro" label="介绍">
            <Input placeholder="请输入介绍!" />
          </Form.Item>
        </ModalForm>
      ) : null}
    </>
  );
};

export default memo(GlobalHeaderRight);
