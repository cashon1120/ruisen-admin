import { useState, useEffect } from 'react';
import { Form, message, Button } from 'antd';
import { history } from 'umi';
import Wrapper from '@/components/Wrapper/Index';
import HttpRequest from '@/utils/request';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

interface IProps {
  title: string;
  createUrl: string;
  updateUrl: string;
  children: any;
  backPath: string;
  imageList?: any;
  data?: any;
  getUrl?: string;
  rules?: any;
  type?: 'json' | 'formData';
}

const FormPage = (props: IProps) => {
  const { data, title, createUrl, updateUrl, imageList, backPath, type } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // 提交表单
  const onFinish = (values: any) => {
    console.log(values);
    // 图片处理
    Object.keys(values).forEach((key: string) => {
      if (imageList && imageList[key]) {
        values[key] = imageList[key];
      }
    });
    if (data) {
      values = {
        ...data,
        ...values,
      };
    }
    setLoading(true);
    HttpRequest({ method: 'post', params: values, url: data ? updateUrl : createUrl, type }).then(
      () => {
        setLoading(false);
        message.success('操作成功');
        history.goBack();
      },
    );
  };

  const setFormData = () => {
    Object.keys(data).map((key: string) => {
      form.setFieldsValue({ [key]: data[key] });
    });
  };

  useEffect(() => {
    data && setFormData();
  }, []);

  return (
    <Wrapper title={title}>
      <div style={{ width: 800 }}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          {props.children}
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>

            <Button
              type="default"
              onClick={() => history.push(backPath)}
              style={{ marginLeft: 15 }}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
};

export default FormPage;
