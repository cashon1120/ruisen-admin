import { useState } from 'react';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { history } from 'umi';
import Loading from '@/components/Loading';
import ImagePreview from '@/components/ImagePreview';
import { Button, Popconfirm, Switch, message } from 'antd';
import HttpRequest from '@/utils/request';

export const houseStatus = {
  1: '未交房',
  2: '已交房',
  3: '已过户',
  4: '出租中',
  5: '转售中',
  6: '自住',
  7: '空置',
};
export const houseType = {
  1: '公寓',
  2: '别墅',
  3: '一户建',
};

export const authenticationStatus = {
  1: '未认证',
  2: '已认证',
};

export const houseEnable = {
  1: '启用',
  2: '禁用',
};

let tableRef: RefFunctions = {} as RefFunctions;

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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      with: 180,
    },

    {
      title: '业主姓名',
      dataIndex: 'ownerName',
      key: 'ownerName',
      with: 180,
    },
    {
      title: '用户手机号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      with: 180,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      with: 180,
    },
    {
      title: '面积',
      dataIndex: 'area',
      key: 'area',
      with: 180,
    },
    {
      title: '认证状态',
      dataIndex: 'authenticationStatus',
      key: 'authenticationStatus',
      with: 180,
      render: (text: string) => authenticationStatus[text],
    },
    {
      title: '开发商',
      dataIndex: 'developer',
      key: 'developer',
      with: 180,
    },
    {
      title: '户型图',
      dataIndex: 'floorPlan',
      key: 'floorPlan',
      render: (res: string) => <ImagePreview imgSrc={res} />,
      with: 180,
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
      key: 'roomNo',
      with: 180,
    },
    {
      title: '过户日期',
      dataIndex: 'transferDate',
      key: 'transferDate',
      with: 260,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => houseType[type],
      with: 180,
    },
    {
      title: '房产状态',
      dataIndex: 'houseStatus',
      key: 'houseStatus',
      render: (res: string) => houseStatus[res],
      with: 180,
    },

    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      with: 180,
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      with: 180,
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      key: 'enable',
      render: (enable: number, record: any) => (
        <Switch
          defaultChecked={enable === 1 ? true : false}
          disabled={!record.id}
          onChange={(value: boolean) => handleChangeDisableState(value, record)}
        />
      ),
      with: 180,
    },
    {
      title: '操作',
      width: 120,
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
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '标题',
      name: 'title',
      componentType: 'Input',
      placeholder: '请输入标题',
    },
    {
      label: '业主姓名',
      name: 'ownerName',
      componentType: 'Input',
      placeholder: '请输入业主姓名',
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
      label: '手机号码',
      name: 'phoneNumber',
      componentType: 'Input',
      placeholder: '请输入手机号码',
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
        scrollWidth={2500}
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default HouseList;
