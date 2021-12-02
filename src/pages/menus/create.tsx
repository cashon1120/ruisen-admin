import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Switch, TreeSelect } from 'antd';
import FormPage from '@/components/FormPage';
import HttpRequest from '@/utils/request';

const CreateNews = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;

  const [menus, setMenus] = useState([]);
  const [parentId, setParentId] = useState(0);
  const getMenus = () => {
    HttpRequest({ method: 'get', url: 'admin/menus', params: { current: 1, size: 1000 } }).then(
      (res: any) => {
        setMenus(res.recordList);
      },
    );
  };
  useEffect(getMenus, []);

  return (
    <>
      <FormPage
        title={record ? '编辑菜单' : '添加菜单'}
        createUrl="/admin/menus"
        updateUrl="/admin/menus"
        backPath="/menus"
        type="json"
        data={record}
      >
        <Form.Item name="parentId" label="上级菜单">
          <TreeSelect
            allowClear
            showSearch
            treeData={menus}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="菜单名"
          rules={[
            {
              required: true,
              message: '请输入菜单名',
            },
          ]}
        >
          <Input placeholder="请输入菜单名" />
        </Form.Item>
        <Form.Item
          name="component"
          label="组件"
          rules={[
            {
              required: true,
              message: '请输入组件地址',
            },
          ]}
        >
          <Input placeholder="请输入组件地址" />
        </Form.Item>
        <Form.Item
          name="path"
          label="路径"
          rules={[
            {
              required: true,
              message: '请输入路径',
            },
          ]}
        >
          <Input placeholder="请输入路径" />
        </Form.Item>
        <Form.Item
          name="icon"
          label="icon"
          rules={[
            {
              required: true,
              message: '请输入图标名称',
            },
          ]}
        >
          <Input placeholder="请输入图标名称" />
        </Form.Item>
        <Form.Item
          name="orderNum"
          label="排序"
          rules={[
            {
              required: true,
              message: '请输入排序数字',
            },
          ]}
        >
          <InputNumber placeholder="请输入排序数字" />
        </Form.Item>
        <Form.Item name="isHIdden" label="是否隐藏">
          <Switch />
        </Form.Item>
      </FormPage>
    </>
  );
};

export default CreateNews;
