import TablePage, { RefFunctions } from '@/components/TablePage';
import { history } from 'umi';
import { Button, Popconfirm } from 'antd';

let tableRef: RefFunctions = {} as RefFunctions;

const ResourceList = () => {
  const columns = [
    {
      title: '资源名',
      dataIndex: 'resourceName',
      key: 'resourceName',
    },

    {
      title: '资源路径',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: '是否匿名访问',
      dataIndex: 'isAnonymous',
      key: 'isAnonymous',
      render: (isAnonymous: number) => (isAnonymous === 1 ? '是' : '否'),
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      key: 'requestMethod',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '是否禁用',
      dataIndex: 'isDisable',
      key: 'isDisable',
      render: (isDisable: number) => (isDisable === 1 ? '是' : '否'),
    },
    {
      title: '操作',
      width: 180,
      render: (record: any) => (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => history.push('/resources/create', { record })}
          >
            编辑
          </Button>
          <Popconfirm
            placement="topLeft"
            title="确定要删除该数据吗？"
            onConfirm={() =>
              tableRef.deleteData({
                data: { id: record.id },
                queryParams: record.id,
                method: 'delete',
              })
            }
          >
            <Button size="small" type="default" className="tab-btn" danger>
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
      label: '时间段',
      name: 'rangeTime',
      componentType: 'RangePicker',
      allowClear: true,
    },
  ];

  const handleFormatData = (data: any) => {
    const deepData = (array: any[], parentId: number) => {
      array.forEach((item: any) => {
        if (parentId !== 0) {
          item.parentId = parentId;
        }
        if (item.children) {
          deepData(item.children, item.id);
        }
      });
    };
    deepData(data, 0);
    return data;
  };

  return <TablePage
    title="接口列表"
    columns={columns}
    searchItems={searchItems}
    url="admin/resources"
    deleteUrl="admin/resources"
    addPath="/resources/create"
    disablePagination
    formatData={handleFormatData}
    onRef={(ref: any) => (tableRef = ref)}
  />
};

export default ResourceList;
