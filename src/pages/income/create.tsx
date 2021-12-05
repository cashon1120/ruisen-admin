import { Form, Input } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
let formInstance: any = null;
const CreateNews = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;
  const handleChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ image: img });
    }
  };

  return (
    <>
      <FormPage
        title={record ? '编辑资讯' : '添加资讯'}
        createUrl="news/add"
        updateUrl="news/update"
        backPath="/news"
        data={record}
        onRef={(from: any) => (formInstance = from)}
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
          <Uploader
            data={{ fileType: 'NEWS' }}
            defaultFile={record?.image}
            onChange={handleChange}
          />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateNews;
