import { useState, useEffect, useRef } from 'react';
import Search, { FormItem } from '@/components/Search';
import Wrapper from '../Wrapper/Index';
import TableList, { TableColums } from '@/components/TableList/';
import HttpRequest from '@/utils/request';
import { message } from 'antd';

interface Data {
  [key: string]: any;
}

interface DeleteOptions {
  data: Data;
  queryParams?: string;
  method?: 'post' | 'delete';
}

export interface RefFunctions {
  deleteData: (params: DeleteOptions) => void;
  getData: (page?: number) => void;
  updateData: (key: string, record: any) => void;
}

interface IProps {
  title: string;
  url: string;
  columns: TableColums[];
  searchItems: FormItem[];
  addPath?: string;
  defaultParams?: any;
  deleteUrl?: string;
  rowKey?: string;
  onRef?: (ref: any) => void;
  pageSize?: number;
  disablePagination?: boolean;
  scrollWidth?: number;
  formatData?: <T>(data: T) => T;
}

const TablePage = (props: IProps) => {
  const {
    title,
    columns,
    searchItems,
    url,
    defaultParams,
    deleteUrl,
    addPath,
    rowKey,
    pageSize,
    disablePagination,
    scrollWidth,
    onRef,
    formatData,
  } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState(1);
  const dataRef = useRef(data);
  const currentPage = useRef(1);
  const [params, setParams] = useState({
    current: currentPage.current,
    size: pageSize || 10,
    ...defaultParams,
  });

  const handlePageOrSizeChange = (current: number, size?: number) => {
    // 翻页滚动到最上面
    const tableBody = document.getElementsByClassName('ant-table-body');
    if (tableBody[0]) {
      tableBody[0].scrollTop = 0;
    }
    currentPage.current = current;
    setParams({
      ...params,
      current,
      size: size || params.size,
    });
  };

  const handleSearch = (values: any) => {
    Object.keys(values).map((key: string) => {
      // 处理单个时间
      if (values[key] !== null && typeof values[key] === 'object' && values[key].format) {
        values[key] = values[key].format('YYYY-MM-DD');
      }
      // 处理时间段
      if (key === 'rangeTime') {
        if (values.rangeTime) {
          values.startTime = values[key][0].format('YYYY-MM-DD');
          values.endTime = values[key][1].format('YYYY-MM-DD');
        } else {
          values.startTime = '';
          values.endTime = '';
        }

        delete values.rangeTime;
      }
    });
    setParams({
      ...params,
      current: 1,
      ...values,
    });
  };

  const getData = () => {
    const options: any = { ...params };
    // 删除为空的key
    Object.keys(options).map((key: string) => {
      if (options[key] === '') {
        delete options[key];
      }
    });

    setLoading(true);
    HttpRequest({ url, method: 'get', params: options })
      .then((res: any) => {
        setLoading(false);
        let result = res.recordList;
        if (formatData) {
          result = formatData(result);
        }
        setData(result);
        dataRef.current = result;
        setTotal(res.count);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteData = (options: DeleteOptions) => {
    if (!deleteUrl) return;
    const { data, method = 'delete', queryParams } = options;
    setLoading(true);
    const url = queryParams ? `${deleteUrl}/${queryParams}` : deleteUrl;
    HttpRequest({ url: url || '', params: queryParams ? {} : data, method })
      .then(() => {
        setLoading(false);
        message.success('操作成功');
        setParams({
          ...params,
          current: currentPage.current,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateData = (key: string, record: any) => {
    dataRef.current.forEach((item: any, index: number) => {
      if (item[key] === record[key]) {
        dataRef.current[index] = {
          ...dataRef.current[index],
          ...record,
        };
      }
    });
    setData([...dataRef.current]);
  };

  useEffect(() => {
    onRef && onRef({ deleteData, getData, updateData });
  }, []);

  useEffect(getData, [params]);

  return (
    <Wrapper title={title}>
      <div style={{ paddingBottom: 15 }}>
        <Search
          items={searchItems}
          loading={loading}
          handleSearch={handleSearch}
          addPath={addPath}
        />
      </div>
      <TableList
        loading={loading}
        columns={columns}
        data={data}
        currentPage={params.current}
        pageSize={params.size}
        totalCount={total}
        pagination={!disablePagination}
        scrollWidth={scrollWidth}
        onChange={handlePageOrSizeChange}
        rowKey={rowKey || 'id'}
      />
    </Wrapper>
  );
};

export default TablePage;
