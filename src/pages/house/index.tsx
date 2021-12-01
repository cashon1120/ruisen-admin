import TablePage, { RefFunctions } from '@/components/TablePage';
import { history } from 'umi';
import { Button, Popconfirm } from 'antd';


export const houseStatus = {
  1: '未交房', 2: '已交房',3: '已过户',4: '出租中',5: '转售中',6: '自住',7: '空置'
}
export const houseType = {
  1: '公寓', 2: '别墅',3: '一户建'
}

let tableRef: RefFunctions = {} as RefFunctions;

const NewsList = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: '业主姓名',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: '用户手机号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '面积',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '认证状态',
      dataIndex: 'authenticationStatus',
      key: 'authenticationStatus',
      render: (authenticationStatus: number) => authenticationStatus === 1 ? '未认证' : '已认证'
    },
    {
      title: '开发商',
      dataIndex: 'developer',
      key: 'developer',
    },
    {
      title: '户型图',
      dataIndex: 'floorPlan',
      key: 'floorPlan',
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
      key: 'roomNo',
    },
    {
      title: '过户日期',
      dataIndex: 'transferDate',
      key: 'transferDate',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => houseStatus[type]
    },
    {
      title: '房产状态',
      dataIndex: 'houseStatus',
      key: 'houseStatus',
      render: (houseStatus: string) => houseStatus[houseStatus]
    },
    {
      title: '户型图',
      dataIndex: 'floorPlan',
      key: 'floorPlan',
    },
    {
      title: '户型图',
      dataIndex: 'floorPlan',
      key: 'floorPlan',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      key: 'enable',
      rener: (enable: number) => enable ? '是' : '否'
    },
    {
      title: '操作',
      width: 180,
      render: (record: any) => (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => history.push('/news/create', { record })}
          >
            编辑
          </Button>
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
      label: '标题',
      name: 'title',
      componentType: 'Input',
      placeholder: '请输入搜索内容',
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
        title="资讯列表"
        columns={columns}
        searchItems={searchItems}
        url="house/list"
        deleteUrl="news/delete"
        addPath="/news/create"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default NewsList;
