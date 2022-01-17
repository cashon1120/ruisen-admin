import { useState } from 'react';
import { history } from 'umi';
import { Button, Switch, message } from 'antd';
import TablePage from '@/components/TablePage';
import Loading from '@/components/Loading';
import ImagePreview from '@/components/ImagePreview';
import HttpRequest from '@/utils/request';
import Detail from '@/components/Detail';
import { houseStatus, houseType, authenticationStatus } from '@/utils/enum';

const HouseList = () => {
  const [loading, setLoading] = useState(false);

  const handleChangeDisableState = (value: boolean, record: any) => {
    setLoading(true);
    HttpRequest({
      method: 'post',
      url: 'house/enable',
      params: { id: record.id, enable: record.enable === 1 ? 2 : 1 },
    })
      .then(() => {
        message.success('操作成功');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: '房产名',
      dataIndex: 'title',
      key: 'title',
      width: 180,
    },

    {
      title: '业主姓名',
      dataIndex: 'ownerName',
      key: 'ownerName',
      width: 120,
    },
    {
      title: '用户手机号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
      width: 100,
      key: 'roomNo',
    },
    {
      title: '户型图',
      dataIndex: 'floorPlan',
      key: 'floorPlan',
      render: (res: string) => <ImagePreview imgSrc={res} />,
      width: 180,
    },
    {
      title: '房产照片',
      dataIndex: 'photoList',
      key: 'photoList',
      width: 300,
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
      key: 'address',
    },
    {
      title: '面积',
      dataIndex: 'area',
      width: 100,
      key: 'area',
    },
    {
      title: '认证状态',
      dataIndex: 'authenticationStatus',
      key: 'authenticationStatus',
      width: 120,
      render: (text: string) => authenticationStatus[text],
    },
    {
      title: '开发商',
      dataIndex: 'developer',
      key: 'developer',
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
      width: 100,
      render: (type: string) => houseType[type],
    },
    {
      title: '币种',
      dataIndex: 'currency',
      key: 'currency',
      width: 100,
    },
    {
      title: '房产状态',
      dataIndex: 'houseStatus',
      key: 'houseStatus',
      width: 100,
      render: (res: string) => houseStatus[res],
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
      width: 100,
      fixed: 'right',
      key: 'enable',
      render: (enable: number, record: any, index: boolean) => {
        const disabled = typeof index === 'boolean' ? index : false;
        return (
          <Switch
            defaultChecked={enable === 1 ? true : false}
            disabled={disabled}
            onChange={(value: boolean) => handleChangeDisableState(value, record)}
          />
        );
      },
    },
    {
      title: '操作',
      width: 140,
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
          <Detail title="房产详情" columns={columns} data={record} />
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
      {loading ? <Loading /> : null}
      <TablePage
        title="房产列表"
        columns={columns}
        searchItems={searchItems}
        url="house/list"
        addPath="/house/create"
        rowKey="id"
        scrollWidth={2500}
      />
    </>
  );
};

export default HouseList;
