import { useEffect } from 'react';
import { Form, Input, Select, InputNumber, DatePicker } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
import { connect } from 'dva';

let formInstance: any = null;
const CreateToDo = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;
  const { houseList,  fetchList} = props;
  const handleIconChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ icon: img });
    }
  };

  const handleReceiptChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ receipt: img });
    }
  };

  useEffect(() => {
    if(houseList.length === 0){
      fetchList()
    }
  }, [])

  return (
    <>
      <FormPage
        title={record ? '编辑事项' : '添加事项'}
        createUrl="to/do/list/add"
        updateUrl="to/do/list/update"
        backPath="/todo"
        data={record}
        dateKeys={['payDate', 'payEndDate', 'belongsDate']}
        onRef={(from: any) => (formInstance = from)}
        type="json"
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
          name="subtitle"
          label="副标题"
          rules={[
            {
              required: true,
              message: '请输入副标题',
            },
          ]}
        >
          <Input placeholder="请输入副标题" />
        </Form.Item>

        <Form.Item
          name="houseId"
          label="房产"
          rules={[
            {
              required: true,
              message: '请选择房产!',
            },
          ]}
        >
          <Select placeholder="请选择房产">
            {houseList.map((item: any) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="icon"
          label="图标"
          extra="小程序中显示的小图标, 建议大小70*70, 白色透明png"
          rules={[
            {
              required: true,
              message: '请输上传图标!',
            },
          ]}
        >
          <Uploader
            action="file/upload"
            data={{ fileType: 'TO_DO_LIST_ICON' }}
            defaultFile={record?.icon}
            colorbg
            onChange={handleIconChange}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          rules={[
            {
              required: true,
              message: '请选择状态!',
            },
          ]}
        >
          <Select placeholder="请选择状态">
            <Select.Option value="1">无缴费信息</Select.Option>
            <Select.Option value="2">待缴费</Select.Option>
            <Select.Option value="3">已缴费</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="amount" label="金额">
          <InputNumber placeholder="请输入金额"  style={{width: 150}}/>
        </Form.Item>

        <Form.Item name="payDate" label="缴费日期">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="belongsDate" label="缴费所属日期">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="payEndDate" label="截止日期">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="receipt" label="收据">
          <Uploader
            data={{ fileType: 'RECEIPT' }}
            defaultFile={record?.receipt}
            onChange={handleReceiptChange}
          />
        </Form.Item>

        <Form.Item name="description" label="描述信息">
          <Input.TextArea placeholder="请输入描述信息" />
        </Form.Item>
      </FormPage>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    houseList: state.global.houseList,
  };
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchList() {
      dispatch({
        type: 'global/getHouseList',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateToDo);
