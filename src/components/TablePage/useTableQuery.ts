import { useState, useRef } from 'react';
import HttpRequest from '@/utils/request';

interface Params {
  url: string;
}

const defaultQuery = {
  current: 1,
  siez: 10,
};

const useTableQuery = (params: Params) => {
  const pagination = useRef({
    current: 1,
    size: 10,
  });
  const [data, setData] = useState({ recordList: [], count: 0 });
};

export default useTableQuery;
