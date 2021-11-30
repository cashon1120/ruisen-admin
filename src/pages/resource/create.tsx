import { useState } from 'react';
import { Form, Input } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';

const CreateNews = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;

  const [imgSrc, setImgSrc] = useState(record ? record.image : '');
  const [imageList, setImageList] = useState({ image: '' });

  const handleChange = (imgSrc: string) => {
    setImgSrc(imgSrc);
    setImageList({ image: imgSrc });
  };

  return (
    <>
      <FormPage
        title={record ? '编辑资讯' : '添加资讯'}
        createUrl="/news/add"
        updateUrl="/news/update"
        backPath="/news/list"
        data={record}
        imageList={imageList}
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
            action="file/upload"
            data={{ fileType: 'NEWS' }}
            imgSrc={imgSrc}
            name="file"
            onChange={handleChange}
          />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateNews;
