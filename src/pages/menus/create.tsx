import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Switch, TreeSelect } from 'antd';
import { connect } from 'dva';
import FormPage from '@/components/FormPage';

const CreateMenu = (props: any) => {
  const record = props.location.state ? props.location.state.record : null;
  const [checked, setChecked] = useState(false);
  const { menuList, fetchList } = props;
  useEffect(() => {
    if (menuList.length === 0) {
      fetchList();
    }
    if (record) {
      setChecked(record.isHIdden === 1 ? true : false);
    }
  }, []);

  return (
    <>
      <FormPage
        title={record ? '编辑菜单' : '添加菜单'}
        createUrl="/admin/menus"
        updateUrl="/admin/menus"
        backPath="/menus"
        type="json"
        initialValues={{component: '/'}}
        data={record}
      >
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
          style={{display: 'none'}}
          name="component"
          label="组件"
          rules={[
            {
              required: true,
              message: '请输入组件地址',
            },
          ]}
        >
          <Input defaultValue="不填, 用不上" placeholder="请输入组件地址" />
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

        <Form.Item name="parentId" label="上级菜单">
          <TreeSelect
            allowClear
            showSearch
            placeholder="若为一级菜单就不选择"
            treeData={menuList}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Form.Item>

        <Form.Item name="isDisable" label="是否禁用">
          <Switch checked={checked} onChange={(value: boolean) => setChecked(value)} />
        </Form.Item>

      </FormPage>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    menuList: state.global.menuList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchList() {
      dispatch({
        type: 'global/getMenuList',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMenu);
