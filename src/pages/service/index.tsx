import { useState } from 'react';
import { Button, Switch, message } from 'antd';
import { history } from 'umi';
import TablePage from '@/components/TablePage';
import Loading from '@/components/Loading';
import ImagePreview from '@/components/ImagePreview';
import Detail from '@/components/Detail';
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
  const detailColumns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'LOGO',
      dataIndex: 'logo',
      render: (res: string) => <ImagePreview imgSrc={res} showBgColor disableShowBig />,
    },
    {
      title: '图片',
      dataIndex: 'imageList',
      render: (res: string[]) => (
        <>
          {res.map((src: string) => (
            <ImagePreview key={src} imgSrc={src} />
          ))}
        </>
      ),
    },
    {
      title: '视频',
      dataIndex: 'videoList',
      render: (res: string[]) => (
        <>
          {res.map((src: string) => (
            <ImagePreview key={src} imgSrc={src} />
          ))}
        </>
      ),
    },
    {
      title: '服务地区',
      dataIndex: 'serviceArea',
    },
    {
      title: '排序',
      dataIndex: 'sortNumber',
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      render: (enable: number, record: any, index: boolean) => {
        const disabled = typeof index === 'boolean' ? index : false;
        return (
          <Switch
            defaultChecked={enable === 1 ? true : false}
            disabled={disabled}
            onChange={(value: boolean) => handleChangeDisableState(value, record.id)}
          />
        );
      },
    },
  ];

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: 'LOGO',
      dataIndex: 'logo',
      key: 'logo',
      render: (res: string) => <ImagePreview imgSrc={res} showBgColor disableShowBig />,
    },
    {
      title: '排序',
      dataIndex: 'sortNumber',
      key: 'sortNumber',
    },
    {
      title: '服务地区',
      dataIndex: 'serviceArea',
      key: 'serviceArea',
      width: 180,
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      key: 'enable',
      fixed: 'right',
      width: 100,
      render: (enable: number, record: any, index: boolean) => {
        const disabled = typeof index === 'boolean' ? index : false;
        return (
          <Switch
            defaultChecked={enable === 1 ? true : false}
            disabled={disabled}
            onChange={(value: boolean) => handleChangeDisableState(value, record.id)}
          />
        );
      },
    },
    {
      title: '操作',
      width: 180,
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
          <Detail title={record.name} columns={detailColumns} data={record} />
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
        url="butler/service/list"
        addPath="/service/create"
      />
    </>
  );
};

export default ServiceList;
