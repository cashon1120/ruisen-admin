import { useEffect } from 'react';
import { Form, Input, InputNumber, Select, DatePicker } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
import { houseStatus, houseType, authenticationStatus } from '@/utils/enum';
import { connect } from 'dva';
import Guid, { Item } from './guid';

let guidData: Item[] = [];
let formInstance: any = null;
const CreateHouse = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;
  const showDetail = props.location.state ? props.location.state.showDetail : null;
  const { userList, fetchList } = props;
  const handleGuidChange = (data: Item[]) => {
    guidData = data;
    formInstance.setFieldsValue({ ownerGuideList: data.length === 0 ? '' : guidData });
  };

  const handleChange = (imgs: any[]) => {
    if (imgs.length === 0) {
      formInstance.setFieldsValue({ floorPlan: '' });
    };
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ floorPlan: img });
    }
  };

  const handleHousePhotoChange = (imgs: any[]) => {
    if (imgs.length === 0) {
      formInstance.setFieldsValue({ photoList: [] });
      return;
    }
    const result: string[] = [];
    imgs.forEach((item: any) => {
      if (item.response) {
        result.push(item.response.data);
      } else {
        result.push(item.url);
      }
    });
    formInstance.setFieldsValue({ photoList: result });
  };

  useEffect(() => {
    if (userList.length === 0) {
      fetchList();
    }
  }, []);

  return (
    <>
      <FormPage
        title={record ? '编辑房产' : '添加房产'}
        createUrl="house/add"
        updateUrl="house/update"
        backPath="/house"
        dateKeys={['transferDate']}
        type="json"
        data={record}
        initialValues={{ record }}
        showDetail={showDetail}
        onRef={(form: any) => (formInstance = form)}
      >
        <Form.Item
          name="title"
          label="房产名"
          rules={[
            {
              required: true,
              message: '请输入房产名',
            },
          ]}
        >
          <Input placeholder="请输入标题" maxLength={30} />
        </Form.Item>

        <Form.Item
          name="userId"
          label="用户"
          rules={[
            {
              required: true,
              message: '请选择用户',
            },
          ]}
        >
          <Select placeholder="请选择用户">
            {userList.map((item: any) => (
              <Select.Option value={item.value} key={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="ownerName"
          label="业主姓名"
          rules={[
            {
              required: true,
              message: '请输入业主姓名',
            },
          ]}
        >
          <Input placeholder="请输入业主姓名" maxLength={30} />
        </Form.Item>

        <Form.Item
          name="roomNo"
          label="房号"
          rules={[
            {
              required: true,
              message: '请输入房号',
            },
          ]}
        >
          <Input placeholder="请输入房号" maxLength={30} />
        </Form.Item>

        <Form.Item
          name="address"
          label="地址"
          rules={[
            {
              required: true,
              message: '请输入地址',
            },
          ]}
        >
          <Input placeholder="请输入地址" maxLength={50} />
        </Form.Item>

        <Form.Item
          name="area"
          label="面积"
          rules={[
            {
              required: true,
              message: '请输入面积',
            },
          ]}
        >
          <InputNumber
            placeholder="请输入面积"
            min={1}
            maxLength={10}
            max={100000}
            style={{ width: 180 }}
            addonAfter="m²"
          />
        </Form.Item>

        <Form.Item
          name="authenticationStatus"
          label="认证状态"
          rules={[
            {
              required: true,
              message: '请选择认证状态',
            },
          ]}
        >
          <Select placeholder="请选择认证状态">
            {Object.keys(authenticationStatus).map((key: string) => (
              <Select.Option value={key} key={key}>
                {authenticationStatus[key]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="houseStatus"
          label="房产状态"
          rules={[
            {
              required: true,
              message: '请选择房产状态',
            },
          ]}
        >
          <Select placeholder="请选择房产状态">
            {Object.keys(houseStatus).map((key: string) => (
              <Select.Option value={key} key={key}>
                {houseStatus[key]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="type"
          label="房产类型"
          rules={[
            {
              required: true,
              message: '请选择房产类型',
            },
          ]}
        >
          <Select placeholder="请选择房产类型">
            {Object.keys(houseType).map((key: string) => (
              <Select.Option value={key} key={key}>
                {houseType[key]}
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
          <Input placeholder="请输入币种" maxLength={10} />
        </Form.Item>

        <Form.Item
          name="transferDate"
          label="过户日期"
          rules={[
            {
              required: true,
              message: '请选择过户日期',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="nationalCity"
          label="国家城市"
          rules={[
            {
              required: true,
              message: '请输入国家城市',
            },
          ]}
        >
          <Input placeholder="请输入国家城市" maxLength={50} />
        </Form.Item>

        <Form.Item
          name="developer"
          label="开发商"
          rules={[
            {
              required: true,
              message: '请输入开发商!',
            },
          ]}
        >
          <Input placeholder="请输入开发商" maxLength={30} />
        </Form.Item>

        <Form.Item
          name="floorPlan"
          label="户型图"
          rules={[
            {
              required: true,
              message: '请输上传户型图!',
            },
          ]}
        >
          <Uploader
            action="file/upload"
            data={{ fileType: 'FLOOR_PLAN' }}
            defaultFile={record?.floorPlan}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="photoList"
          label="房产照片"
          extra="建议大小：750*740"
          rules={[
            {
              required: true,
              message: '请输上传房产照片!',
            },
          ]}
        >
          <Uploader
            action="file/upload"
            data={{ fileType: 'HOUSE_PHOTOS' }}
            defaultFile={record?.photoList}
            maxLength={6}
            onChange={handleHousePhotoChange}
          />
        </Form.Item>

        <Form.Item
          name="ownerGuideList"
          label="业主指南"
          rules={[
            {
              required: true,
              message: '请输添加业主指南!',
            },
          ]}
        >
          <Guid onFormChange={handleGuidChange} defaultData={record?.ownerGuideList} />
        </Form.Item>
      </FormPage>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userList: state.global.userList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchList() {
      dispatch({
        type: 'global/getUserList',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateHouse);
