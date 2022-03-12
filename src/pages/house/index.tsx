import { history } from 'umi';
import { Button } from 'antd';
import TablePage from '@/components/TablePage';
import ImagePreview from '@/components/ImagePreview';
import Detail from '@/components/Detail';
import { houseStatus, houseType, authenticationStatus } from '@/utils/enum';

const HouseList = () => {

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
      dataIndex: 'title',
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
    },
    {
      title: '户型图',
      dataIndex: 'floorPlan',
      render: (res: string) => <ImagePreview imgSrc={res} />,
    },
    {
      title: '房产照片',
      dataIndex: 'photoList',
      render: (photoList: string[]) => (
        <div>
          {photoList.map((item: string, index: number) => (
            <ImagePreview key={index} imgSrc={item} />
          ))}
        </div>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '面积',
      dataIndex: 'area',
    },
    {
      title: '认证状态',
      dataIndex: 'authenticationStatus',
      render: (text: string) => authenticationStatus[text],
    },
    {
      title: '开发商',
      dataIndex: 'developer',
    },
    {
      title: '过户日期',
      dataIndex: 'transferDate',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: string) => houseType[type],
    },
    {
      title: '币种',
      dataIndex: 'currency',
    },
    {
      title: '房产状态',
      dataIndex: 'houseStatus',
      render: (res: string) => houseStatus[res],
    },

    {
      title: '修改时间',
      dataIndex: 'updateTime',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      render: (enable: number) => enable === 1 ? '是' : "否"
    },
  ];

  const columns = [
    {
      title: '业主姓名',
      dataIndex: 'ownerName',
      key: 'ownerName',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: '项目名称',
      dataIndex: 'title',
      key: 'title',
      width: 180,
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
      width: 100,
      key: 'roomNo',
    },

    {
      title: '认证状态',
      dataIndex: 'authenticationStatus',
      key: 'authenticationStatus',
      width: 120,
      render: (text: string) => authenticationStatus[text],
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (record: any) => (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => history.push('/house/create', { record })}
          >
            编辑
          </Button>
          <Detail title="房产详情" columns={detailColumns} data={record} />
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '房产名',
      name: 'title',
      componentType: 'Input',
      placeholder: '请输入标题',
    },
    // {
    //   label: '搜索内容',
    //   name: 'keywords',
    //   componentType: 'Input',
    //   placeholder: '请输入搜索内容',
    // },
    {
      label: '业主姓名',
      name: 'ownerName',
      componentType: 'Input',
      placeholder: '请输入业主姓名',
    },
    {
      label: '手机号码',
      name: 'phoneNumber',
      componentType: 'Input',
      placeholder: '请输入手机号码',
    },
    {
      label: '类型',
      name: 'type',
      componentType: 'Select',
      placeholder: '请选择类型',
      allowClear: true,
      dataList: Object.keys(houseType).map((key: string) => {
        return {
          label: houseType[key],
          value: key,
        };
      }),
    },
    {
      label: '房产状态',
      name: 'houseStatus',
      componentType: 'Select',
      placeholder: '请选择房产状态',
      allowClear: true,
      dataList: Object.keys(houseStatus).map((key: string) => {
        return {
          label: houseStatus[key],
          value: key,
        };
      }),
    },
    {
      label: '认证状态',
      name: 'authenticationStatus',
      componentType: 'Select',
      placeholder: '请选择认证状态',
      allowClear: true,
      dataList: Object.keys(authenticationStatus).map((key: string) => {
        return {
          label: authenticationStatus[key],
          value: key,
        };
      }),
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
        title="房产列表"
        columns={columns}
        searchItems={searchItems}
        url="house/list"
        addPath="/house/create"
        rowKey="id"
      />
    </>
  );
};

export default HouseList;
