import { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, DatePicker } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
import HttpRequest from '@/utils/request';

const CreateNews = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;

  const [icon, setIcon] = useState(record ? record.image : '');
  const [receipt, setReceipt] = useState(record ? record.image : '');
  const [imageList, setImageList] = useState({ icon: '', receipt: '' });

  const handleIconChange = (imgSrc: string) => {
    setIcon(imgSrc);
    setImageList({ ...imageList, icon: imgSrc });
  };

  const handleReceiptChange = (imgSrc: string) => {
    setReceipt(imgSrc);
    setImageList({ ...imageList, receipt: imgSrc });
  };

  const [houseList, setHouseList] = useState([]);
  const getHouseList = () => {
    HttpRequest({ method: 'get', url: 'house/all/list' }).then((res: any) => {
      setHouseList(res.recordList);
    });
  };

  useEffect(() => {
    getHouseList();
  }, []);

  return (
    <>
      <FormPage
        title={record ? '编辑资讯' : '添加资讯'}
        createUrl="to/do/list/add"
        updateUrl="/news/update"
        backPath="/news/list"
        data={record}
        imageList={imageList}
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
            imgSrc={icon}
            name="file"
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
            <Select.Option value={1}>无缴费信息</Select.Option>
            <Select.Option value={2}>待缴费</Select.Option>
            <Select.Option value={3}>已缴费</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="amount" label="金额">
          <InputNumber placeholder="请输入金额" />
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
            action="file/upload"
            data={{ fileType: 'RECEIPT' }}
            imgSrc={receipt}
            name="file"
            onChange={handleReceiptChange}
          />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateNews;
