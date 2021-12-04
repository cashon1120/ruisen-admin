import { useEffect} from 'react';
import { Form, Input, TreeSelect, Radio } from 'antd';
import FormPage from '@/components/FormPage';
import { connect } from 'dva';

const CreateRoles = (props: any) => {
  const { menuList,  getMenuList, resourceList, getResourceList} = props;
  const record = props.location.state ? props.location.state.record : null;

  useEffect(() => {
    if(menuList.length === 0){
      getMenuList()
    }
    if(resourceList.length === 0){
      getResourceList()
    }
  }, []);

  const handleFormFormatValue = (values: any) => {
    values.isDisable = parseInt(values.isDisable)
    return values
  }

  return (
    <>
      <FormPage
        title={record ? '编辑角色' : '添加角色'}
        createUrl="admin/role"
        updateUrl="admin/role"
        backPath="/roles"
        type="json"
        data={record}
        formatValue={handleFormFormatValue}
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
            treeData={resourceList}
            placeholder="请选择资源"
            treeCheckable
            fieldNames={{ label: 'resourceName', value: 'id' }}
            allowClear
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item name="isDisable" label="是否禁用">
          <Radio.Group>
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </Radio.Group>
        </Form.Item>
      </FormPage>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    menuList: state.global.menuList,
    resourceList: state.global.resourceList,
  };
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    getMenuList() {
      dispatch({
        type: 'global/getMenuList',
      });
    },
    getResourceList() {
      dispatch({
        type: 'global/getResourceList',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoles);

