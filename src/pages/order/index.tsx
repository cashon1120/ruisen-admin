import { useState } from 'react';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Form, message, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import ModalForm from '@/components/ModalForm';
import HttpRequest from '@/utils/request';
import ImagePreview from '@/components/ImagePreview';
import Detail from '@/components/Detail';
import { houseType, authenticationStatus, isEnd } from '@/utils/enum';
import ProgressList from './progressList';
import CreateProgress from './createProgress';

let tableRef: RefFunctions = {} as RefFunctions;

const OrderList = () => {
  const [currentData, setCurrentDta] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [visiblePrice, setVisiblePrice] = useState(false);
  const [visibleProgress, setVisibleProgress] = useState(false);

  const handleUpdatePrice = (record: any) => {
    setCurrentDta(record);
    setVisiblePrice(true);
  };

  const handleCreateProgress = (record: any) => {
    setCurrentDta(record);
    setVisibleProgress(true);
  };

  const handleSubmitTotalPriceModal = (values: any) => {
    setLoading(true);
    HttpRequest({
      method: 'post',
      url: 'order/update/total/price',
      params: {
        id: currentData.id,
        ...values,
      },
    })
      .then(() => {
        message.success('操作成功');
        setVisiblePrice(false);
        tableRef.getData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitTotalProgressModal = (values: any) => {
    setLoading(true);
    HttpRequest({
      method: 'post',
      url: 'order/update/order/service/progress',
      params: {
        id: currentData.id,
        ...values,
      },
    })
      .then(() => {
        message.success('操作成功');
        setVisibleProgress(false);
        tableRef.getData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateProgress = () => {
    tableRef.getData();
  };

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 200,
    },
    {
      title: '业主姓名',
      dataIndex: 'houseOwnerName',
      key: 'houseOwnerName',
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
      width: 100,
      key: 'roomNo',
    },
    {
      title: '管家服务名称',
      dataIndex: 'butlerServiceName',
      key: 'butlerServiceName',
    },
    {
      title: '服务进度',
      dataIndex: 'orderServiceProgressList',
      key: 'orderServiceProgressList',
      fixed: 'right',
      render: (orderServiceProgressList: any) => (
        <ProgressList data={orderServiceProgressList} updateCallBack={handleUpdateProgress} />
      ),
    },
    {
      title: '操作',
      width: 280,
      fixed: 'right',
      render: (record: any) => (
        <>
          <Button
            style={{ marginRight: 10 }}
            size="small"
            type="primary"
            onClick={() => handleCreateProgress(record)}
          >
            添加进度
          </Button>
          <Button size="small" type="primary" onClick={() => handleUpdatePrice(record)}>
            修改总价
          </Button>
          <Detail title="订单详情" btnText="订单详情" columns={columns} data={record} />
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '项目名称',
      name: 'houseTitle',
      componentType: 'Input',
    },
    {
      label: '手机号',
      name: 'phoneNumber',
      componentType: 'Input',
    },
    {
      label: '业主姓名',
      name: 'houseOwnerName',
      componentType: 'Input',
    },
    {
      label: '订单号',
      name: 'orderNo',
      componentType: 'Input',
    },
    {
      label: '当前状态',
      name: 'currentState',
      componentType: 'Input',
    },
    {
      label: '是否完结',
      name: 'isEnd',
      componentType: 'Select',
      allowClear: true,
      width: 90,
      dataList: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 2,
        },
      ],
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
        title="订单管理"
        columns={columns}
        searchItems={searchItems}
        url="order/list"
        rowKey="id"
        onRef={(ref: any) => (tableRef = ref)}
      />
      {visiblePrice ? (
        <ModalForm
          title="修改总价"
          onFinish={handleSubmitTotalPriceModal}
          visible={true}
          loading={loading}
          initialValues={{
            totalPrice: currentData.totalPrice,
          }}
          onCancel={() => setVisiblePrice(false)}
        >
          <Form.Item
            name="totalPrice"
            label="总价"
            rules={[{ required: true, message: '总价不能为空！' }]}
          >
            <InputNumber placeholder="请输入总价！" style={{ width: 150 }} />
          </Form.Item>
        </ModalForm>
      ) : null}

      {visibleProgress ? (
        <CreateProgress
          handleSubmit={handleSubmitTotalProgressModal}
          loading={loading}
          handleCancel={() => setVisibleProgress(false)}
        />
      ) : null}
    </>
  );
};

export default OrderList;
