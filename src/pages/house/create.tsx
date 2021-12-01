import { useState } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Upload } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
import { houseStatus, houseType, authenticationStatus } from './index';
import Guid, {Item} from './guid'

let guidData: Item[] = []
let formInstance: any = null
const CreateNews = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;

  const [imgSrc, setImgSrc] = useState(record ? record.image : '');
  const [imageList, setImageList] = useState({ image: '' });

  const handleChange = (imgSrc: string) => {
    setImgSrc(imgSrc);
    setImageList({ image: imgSrc });
  };

  const handleGuidChange = (data: Item[]) => {
    guidData = data
    console.log(data)
    formInstance.setFieldsValue({ownerGuideList: data.length === 0 ? '' : guidData})
  }

  return (
    <>
      <FormPage
        title={record ? '编辑房产' : '添加房产'}
        createUrl="house/add"
        updateUrl="house/update"
        backPath="/house/list"
        data={record}
        imageList={imageList}
        onRef={(form: any) => formInstance = form}
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
          <Input placeholder="请输入标题" maxLength={30} />
        </Form.Item>

        <Form.Item
          name="title"
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
          <InputNumber placeholder="请输入面积" min={0} />
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
          name="transferDate"
          label="过户日期"
          rules={[
            {
              required: true,
              message: '请选择过户日期',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="address"
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
          name="transferDate"
          label="过户日期"
          rules={[
            {
              required: true,
              message: '请选择过户日期',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
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
            imgSrc={imgSrc}

            name="file"
            onChange={handleChange}
          />
        </Form.Item>


        <Form.Item
          name="photoList"
          label="房产照片"
          rules={[
            {
              required: true,
              message: '请输上传户型图!',
            },
          ]}
        >
          <Uploader
            action="file/upload"
            data={{ fileType: 'HOUSE_PHOTOS' }}
            imgSrc={imgSrc}
            name="file"
            maxLength={6}
            onChange={handleChange}
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
          <Guid onFormChange={handleGuidChange} />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateNews;
