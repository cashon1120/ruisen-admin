import { useState } from 'react';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Form, message, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import ModalForm from '@/components/ModalForm';
import HttpRequest from '@/utils/request';
import ImagePreview from '@/components/ImagePreview';
import ProgressList from './progressList';
import { houseType, authenticationStatus, isEnd } from '@/utils/enum';
import CreateProgress from './createProgress'

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
  }

  const columns = [
    {
      title: '房产标题',
      dataIndex: 'houseTitle',
      key: 'houseTitle',
    },
    {
      title: '管家服务收费标准',
      dataIndex: 'butlerServiceChargeStandard',
      key: 'butlerServiceChargeStandard',
    },
    {
      title: '管家服务LOGO',
      dataIndex: 'butlerServiceLogo',
      key: 'butlerServiceLogo',
      render: (res: string) => <ImagePreview imgSrc={res}/>,
    },
    {
      title: '管家服务名称',
      dataIndex: 'butlerServiceName',
      key: 'butlerServiceName',
    },
    {
      title: '当前状态',
      dataIndex: 'currentState',
      key: 'currentState',
    },
    {
      title: '房产地址',
      dataIndex: 'houseAddress',
      key: 'houseAddress',
    },
    {
      title: '房产认证状态',
      dataIndex: 'houseAuthenticationStatus',
      key: 'houseAuthenticationStatus',
      render: (text: string) => authenticationStatus[text],
    },
    {
      title: '房产国家城市',
      dataIndex: 'houseNationalCity',
      key: 'houseNationalCity',
    },
    {
      title: '房产业主姓名',
      dataIndex: 'butlerServiceName',
      key: 'butlerServiceName',
    },
    {
      title: '管家服务名称',
      dataIndex: 'houseOwnerName',
      key: 'houseOwnerName',
    },
    {
      title: '房产类型',
      dataIndex: 'houseType',
      key: 'houseType',
      render: (type: string) => houseType[type],
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '是否完结',
      dataIndex: 'isEnd',
      key: 'isEnd',
      render: (res: string) => isEnd[res],
    },
    {
      title: '订单服务进度列表',
      dataIndex: 'orderServiceProgressList',
      key: 'orderServiceProgressList',
      render: (orderServiceProgressList: any) => <ProgressList data={orderServiceProgressList}  updateCallBack={handleUpdateProgress}  />,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (record: any) => (
        <>
          <Button
            style={{ marginRight: 15 }}
            size="small"
            type="primary"
            onClick={() => handleCreateProgress(record)}
          >
            添加进度
          </Button>
          <Button size="small" type="primary" onClick={() => handleUpdatePrice(record)}>
            修改总价
          </Button>
        </>
      ),
    },
  ];

  const searchItems = [
    {
      label: '房产标题',
      name: 'houseTitle',
      componentType: 'Input',
    },
    {
      label: '房产标题',
      name: 'houseTitle',
      componentType: 'Input',
    },
    {
      label: '用户手机号码',
      name: 'phoneNumber',
      componentType: 'Input',
    },
    {
      label: '房产业主姓名',
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
      componentType: 'Radio',
      dataList: [
        {
          text: '是',
          value: 1,
        },
        {
          text: '否',
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
        scrollWidth={2500}
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
        <CreateProgress handleSubmit={handleSubmitTotalProgressModal} loading={loading} handleCancel={() => setVisibleProgress(false)} />
      ) : null}
    </>
  );
};

export default OrderList;
