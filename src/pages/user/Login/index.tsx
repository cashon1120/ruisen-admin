import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import styles from './index.less'
const Login = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.outer}>
      <div className={styles.wrapper}>
        <h2>瑞森管家后台管理系统</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
          remember: true
        }}
          onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{
              required: true,
              message: '请输入账号!'
            }
          ]}>
            <Input
              prefix={< UserOutlined className = "site-form-item-icon" />}
              placeholder="账号"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              required: true,
              message: '请输入密码'
            }
          ]}>
            <Input prefix={< LockOutlined />} type="password" placeholder="密码"/>
          </Form.Item>

          <Form.Item>
            <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
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

export default Login
