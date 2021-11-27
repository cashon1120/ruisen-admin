import { useState, useEffect } from 'react';
import Search, { FormItem } from '@/components/Search';
import Wrapper from '../Wrapper/Index';
import TableList, { TableColums } from '@/components/TableList/';
import HttpRequest from '@/utils/request';
import { message } from 'antd';

export interface RefFunctions {
  deleteData: (params: any) => void;
  getData: (page?: number) => void;
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
}

const TablePage = (props: IProps) => {
  const { title, columns, searchItems, url, defaultParams, onRef, deleteUrl, addPath, rowKey } =
    props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState(1);
  const [params, setParams] = useState({
    current: 1,
    size: 10,
    ...defaultParams,
  });

  const handlePageOrSizeChange = (current: number, size?: number) => {
    // 翻页滚动到最上面
    const tableBody = document.getElementsByClassName('ant-table-body');
    if (tableBody[0]) {
      tableBody[0].scrollTop = 0;
    }
    setParams({
      ...params,
      current,
      size: size || params.size,
    });
  };

  const handleSearch = (values: any, page: number = 1) => {
    Object.keys(values).map((key: string) => {
      // 处理单个时间
      if (values[key] !== null && typeof values[key] === 'object' && values[key].format) {
        values[key] = values[key].format('YYYY-MM-DD');
      }
      // 处理时间段
      if (key === 'rangeTime') {
        if (values.rangeTime !== null) {
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
      current: page,
      ...values,
    });
  };

  const getData = (page?: number) => {
    const options: any = { ...params };
    page ? (options.current = page) : null;
    delete options.totalCount;
    // 删除为空的key
    Object.keys(options).map((key: string) => {
      if (options[key] === '') {
        delete options[key];
      }
    });
    setLoading(true);
    HttpRequest({ url, method: 'get', params: options })
      .then((res: any) => {
        if (res.code !== 20000) return;
        setLoading(false);
        setData(res.data.recordList);
        setTotal(res.data.count);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(getData, [params]);

  const deleteData = (deleteOptions: any) => {
    setLoading(true);
    HttpRequest({ url: deleteUrl || '', params: deleteOptions })
      .then((res: any) => {
        if (res.code !== 20000) {
          message.error(res.message);
          return;
        }
        message.success(res.message);
        getData();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    onRef && onRef({ deleteData, getData });
  }, []);

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
        onChange={handlePageOrSizeChange}
        rowKey={rowKey || 'id'}
      />
      ;
    </Wrapper>
  );
};

export default TablePage;
