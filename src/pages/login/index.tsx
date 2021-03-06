import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { history } from 'umi';
import HttpRequest from '@/utils/request';
import styles from './index.less';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptch] = useState({
    key: 0,
    data: '',
  });
  const onFinish = (values: any) => {
    values.captchaKey = captcha.key;
    let remember = values.remember;
    delete values.remember;
    setLoading(true);
    HttpRequest({ url: 'admin/login', params: values })
      .then((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('useInfo', JSON.stringify(res));
        history.push('/home');
        if (remember) {
          localStorage.setItem('username', values.username);
          localStorage.setItem('password', values.password);
          localStorage.setItem('remember', remember);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('remember');
        }
      })
      .finally(() => setLoading(false));
  };

  const getCaptcha = () => {
    HttpRequest({ url: 'admin/captcha', method: 'get' }).then((res: any) => {
      setCaptch(res);
    });
  };

  useEffect(getCaptcha, []);
  const initialValues: any = {};
  if (localStorage.getItem('remember')) {
    initialValues.username = localStorage.getItem('username');
    initialValues.password = localStorage.getItem('password');
    initialValues.remember = localStorage.getItem('remember');
  }
  return (
    <div className={styles.outer}>
      <div className={styles.wrapper}>
        <h2>瑞森海外房管家管理系统</h2>
        <Form name="normal_login" initialValues={initialValues} onFinish={onFinish}>
          <Form.Item
            label="账号"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号!',
              },
            ]}
          >
            <Input placeholder="账号" size="large" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>

          <Form.Item label="验证码" rules={[{ required: true }]}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <img src={captcha.data} className={styles.captch} onClick={getCaptcha} />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              size="large"
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
