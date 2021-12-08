import { Radio, Form, Input, InputNumber } from 'antd';
import ModalForm from '@/components/ModalForm';

interface IProps {
  handleSubmit: (values: any) => void;
  handleCancel: () => void;
  loading: boolean;
  initialValues?: any;
}

const CreateProgress = (props: IProps) => {
  const { handleSubmit, handleCancel, loading, initialValues } = props;
  return (
    <ModalForm
      zIndex={1000}
      title="修改进度"
      onFinish={handleSubmit}
      visible={true}
      loading={loading}
      initialValues={initialValues}
      onCancel={handleCancel}
    >
      <Form.Item
        name="progressName"
        label="进度名称"
        rules={[{ required: true, message: '进度名称不能为空！' }]}
      >
        <Input placeholder="请输入进度名称" />
      </Form.Item>

      <Form.Item
        name="sortNumber"
        label="排序编号"
        rules={[{ required: true, message: '排序编号不能为空！' }]}
      >
        <InputNumber placeholder="请输入排序编号" style={{ width: 150 }} />
      </Form.Item>

      {!initialValues ? (
        <Form.Item name="isEnd" label="是否完结">
          <Radio.Group>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </Form.Item>
      ) : null}

      <Form.Item name="progressDetail" label="进度详情">
        <Input placeholder="请输入进度详情" />
      </Form.Item>
    </ModalForm>
  );
};

export default CreateProgress;
