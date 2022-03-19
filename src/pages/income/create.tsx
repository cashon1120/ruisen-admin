import { useEffect } from 'react';
import { Form, DatePicker, InputNumber, Select } from 'antd';
import { connect } from 'dva';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
let formInstance: any = null;
const CreateIncome = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;
  const { rentalList, fetchList } = props;
  const handleChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ leaseContract: img });
    }
  };

  const handleBillChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ bill: img });
    }
  };

  useEffect(() => {
    if (rentalList.length === 0) {
      fetchList();
    }
  }, []);
  return (
    <>
      <FormPage
        title={record ? '编辑收益记录' : '添加收益记录'}
        createUrl="rental/income/add"
        updateUrl="rental/income/update"
        backPath="/income"
        dateKeys={['leaseStartTime', 'leaseEndTime']}
        type="json"
        data={record}
        onRef={(from: any) => (formInstance = from)}
        initialValues={{ currency: '泰铢' }}
      >
        <Form.Item
          name="rentalRecordId"
          label="出租记录"
          rules={[
            {
              required: true,
              message: '请选择出租记录!',
            },
          ]}
        >
          <Select placeholder="请选择出租记录">
            {rentalList.map((item: any) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="currency"
          label="币种"
          rules={[
            {
              required: true,
              message: '请输入币种',
            },
          ]}
        >
          <Input placeholder="请输入币种" disabled />
        </Form.Item> */}

        <Form.Item
          name="rental"
          label="租金"
          rules={[
            {
              required: true,
              message: '请输入租金',
            },
          ]}
        >
          <InputNumber placeholder="请输入租金" style={{ width: 150 }} />
        </Form.Item>

        <Form.Item
          name="leaseStartTime"
          label="租期开始时间"
          rules={[
            {
              required: true,
              message: '请选择租期开始时间',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="leaseEndTime"
          label="租期结束时间"
          rules={[
            {
              required: true,
              message: '请选择租期结束时间',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="bill"
          label="账单"
          rules={[
            {
              required: true,
              message: '请输上传账单!',
            },
          ]}
        >
          <Uploader
            data={{ fileType: 'BILL' }}
            defaultFile={record?.bill}
            onChange={handleBillChange}
          />
        </Form.Item>
      </FormPage>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    rentalList: state.global.rentalList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchList() {
      dispatch({
        type: 'global/getRentalList',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateIncome);
