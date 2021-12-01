import { useEffect, useState } from 'react';
import { Form, Input, TreeSelect, Switch } from 'antd';
import FormPage from '@/components/FormPage';
import Loading from '@/components/Loading';
import HttpRequest from '@/utils/request';

const CreateNews = (props: any) => {
  const [menuList, setmenuList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const record = props.location.state ? props.location.state.record : null;

  const getRoleList = () => {
    HttpRequest({ method: 'get', url: 'admin/menus', params: { size: 1000, current: 1 } }).then(
      (res: any) => {
        setmenuList(res.recordList);
      },
    );
  };

  const getSourceList = () => {
    HttpRequest({ method: 'get', url: 'admin/resources', params: { size: 1000, current: 1 } }).then(
      (res: any) => {
        setSourceList(res.recordList);
      },
    );
  };

  useEffect(() => {
    getRoleList();
    getSourceList();
  }, []);

  const handleFormatValue = (values: any) => {
    values.isDisable = values.isDisable ? 1 : 0;
    return values;
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Loading />
      <FormPage
        title={record ? '编辑角色' : '添加角色'}
        createUrl="admin/role"
        updateUrl="admin/role"
        backPath="/role/list"
        type="json"
        data={record}
        formatValue={handleFormatValue}
      >
        <Form.Item
          name="roleName"
          label="角色名"
          rules={[
            {
              required: true,
              message: '请输入角色名',
            },
          ]}
        >
          <Input placeholder="请输入角色名" />
        </Form.Item>

        <Form.Item
          name="roleLabel"
          label="标签名"
          rules={[
            {
              required: true,
              message: '请输入标签名!',
            },
          ]}
        >
          <Input placeholder="请输入标签名" />
        </Form.Item>

        <Form.Item
          name="menuIdList"
          label="菜单"
          rules={[
            {
              required: true,
              message: '请输入标签名!',
            },
          ]}
        >
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={menuList}
            treeCheckable
            placeholder="请选择菜单"
            fieldNames={{ label: 'name', value: 'id' }}
            allowClear
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item
          name="resourceIdList"
          label="资源"
          rules={[
            {
              required: true,
              message: '请输入标签名!',
            },
          ]}
        >
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={sourceList}
            placeholder="请选择资源"
            treeCheckable
            fieldNames={{ label: 'resourceName', value: 'id' }}
            allowClear
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item name="isDisable" label="是否禁用">
          <Switch defaultChecked={record && record.isDisable ? true : false} />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateNews;
