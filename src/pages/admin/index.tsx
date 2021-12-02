import { useEffect, useState } from 'react';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Popconfirm, Form, message, Switch, Input, Select } from 'antd';
import Loading from '@/components/Loading';
import ModalForm from '@/components/ModalForm';
import HttpRequest from '@/utils/request';

let tableRef: RefFunctions = {} as RefFunctions;

const NewsList = () => {
  const [currentData, setCurrentDta] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [allRoleList, setAllRoleList] = useState([]);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllRoleList = () => {
    setLoading(true);
    HttpRequest({
      method: 'get',
      url: 'admin/all/role',
    })
      .then((res: any) => {
        setAllRoleList(res);
      })
      .finally(() => {
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
        adminUserInfoId: currentData.id,
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
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },

    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <img src={avatar} style={{ height: 50 }} />,
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
    },
    {
      title: '是否禁用',
      dataIndex: 'isDisable',
      key: 'isDisable',
      render: (isDisable: boolean, record: any) => (
        <Switch
          defaultChecked={isDisable}
          disabled={!record.id}
          onChange={(value: boolean) => handleChangeDisableState(value, record.id)}
        />
      ),
    },
    {
      title: '操作',
      width: 180,
      render: (record: any) => (
        <>
          <Button size="small" type="primary" onClick={() => handleUpdateRole(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="topLeft"
            title="确定要删除该数据吗？"
            onConfirm={() => tableRef.deleteData({ data: { id: record.id } })}
          >
            <Button size="small" type="default" className="tab-btn">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '关键字',
      name: 'keywords',
      componentType: 'Input',
      placeholder: '请输入搜索关键字',
    },
    {
      label: '时间段',
      name: 'rangeTime',
      componentType: 'RangePicker',
      allowClear: true,
    },
  ];

  useEffect(getAllRoleList, []);

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
            rules={[{ required: true, message: '昵称不能为空！' }]}
          >
            <Input placeholder="请输入昵称！" />
          </Form.Item>
          <Form.Item
            name="roleIdList"
            label="选择角色"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
            <Select placeholder="请选择" mode="multiple" allowClear>
              {allRoleList.map((item: any) => (
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

export default NewsList;
