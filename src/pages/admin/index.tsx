import { useEffect, useState } from 'react';
import { connect } from 'dva';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Form, message, Switch, Input, Select } from 'antd';
import ImagePreview from '@/components/ImagePreview';
import Loading from '@/components/Loading';
import ModalForm from '@/components/ModalForm';
import HttpRequest from '@/utils/request';

let tableRef: RefFunctions = {} as RefFunctions;

const AdminList = (props: any) => {
  const { roleList,  fetchList} = props;
  const [currentData, setCurrentDta] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [visibleRole, setVisibleRole] = useState(false);

  const handleChangeDisableState = (value: boolean, id: number) => {
    setLoading(true);
    HttpRequest({
      method: 'put',
      url: 'admin/users/disable',
      type: 'json',
      params: { id, isDisable: value ? 1 : 0 },
    })
      .then(() => {
        message.success('操作成功');
        tableRef.getData();
      }).finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateRole = (record: any) => {
    setCurrentDta(record);
    setVisibleRole(true);
  };

  const handleSubmitModal = (values: any) => {
    setLoading(true);
    HttpRequest({
      method: 'put',
      url: 'admin/users/role',
      params: {
        adminUserInfoId: currentData.adminUserInfoId,
        ...values,
      },
    })
      .then(() => {
        message.success('操作成功');
        setVisibleRole(false);
        tableRef.getData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },

    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (res: string) => <ImagePreview imgSrc={res} />,
    },

    {
      title: '角色',
      dataIndex: 'roleList',
      key: 'roleList',
      render: (roleList: any[]) => roleList.map((item: any) => item.roleName + ' '),
    },
    {
      title: 'IP来源',
      dataIndex: 'ipSource',
      key: 'ipSource',
    },
    {
      title: '用户登录ip',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '是否禁用',
      dataIndex: 'isDisable',
      key: 'isDisable',
      width: 100,
      render: (isDisable: boolean, record: any) => (
        <Switch
          checked={isDisable}
          disabled={!record.id}
          onChange={(value: boolean, e: any) => handleChangeDisableState(value, record.id)}
        />
      ),
    },
    {
      title: '操作',
      width: 120,
      render: (record: any) => (
        <>
          <Button size="small" type="primary" onClick={() => handleUpdateRole(record)}>
            编辑
          </Button>
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '时间段',
      name: 'rangeTime',
      componentType: 'RangePicker',
      allowClear: true,
    },
  ];

  useEffect(() => {
    if(roleList.length === 0){
      fetchList()
    }
  }, [])

  return (
    <>
      {loading ? <Loading /> : null}
      <TablePage
        title="管理员列表"
        columns={columns}
        searchItems={searchItems}
        url="admin/users"
        addPath="/admin/create"
        rowKey="id"
        onRef={(ref: any) => (tableRef = ref)}
      />
      {visibleRole ? (
        <ModalForm
          title="修改角色"
          onFinish={handleSubmitModal}
          visible={true}
          loading={loading}
          initialValues={{
            nickname: currentData.nickname,
            roleIdList: currentData.roleList.map((item: any) => item.id),
          }}
          onCancel={() => setVisibleRole(false)}
        >
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[{ required: true, message: '昵称不能为空!' }]}
          >
            <Input placeholder="请输入昵称!" />
          </Form.Item>
          <Form.Item
            name="roleIdList"
            label="选择角色"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
            <Select placeholder="请选择" mode="multiple" allowClear>
              {roleList.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.roleName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </ModalForm>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    roleList: state.global.roleList,
  };
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchList() {
      dispatch({
        type: 'global/getRoleList',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
