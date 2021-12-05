import TablePage, { RefFunctions } from '@/components/TablePage';
import { history } from 'umi';
import ImagePreview from '@/components/ImagePreview';
import { Button, Popconfirm } from 'antd';

let tableRef: RefFunctions = {} as RefFunctions;

const NewsList = () => {
  const columns = [
    {
      title: '房产标题',
      dataIndex: 'houseTitle',
      key: 'houseTitle',
    },
    {
      title: '币种',
      dataIndex: 'rental',
      key: 'rental',
    },
    {
      title: '出租状态',
      dataIndex: 'rentalStatus',
      key: 'rentalStatus',
    },

    {
      title: '租金单位',
      dataIndex: 'rentalUnit',
      key: 'rentalUnit',
    },
    {
      title: '总租金',
      dataIndex: 'totalRental',
      key: 'totalRental',
    },
    {
      title: '租赁合同',
      dataIndex: 'leaseContract',
      key: 'leaseContract',
      render: (res: string) => <ImagePreview imgSrc={res} />,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '租期开始时间',
      dataIndex: 'leaseStartTime',
      key: 'leaseStartTime',
    },
    {
      title: '租期结束时间',
      dataIndex: 'leaseEndTime',
      key: 'leaseEndTime',
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
      label: '房产标题',
      name: 'houseTitle',
      componentType: 'Input',
      placeholder: '请输入房产标题',
    },
    {
      label: '用户手机号码',
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
        title="资讯列表"
        columns={columns}
        searchItems={searchItems}
        url="rental/income/list"
        deleteUrl="rental/income/delete"
        addPath="/income/create"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default NewsList;
