import { useState } from 'react';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Popconfirm, Menu, Dropdown, Form, message, Switch, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading';
import ModalForm from '@/components/ModalForm';
import HttpRequest from '@/utils/request';

let tableRef: RefFunctions = {} as RefFunctions;
let formInstance: any = null;
const NewsList = () => {
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateRole = (record: any) => {};

  const menu = (record: any) => (
    <Menu>
      <Menu.Item key="role" onClick={() => handleUpdateRole(record)}>
        修改用户角色
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          placement="topLeft"
          title="确定要删除该数据吗？"
          onConfirm={() => tableRef.deleteData({ data: { id: record.id } })}
        >
          删除
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

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
          <Dropdown overlay={menu(record)}>
            <Button className="tab-btn">
              操作 <DownOutlined />
            </Button>
          </Dropdown>
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

  return (
    <>
      {loading ? <Loading /> : null}
      <TablePage
        title="管理员列表"
        columns={columns}
        searchItems={searchItems}
        url="admin/users"
        deleteUrl="news/delete"
        addPath="/admin/resources"
        rowKey="nickname"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default NewsList;
