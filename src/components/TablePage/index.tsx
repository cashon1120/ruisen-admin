
import {useState, useEffect} from 'react'
import Search, { FormItem } from '@/components/Search'
import Wrapper from '../Wrapper/Index';
import TableList, {TableColums} from '@/components/TableList/';
import HttpRequest from '@/utils/request';

export interface RefFunctions {
  deleteData: (params: any) => void
  getData: (page?: number) => void
}
interface IProps {
  url: string
  title: string
  columns: TableColums[],
  searchItems: FormItem[],
  defaultParams: any
  deleteUrl?: string
  onRef?: (ref: any) => void
}

const TablePage = (props: IProps) => {
  const {columns, searchItems, url, title, defaultParams, onRef, deleteUrl} = props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    searchParams: defaultParams || null
  })

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


  const handleSearch = (values: any, page: number = 1) => {
    setParams({
      ...params,
      page: 1,
      searchParams: {
        ...params.searchParams,
        ...values
      }
    })
  }

  const getData = (page?: number) => {
    const options: any = {...params}
    page ? options.page = page : null
    delete options.totalCount
    setLoading(true)
    HttpRequest({ url, params: options }).then((res: any) => {
      setLoading(false)
      setData([])
    }).catch(() => {
      setData([
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
      setLoading(false)
    });
  }

  useEffect(getData, [params])


  const deleteData = (deleteOptions: any) => {
    setLoading(true)
    HttpRequest({ url: deleteUrl || '', params: deleteOptions }).then((res: any) => {
      getData()
    }).catch(() => {
      setLoading(false)
    });
  }

  useEffect(() => {
    onRef && onRef({deleteData, getData})
  }, [])

  return <Wrapper title={title}>
  <Search items={searchItems} loading={loading} handleSearch={handleSearch} />
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
  </Wrapper>
};

export default TablePage;
