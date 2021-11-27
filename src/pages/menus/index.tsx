import TablePage, { RefFunctions } from '@/components/TablePage';
import { history } from 'umi';
import { Button, Popconfirm } from 'antd';

let tableRef: RefFunctions = {} as RefFunctions;

const NewsList = () => {
  const columns = [
    {
      title: '菜单名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '是否禁用',
      dataIndex: 'isDisable',
      key: 'isDisable',
      render: (res: number) => (res === 0 ? '否' : '是'),
    },
    {
      title: '是否隐藏',
      dataIndex: 'isHidden',
      key: 'isHidden',
      render: (res: number) => (res === 0 ? '否' : '是'),
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      key: 'orderNum',
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
            onClick={() => history.push('/menus/create', { record })}
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
      label: '关键词',
      name: 'keywords',
      componentType: 'Input',
      placeholder: '请输入搜索关键词',
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
        url="admin/menus"
        deleteUrl="admin/menus"
        addPath="/menus/create"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default NewsList;
