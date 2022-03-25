import { useState, useEffect } from 'react';
import { Form, message, Button } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import Wrapper from '@/components/Wrapper/Index';
import HttpRequest from '@/utils/request';
import styles from './index.less';
import { formatImgSrcBack } from '@/utils/commonUtils';

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 18 },
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
  initialValues?: any;
  showDetail?: boolean;
}

const FormPage = (props: IProps) => {
  const {
    data,
    title,
    showDetail,
    createUrl,
    updateUrl,
    backPath,
    type,
    formatValue,
    onRef,
    dateKeys,
    initialValues,
  } = props;
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
        if (values[key]) {
          values[key] = values[key].format('YYYY-MM-DD');
        } else {
          values[key] = '';
        }
      }
      if (typeof values[key] === 'boolean') {
        values[key] = values[key] ? 1 : 0;
      }
    });

    const imgKeys = [
      'image',
      'avatar',
      'leaseContract',
      'floorPlan',
      'logo',
      'butlerServiceLogo',
      'icon',
      'receipt',
      'bill',
    ];

    imgKeys.forEach((key: string) => {
      if (values[key]) {
        values[key] = formatImgSrcBack(values[key]);
      }
    });

    if (values.photoList) {
      for (let i = 0; i < values.photoList.length; i++) {
        values.photoList[i] = formatImgSrcBack(values.photoList[i]);
      }
    }
    if (values.ownerGuideList) {
      for (let i = 0; i < values.ownerGuideList.length; i++) {
        values.ownerGuideList[i].icon = formatImgSrcBack(values.ownerGuideList[i].icon);
        if (values.ownerGuideList[i].imageList) {
          for (let j = 0; j < values.ownerGuideList[i].imageList.length; j++) {
            values.ownerGuideList[i].imageList[j] = formatImgSrcBack(
              values.ownerGuideList[i].imageList[j],
            );
          }
        }
      }
    }

    if (formatValue) {
      values = formatValue(values);
    }

    if (!values) return;
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
      <div className={styles.wrapper}>
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
            {!showDetail ? (
              <Button
                style={{ marginRight: 15 }}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                提交
              </Button>
            ) : null}
            <Button type="default" onClick={() => history.push(`/${backPath.replace('/', '')}`)}>
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
};

export default FormPage;
