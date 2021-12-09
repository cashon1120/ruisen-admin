import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Popconfirm } from 'antd';

let tableRef: RefFunctions = {} as RefFunctions;

const NewsList = () => {
  const columns = [
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },

    {
      title: '用户登录IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
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
    },
    {
      title: '操作类型',
      dataIndex: 'optType',
      key: 'optType',
    },

    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
        title="资源列表"
        columns={columns}
        searchItems={searchItems}
        url="admin/operation/logs"
        deleteUrl="admin/operation/logs"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default NewsList;
