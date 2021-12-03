import { useState, useEffect } from 'react';
import { Form, message, Button } from 'antd';
import moment from 'moment'
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
  dateKeys?: string[];
  getUrl?: string;
  rules?: any;
  type?: 'json' | 'formData';
  formatValue?: (values: any) => any;
  onRef?: (form: any) => void;
  initialValues?: any
}

const FormPage = (props: IProps) => {
  const { data, title, createUrl, updateUrl, backPath, type, formatValue, onRef, dateKeys, initialValues } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // 提交表单
  const onFinish = (values: any) => {
    if (data) {
      values = {
        ...data,
        ...values,
      };
    }

    Object.keys(values).forEach((key: string) => {
      if (dateKeys?.includes(key)) {
        values[key] = values[key].format('YYYY-MM-DD');
      }

      if(typeof values[key] === 'boolean'){
        values[key] = values[key] ? 1 : 0
      }
    });

    if (formatValue) {
      values = formatValue(values);
    }

    setLoading(true);
    HttpRequest({ method: 'post', params: values, url: data ? updateUrl : createUrl, type })
      .then(() => {
        message.success('操作成功');
        history.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setFormData = () => {
    Object.keys(data).map((key: string) => {
      let value = data[key];
      if (typeof data[key] === 'number') {
        value = data[key].toString();
      }
      if (dateKeys?.includes(key)) {
        value = moment(value);
      }
      form.setFieldsValue({ [key]: value });
    });
  };

  // 如果有data说明是修改或编辑, 需要设置表单的值
  useEffect(() => {
    data && setFormData();
    onRef && onRef(form);
  }, []);

  return (
    <Wrapper title={title}>
      <div style={{ width: 800 }}>
        <Form
          {...formItemLayout}
          form={form}
          name="form"
          onFinish={onFinish}
          initialValues={initialValues}
          scrollToFirstError
        >
          {props.children}
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>

            <Button
              type="default"
              onClick={() => history.push(`/${backPath.replace('/', '')}`)}
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
