import { useState } from 'react';
import TablePage from '@/components/TablePage';
import { history } from 'umi';
import Loading from '@/components/Loading';
import ImagePreview from '@/components/ImagePreview';
import { Button, Switch, message } from 'antd';
import HttpRequest from '@/utils/request';

const ServiceList = () => {
  const [loading, setLoading] = useState(false);

  const handleChangeDisableState = (value: boolean, id: number) => {
    setLoading(true);
    HttpRequest({
      method: 'post',
      url: 'butler/service/enable',
      params: { id, enable: value ? 1 : 2 },
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
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (res: string) => <ImagePreview imgSrc={res} />,
    },
    {
      title: 'LOGO',
      dataIndex: 'logo',
      key: 'logo',
      render: (res: string) => <ImagePreview imgSrc={res} showBgColor disableShowBig/>,
    },
    {
      title: '服务地区',
      dataIndex: 'serviceArea',
      key: 'serviceArea',
      width: 180
    },
    {
      title: '服务介绍',
      dataIndex: 'serviceIntro',
      key: 'serviceIntro',
      width: 280
    },
    {
      title: '服务流程',
      dataIndex: 'serviceProcess',
      key: 'serviceProcess',
      width: 280
    },

    {
      title: '收费标准',
      dataIndex: 'chargeStandard',
      key: 'chargeStandard',
      width: 280
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    width: 180
  },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      key: 'enable',
      fixed: 'right',
      width: 100,
      render: (enable: number, record: any) => (
        <Switch
          defaultChecked={enable === 1 ? true : false}
          disabled={!record.id}
          onChange={(value: boolean) => handleChangeDisableState(value, record.id)}
        />
      ),
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
            onClick={() => history.push('/service/create', { record })}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '名称',
      name: 'name',
      componentType: 'Input',
      placeholder: '请输入名称',
    },
    {
      label: '是否启用',
      name: 'enable',
      componentType: 'Select',
      placeholder: '请选择启用状态',
      dataList: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
      ],
      allowClear: true,
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
        title="管家服务"
        columns={columns}
        searchItems={searchItems}
        scrollWidth={2200}
        url="butler/service/list"
        addPath="/service/create"
      />
    </>
  );
};

export default ServiceList;
