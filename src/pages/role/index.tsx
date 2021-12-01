import { useState, useEffect } from 'react';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Popconfirm, message, TreeSelect, Modal } from 'antd';
import { history } from 'umi';

import Loading from '@/components/Loading';
import HttpRequest from '@/utils/request';

let tableRef: RefFunctions = {} as RefFunctions;
const NewsList = () => {
  const [loading, setLoading] = useState(false);
  const [menuList, setmenuList] = useState([]);

  const [sourceList, setSourceList] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const [sourceVisible, setSourceVisible] = useState(false);
  const [sourceData, setSourceData] = useState([]);

  const handleChangeDisableState = (value: boolean, id: number) => {
    setLoading(true);
    HttpRequest({
      method: 'put',
      url: 'admin/users/disable',
      type: 'json',
      params: { id, isDisable: value ? 1 : 0 },
    })
      .then(() => {
        message.success('操作成功');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getRoleList = () => {
    HttpRequest({ method: 'get', url: 'admin/menus', params: { size: 1000, current: 1 } }).then(
      (res: any) => {
        setmenuList(res.recordList);
      },
    );
  };

  const getSourceList = () => {
    HttpRequest({ method: 'get', url: 'admin/resources', params: { size: 1000, current: 1 } }).then(
      (res: any) => {
        setSourceList(res.recordList);
      },
    );
  };

  useEffect(() => {
    getRoleList();
    getSourceList();
  }, []);

  const handleShowMenuList = (menuIdList: any) => {
    setMenuVisible(true);
    setMenuData(menuIdList);
  };

  const handleShowSourceList = (resourceIdList: any) => {
    setSourceVisible(true);
    setSourceData(resourceIdList);
  };

  const columns = [
    {
      title: '角色名',
      dataIndex: 'roleName',
      key: 'roleName',
    },

    {
      title: '角色标签',
      dataIndex: 'roleLabel',
      key: 'roleLabel',
    },
    {
      title: '菜单列表',
      dataIndex: 'menuIdList',
      key: 'menuIdList',
      render: (menuIdList: any) => <a onClick={() => handleShowMenuList(menuIdList)}>查看</a>,
    },
    {
      title: '资源列表',
      dataIndex: 'resourceIdList',
      key: 'resourceIdList',
      render: (resourceIdList: any) => (
        <a onClick={() => handleShowSourceList(resourceIdList)}>查看</a>
      ),
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
      render: (isDisable: boolean) => (isDisable ? '是' : '否'),
    },
    {
      title: '操作',
      width: 180,
      render: (record: any) => (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => history.push('/role/create', { record })}
          >
            编辑
          </Button>
          <Popconfirm
            placement="topLeft"
            title="确定要删除该数据吗？"
            onConfirm={() => tableRef.deleteData({ data: [record.id], method: 'delete' })}
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
      label: '关键字',
      name: 'keywords',
      componentType: 'Input',
      placeholder: '请输入搜索关键字',
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
        title="角色列表"
        columns={columns}
        searchItems={searchItems}
        url="admin/roles"
        deleteUrl="admin/roles"
        addPath="/role/create"
        rowKey="nickname"
        onRef={(ref: any) => (tableRef = ref)}
      />
      {menuVisible ? (
        <Modal
          title="资源"
          visible={true}
          onCancel={() => setMenuVisible(false)}
          onOk={() => setMenuVisible(false)}
        >
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={menuList}
            treeCheckable
            defaultValue={menuData}
            fieldNames={{ label: 'name', value: 'id' }}
            allowClear
            disabled
            treeDefaultExpandAll
          />
        </Modal>
      ) : null}
      {sourceVisible ? (
        <Modal
          title="资源"
          visible={true}
          onCancel={() => setSourceVisible(false)}
          onOk={() => setSourceVisible(false)}
        >
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={sourceList}
            treeCheckable
            defaultValue={sourceData}
            fieldNames={{ label: 'resourceName', value: 'id' }}
            allowClear
            disabled
            treeDefaultExpandAll
          />
        </Modal>
      ) : null}
    </>
  );
};

export default NewsList;
