import { Form, Input } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
let formInstance: any = null;

const CreateData = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;
  const handleChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ avatar: img });
    }
  };

  return (
    <>
      <FormPage
        title={record ? '编辑账号' : '添加账号'}
        createUrl="admin/users/add"
        updateUrl="admin/users/add"
        backPath="/admin"
        data={record}
        onRef={(from: any) => (formInstance = from)}
        type="json"
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input placeholder="请输用户名" maxLength={20} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="昵称"
          rules={[
            {
              required: true,
              message: '请输入昵称',
            },
          ]}
        >
          <Input placeholder="请输昵称" maxLength={20} />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input placeholder="请输入密码" maxLength={30} minLength={6} />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
            {
              pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              message: '请输入正确的邮箱',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="头像"
          rules={[
            {
              required: true,
              message: '请输上传头像!',
            },
          ]}
        >
          <Uploader
            action="file/upload"
            data={{ fileType: 'AVATAR' }}
            defaultFile={record?.avatar}
            onChange={handleChange}
          />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateData;
