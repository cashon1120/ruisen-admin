import { Form, Input, Radio } from 'antd';
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
  const handleLogoChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ logo: img });
    }
  };

  const handleFormFormatValue = (values: any) => {
    values.enable = parseInt(values.enable);
    return values;
  };

  return (
    <>
      <FormPage
        title={record ? '编辑管理信息' : '添加管家'}
        createUrl="butler/service/add"
        updateUrl="butler/service/update"
        backPath="/service"
        data={record}
        type="json"
        onRef={(from: any) => (formInstance = from)}
        initialValues={{enable: '1'}}
        formatValue={handleFormFormatValue}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item
          name="serviceArea"
          label="服务地区"
          rules={[
            {
              required: true,
              message: '请输入服务地区!',
            },
          ]}
        >
          <Input placeholder="请输入服务地区, 如中国*成都" />
        </Form.Item>

        <Form.Item
          name="image"
          label="图片"
          extra="页面顶部banner图, 建议大小750*340"
          rules={[
            {
              required: true,
              message: '请输上传图片!',
            },
          ]}
        >
          <Uploader
            data={{ fileType: 'BUTLER_SERVICE_IMAGE' }}
            defaultFile={record?.image}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="logo"
          label="LOGO"
          extra="小程序中显示的小图标, 大小70*70, 白色透明png"
          rules={[
            {
              required: true,
              message: '请输上传图片!',
            },
          ]}
        >
          <Uploader
            data={{ fileType: 'BUTLER_SERVICE_LOGO' }}
            colorbg
            defaultFile={record?.logo}
            onChange={handleLogoChange}
          />
        </Form.Item>

        <Form.Item name="serviceIntro" label="服务介绍">
          <Input.TextArea placeholder="请输入服务介绍" />
        </Form.Item>

        <Form.Item name="serviceProcess" label="服务流程">
          <Input.TextArea placeholder="请输入服务流程" />
        </Form.Item>

        <Form.Item name="chargeStandard" label="收费标准">
          <Input.TextArea placeholder="请输入收费标准" />
        </Form.Item>

        {!record ? (
          <Form.Item name="enable" label="是否启用">
            <Radio.Group>
              <Radio value="1">启用</Radio>
              <Radio value="2">禁用</Radio>
            </Radio.Group>
          </Form.Item>
        ) : null}
      </FormPage>
    </>
  );
};

export default CreateNews;
