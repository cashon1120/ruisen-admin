import { useEffect } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Button, Popconfirm } from 'antd';
import ImagePreview from '@/components/ImagePreview';
import Detail from '@/components/Detail';
import TablePage, { RefFunctions } from '@/components/TablePage';

let tableRef: RefFunctions = {} as RefFunctions;

export const state = {
  1: '无缴费信息',
  2: '待缴费',
  3: '已缴费',
};

const ToDoList = (props: any) => {
  const { houseList, fetchList } = props;

  const columns = [
    {
      title: '业主姓名',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '项目名称',
      dataIndex: 'houseTitle',
      key: 'houseTitle',
    },
    {
      title: '房号',
      dataIndex: 'roomNo',
      key: 'roomNo',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '缴费截止日期',
      dataIndex: 'payEndDate',
      key: 'payEndDate',
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (record: any) => (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => history.push('/todo/create', { record })}
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
          <Detail title="待办事项详情" columns={columns} data={record} />
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '房产',
      name: 'houseTitle',
      componentType: 'Input',
      placeholder: '请输入房产名',
    },
    {
      label: '标题',
      name: 'title',
      componentType: 'Input',
      placeholder: '请输入搜索内容',
    },
    {
      label: '手机号',
      name: 'phoneNumber',
      componentType: 'Input',
      placeholder: '请输入搜索内容',
    },
    {
      label: '房产',
      name: 'houseId',
      componentType: 'Select',
      placeholder: '请输入房产名',
      allowClear: true,
      dataList: houseList,
      dataLabelKey: 'text',
    },
    {
      label: '状态',
      name: 'status',
      componentType: 'Select',
      placeholder: '请选择状态',
      allowClear: true,
      dataList: [
        { label: '无缴费信息', value: 1 },
        { label: '待缴费', value: 2 },
        { label: '已缴费', value: 3 },
      ],
    },
    {
      label: '时间段',
      name: 'rangeTime',
      componentType: 'RangePicker',
      allowClear: true,
    },
  ];

  useEffect(() => {
    if (houseList.length === 0) {
      fetchList();
    }
  }, []);

  return (
    <>
      <TablePage
        title="待办事项"
        columns={columns}
        searchItems={searchItems}
        url="to/do/list/list"
        deleteUrl="to/do/list/delete"
        addPath="/todo/create"
        onRef={(ref: any) => (tableRef = ref)}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    houseList: state.global.houseList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchList() {
      dispatch({
        type: 'global/getHouseList',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
