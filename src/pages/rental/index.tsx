import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Popconfirm } from 'antd';
import { history } from 'umi';
import ImagePreview from '@/components/ImagePreview';
import Detail from '@/components/Detail';

let tableRef: RefFunctions = {} as RefFunctions;

const IncomeList = () => {

  const detailColumns = [
    {
      title: '业主姓名',
      dataIndex: 'ownerName',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '项目名称',
      dataIndex: 'houseTitle',
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
    },
    {
      title: '总租金',
      dataIndex: 'totalRental',
    },
    {
      title: '币种',
      dataIndex: 'currency',
    },
    {
      title: '出租状态',
      dataIndex: 'rentalStatus',
    },
    {
      title: '租期开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '租期结束时间',
      dataIndex: 'endTime',
    },
    {
      title: '租赁合同',
      dataIndex: 'leaseContract',
      render: (res: string) => <ImagePreview imgSrc={res} />,
    },
    {
      title: '备注',
      dataIndex: 'desc',
    },
    
  ];

  const columns = [
    {
      title: '业主姓名',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '项目名称',
      dataIndex: 'houseTitle',
      key: 'houseTitle',
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
      width: 100,
      key: 'roomNo',
    },
    {
      title: '总租金',
      dataIndex: 'totalRental',
      key: 'totalRental',
    },
    {
      title: '出租状态',
      dataIndex: 'rentalStatus',
      key: 'rentalStatus',
    },
    {
      title: '租期开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '租期结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 210,
      render: (record: any) => (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => history.push('/rental/create', { record })}
          >
            编辑
          </Button>
          <Popconfirm
            placement="topLeft"
            title="确定要删除该数据吗？"
            onConfirm={() => tableRef.deleteData({ data: { id: record.id }, method: 'post' })}
          >
            <Button size="small" type="ghost" className="tab-btn" danger>
              删除
            </Button>
          </Popconfirm>
          <Detail title="收益详情" columns={detailColumns} data={record} />
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '项目名称',
      name: 'houseTitle',
      componentType: 'Input',
      placeholder: '请输入房产名',
    },
    {
      label: '手机号',
      name: 'phoneNumber',
      componentType: 'Input',
      placeholder: '请输入用户手机号码',
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
        title="租金收益"
        columns={columns}
        searchItems={searchItems}
        url="rental/record/list"
        deleteUrl="rental/record/delete"
        addPath="/rental/create"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default IncomeList;
