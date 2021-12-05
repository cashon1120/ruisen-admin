import { useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Select } from 'antd';
import { connect } from 'dva';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
let formInstance: any = null;
const CreateIncome = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;
  const { houseList,  fetchList} = props;
  const handleChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ leaseContract: img });
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
        title={record ? '编辑收益记录' : '添加收益记录'}
        createUrl="rental/income/add"
        updateUrl="rental/income/update"
        backPath="/income"
        dateKeys={['leaseStartTime', 'leaseEndTime']}
        type="json"
        data={record}
        onRef={(from: any) => (formInstance = from)}
      >

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
          name="currency"
          label="币种"
          rules={[
            {
              required: true,
              message: '请输入币种',
            },
          ]}
        >
          <Input placeholder="请输入币种" />
        </Form.Item>

        <Form.Item
          name="rental"
          label="租金"
          rules={[
            {
              required: true,
              message: '请输入币种',
            },
          ]}
        >
          <InputNumber placeholder="请输入币种" style={{width: 150}} />
        </Form.Item>

        <Form.Item
          name="rentalUnit"
          label="租金单位"
          rules={[
            {
              required: true,
              message: '请输入租金单位',
            },
          ]}
        >
          <Input placeholder="请输入租金单位" />
        </Form.Item>

        <Form.Item
          name="totalRental"
          label="总租金"
          rules={[
            {
              required: true,
              message: '请输入总租金',
            },
          ]}
        >
          <InputNumber placeholder="请输入总租金" style={{width: 150}} />
        </Form.Item>

        <Form.Item
          name="rentalStatus"
          label="出租状态"
          rules={[
            {
              required: true,
              message: '请输入出租状态',
            },
          ]}
        >
          <Input placeholder="请输入出租状态" />
        </Form.Item>

        <Form.Item name="leaseStartTime" label="租期开始时间" rules={[
            {
              required: true,
              message: '请选择租期开始时间',
            },
          ]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="leaseEndTime" label="租期结束时间" rules={[
            {
              required: true,
              message: '请选择租期结束时间',
            },
          ]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="leaseContract"
          label="租赁合同"
          rules={[
            {
              required: true,
              message: '请输上传租赁合同!',
            },
          ]}
        >
          <Uploader
            data={{ fileType: 'LEASE_CONTRACT' }}
            defaultFile={record?.leaseContract}
            onChange={handleChange}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateIncome);
