
import {useState, useEffect} from 'react'
import Search, { FormItem } from '@/components/Search'

import TableList from '@/components/TableList/';
import HttpRequest from '@/utils/request';

const Table = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ])
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    searchParams: {}
  })

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ];

  const handlePageOrSizeChange = (page: number, pageSize?: number) => {
    // 翻页滚动到最上面
    const tableBody = document.getElementsByClassName('ant-table-body')
    if (tableBody[0]) {
      tableBody[0].scrollTop = 0
    }
    setParams({
      ...params,
      page,
      pageSize: pageSize || params.pageSize
    })
  }

  const getSearchItems = () => {

    const searchItems: FormItem[] = [
      {
        label: 'SIM卡号',
        name: 'sim',
        componentType: 'Input',
        placeholder: '请输入',
      },
      {
        label: '终端编号',
        name: 'terminalId',
        componentType: 'Input',
      },
    ]
    return searchItems
  }

  const handleSearch = (values: any, page: number = 1) => {
    setParams({
      ...params,
      searchParams: {
        ...params.searchParams,
        ...values
      }
    })
  }

  const getData = () => {
    HttpRequest({ url: '/login', params }).then((res: any) => console.log(res));
  }

  useEffect(getData, [params])

  return <>
  <Search items={getSearchItems()} loading={loading} handleSearch={handleSearch} />
  <TableList
    loading={loading}
    columns={columns}
    data={data}
    currentPage={params.page}
    totalCount={params.totalCount}
    pageSize={params.pageSize}
    onChange={handlePageOrSizeChange}
    rowKey="VehicleID"
  />;
  </>
};

export default Table;
