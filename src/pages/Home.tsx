import { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { history } from 'umi';
import FormPage, { tailFormItemLayout } from '@/components/FormPage';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { URL } from '@/utils/request';

const CreateNews = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;

  const [imgSrc, setImgSrc] = useState(record ? record.image : '');

  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>添加图片</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setImgSrc(info.file.response.data);
    }
  };

  const rules = [
    {
      name: 'link',
      rule: (value: string) => {
        const reg =
          /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

        return reg.test(value);
      },
    },
  ];

  return (
    <FormPage
      title={record ? '编辑资讯' : '添加资讯'}
      createUrl="/news/add"
      updateUrl="/news/update"
      data={record}
      rules={rules}
    >
      <Form.Item
        name="title"
        label="标题"
        rules={[
          {
            required: true,
            message: '请输入标题',
          },
        ]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>

      <Form.Item
        name="link"
        label="链接"
        rules={[
          {
            required: true,
            message: '请输入链接!',
          },
          {
            pattern:
              /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
            message: '请输入正确的网址',
          },
        ]}
      >
        <Input placeholder="请输入链接 http://" />
      </Form.Item>

      <Form.Item
        name="image"
        label="图片"
        rules={[
          {
            required: true,
            message: '请输上传图片!',
          },
        ]}
      >
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          fileList={[]}
          action={`${URL}file/upload`}
          onChange={handleChange}
          accept=".png, .jpg, .jpeg, .gif"
          data={{ fileType: 'NEWS' }}
          headers={{
            token: localStorage.getItem('token') || '',
          }}
        >
          {imgSrc ? <img src={imgSrc} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>

        <Button type="default" onClick={history.goBack} style={{ marginLeft: 15 }}>
          返回
        </Button>
      </Form.Item>
    </FormPage>
  );
};

export default CreateNews;
