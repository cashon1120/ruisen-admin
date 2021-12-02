import { Form, Row, Col, Button, Card, Spin } from 'antd';
import styles from './style.less';

const form_layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/**
 * @param {loading} 加载状态
 * @param {initialValues} 表单初始值, 如: {Name: 'admin', ...}
 * @param {onFinish} 提交表单事件
 * @param {onRef} 获取组件实例, 可调用 Form 的方法, 如获取详情后需要在父组件调用 setFieldsValue 方法给表单重新赋值, 用setState没效果(官方文档)
 * @param {layout} 布局比例, 默认用上面定义的 form_layout,
 * children 是React的children, 不用管
 */

export interface BasicFormProps {
  loading: boolean;
  status?: boolean;
  initialValues?: any;
  onFinish: (values?: any) => void;
  children?: any;
  layout?: { labelCol: number; wrapperCol: number };
  onRef?: (e: any) => void;
  onValuesChange?: (value: any) => void;
  hasOther?: boolean;
  onCancel?: any;
}

const onFormFinish = (values: any, onFinish: Function) => {
  Object.keys(values).forEach((key: string) => {
    if (typeof values[key] === 'string') {
      values[key] = values[key].replace(/\s/g, '');
    }
  });
  onFinish(values);
};

const BasicForm = (props: BasicFormProps) => {
  const formItem: any = props.children || [];
  const {
    onFinish,
    initialValues,
    onRef,
    loading,
    layout,
    onValuesChange,
    hasOther,
    onCancel,
    status,
  } = props;

  if (layout) {
    form_layout.labelCol.span = layout.labelCol;
    form_layout.wrapperCol.span = layout.wrapperCol;
  }
  const formItemArray: any = [];
  formItem.map((item: any, index: number) => {
    if (!item) return;
    // 特殊处理批量新增表单
    if (Array.isArray(item.props.children) && !hasOther) {
      item.props.children.map((child: any, ind: number) => {
        formItemArray.push(
          <Col key={`${ind}_child`} md={24} lg={12}>
            {child}
          </Col>,
        );
      });
    } else {
      const lg = item.type === 'div' ? 24 : 12;
      formItemArray.push(
        <Col key={`${index}_item`} md={24} lg={lg}>
          {item}
        </Col>,
      );
    }
  });
  return (
    <Spin spinning={loading}>
      <Card className={styles['page-form-container']}>
        <Form
          {...form_layout}
          ref={(e) => (onRef ? onRef(e) : null)}
          scrollToFirstError={true}
          onFinish={(values) => onFormFinish(values, onFinish)}
          initialValues={initialValues}
          onValuesChange={onValuesChange}
        >
          <Row gutter={[20, 0]}>{formItemArray.map((item: any) => item)}</Row>
          <div className={styles.page_form_button}>
            <Button type="primary" htmlType="submit" loading={loading} disabled={status || false}>
              确定
            </Button>
            <Button onClick={onCancel}>取消</Button>
          </div>
        </Form>
      </Card>
    </Spin>
  );
};

export default BasicForm;
