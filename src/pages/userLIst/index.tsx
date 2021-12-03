import TablePage from '@/components/TablePage';

const NewsList = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (res: string) => <img src={res} style={{ height: 50 }} />,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '简介',
      dataIndex: 'intro',
      key: 'intro',
    },
    {
      title: '微信openId',
      dataIndex: 'openId',
      key: 'openId',
    },
    {
      title: '手机',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (res: number) => (res === 0 ? '男' : '女'),
    },
    {
      title: '账号状态',
      dataIndex: 'state',
      key: 'state',
      render: (res: number) => (res === 0 ? '正常' : '冻结'),
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  const searchItems = [
    {
      label: '姓名',
      name: 'name',
      componentType: 'Input',
      placeholder: '请输入姓名',
    },
    {
      label: '电话',
      name: 'phoneNumber',
      componentType: 'Input',
      placeholder: '请输入电话',
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
      <TablePage title="用户列表" columns={columns} searchItems={searchItems} url="user/list" />
    </>
  );
};

export default NewsList;
