import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Popconfirm } from 'antd';

let tableRef: RefFunctions = {} as RefFunctions;

const LogList = () => {
  const columns = [
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 180
    },

    {
      title: '用户登录IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 180
    },
    {
      title: '操作方法',
      dataIndex: 'optMethod',
      key: 'optMethod',
    },
    {
      title: '操作模块',
      dataIndex: 'optModule',
      key: 'optModule',
      width: 180
    },
    {
      title: '操作类型',
      dataIndex: 'optType',
      key: 'optType',
      width: 180
    },

    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '操作',
      width: 120,
      render: (record: any) => (
        <>
          <Popconfirm
            placement="topLeft"
            title="确定要删除该数据吗？"
            onConfirm={() => tableRef.deleteData({ data: [record.id] })}
          >
            <Button size="small" type="default" className="tab-btn" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '关键语',
      name: 'keywords',
      componentType: 'Input',
      placeholder: '请输入搜索关键语',
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
      <TablePage
        title="日志列表"
        columns={columns}
        searchItems={searchItems}
        url="admin/operation/logs"
        deleteUrl="admin/operation/logs"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default LogList;
