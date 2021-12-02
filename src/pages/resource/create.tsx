import { useState, useEffect } from 'react';
import { Form, Input, Switch, Select, TreeSelect } from 'antd';
import HttpRequest from '@/utils/request';
import FormPage from '@/components/FormPage';

const CreateNews = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;

  const [allSource, setAllSource] = useState([]);

  useEffect(() => {
    HttpRequest({ method: 'get', url: 'admin/resources' }).then((res: any) => {
      setAllSource(res.recordList);
    });
  }, []);

  const handleFormatValue = (values: any) => {
    values.isAnonymous = values.isAnonymous ? 1 : 0;
    return values;
  };

  return (
    <>
      <FormPage
        title={record ? '编辑资讯' : '添加资讯'}
        createUrl="admin/resources"
        updateUrl="admin/resources"
        backPath="/resource"
        type="json"
        data={record}
        formatValue={handleFormatValue}
      >
        <Form.Item
          name="resourceName"
          label="资源名"
          rules={[
            {
              required: true,
              message: '请输入资源名',
            },
          ]}
        >
          <Input placeholder="请输入资源名" />
        </Form.Item>

        <Form.Item name="url" label="资源路径">
          <Input placeholder="请输入资源路径" />
        </Form.Item>
        <Form.Item name="parentId" label="父资源">
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={allSource}
            placeholder="请选择父资源"
            fieldNames={{ label: 'resourceName', value: 'id' }}
            allowClear
            treeDefaultExpandAll
          />
        </Form.Item>
        <Form.Item name="requestMethod" label="请求方式">
          <Select placeholder="请选择请求方式">
            <Select.Option value="POST">POST</Select.Option>
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="DELETE">DELETE</Select.Option>
            <Select.Option value="PUT">PUT</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="isAnonymous" label="是否匿名访问">
          <Switch defaultChecked={record && record.isAnonymous ? true : false} />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateNews;
