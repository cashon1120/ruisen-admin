import TablePage, { RefFunctions } from '@/components/TablePage';
import { history } from 'umi';
import { Button, Popconfirm } from 'antd';

let tableRef: RefFunctions = {} as RefFunctions;

export const state = {
  1: '无缴费信息',
  2: '待缴费',
  3: '已缴费',
};

const NewsList = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
      key: 'subtitle',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '缴费所属日期',
      dataIndex: 'belongsDate',
      key: 'belongsDate',
    },
    {
      title: '房产标题',
      dataIndex: 'houseTitle',
      key: 'houseTitle',
    },
    {
      title: '缴费日期',
      dataIndex: 'payDate',
      key: 'payDate',
    },
    {
      title: '缴费截止日期',
      dataIndex: 'payEndDate',
      key: 'payEndDate',
    },
    {
      title: '用户手机号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '收据',
      dataIndex: 'receipt',
      key: 'receipt',
      render: (res: string) => <img src={res} style={{ height: 50 }} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => state[status],
    },
    {
      title: '描述信息',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      width: 180,
      render: (record: any) => (
        <>
          <Popconfirm
            placement="topLeft"
            title="确定要删除该数据吗？"
            onConfirm={() => tableRef.deleteData({ data: { id: record.id }, method: 'post' })}
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
      label: '搜索内容',
      name: 'keywords',
      componentType: 'Input',
      placeholder: '请输入搜索内容',
    },
    {
      label: '手机号',
      name: 'phoneNumber',
      componentType: 'Input',
      placeholder: '请输入搜索内容',
    },
    {
      label: '房产标题',
      name: 'houseTitle',
      componentType: 'Input',
      placeholder: '请输入房产标题',
    },
    {
      label: '状态',
      name: 'status',
      componentType: 'Select',
      placeholder: '请选择状态',
      dataList: [
        { label: '无缴费信息', value: 1 },
        { label: '待缴费', value: 2 },
        { label: '已缴费', value: 3 },
      ],
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
        title="待办事项"
        columns={columns}
        searchItems={searchItems}
        url="to/do/list/list"
        deleteUrl="to/do/list/delete"
        addPath="/todo/create"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default NewsList;
