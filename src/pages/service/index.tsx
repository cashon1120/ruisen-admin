import { useState } from 'react';
import TablePage from '@/components/TablePage';
import { history } from 'umi';
import Loading from '@/components/Loading';
import ImagePreview from '@/components/ImagePreview';
import { Button, Switch, message } from 'antd';
import HttpRequest from '@/utils/request';

const NewsList = () => {
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
      render: (res: string) => <ImagePreview imgSrc={res} showBgColor />,
    },
    {
      title: '服务地区',
      dataIndex: 'serviceArea',
      key: 'serviceArea',
    },
    {
      title: '服务介绍',
      dataIndex: 'serviceIntro',
      key: 'serviceIntro',
    },
    {
      title: '服务流程',
      dataIndex: 'serviceProcess',
      key: 'serviceProcess',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '收费标准',
      dataIndex: 'chargeStandard',
      key: 'chargeStandard',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '是否禁用',
      dataIndex: 'enable',
      key: 'enable',
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
      width: 120,
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
        url="butler/service/list"
        addPath="/service/create"
      />
    </>
  );
};

export default NewsList;
