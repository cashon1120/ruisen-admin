import TablePage, { RefFunctions } from '@/components/TablePage';
import { history } from 'umi';
import ImagePreview from '@/components/ImagePreview';
import { Button, Popconfirm } from 'antd';

let tableRef: RefFunctions = {} as RefFunctions;

const NewsList = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (res: string) => <ImagePreview imgSrc={res} />,
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
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
      label: '标题',
      name: 'title',
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

  return (
    <>
      <TablePage
        title="资讯列表"
        columns={columns}
        searchItems={searchItems}
        url="news/list"
        deleteUrl="news/delete"
        addPath="/news/create"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

export default NewsList;
