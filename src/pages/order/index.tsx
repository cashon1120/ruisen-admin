import {  useState } from 'react';
import TablePage, { RefFunctions } from '@/components/TablePage';
import { Button, Radio, Form, message, Switch, Input, InputNumber } from 'antd';
import Loading from '@/components/Loading';
import ModalForm from '@/components/ModalForm';
import HttpRequest from '@/utils/request';
import ImagePreview from '@/components/ImagePreview';
import ProgressList from './progressList';
import { houseType, authenticationStatus, isEnd} from '@/utils/enum'

let tableRef: RefFunctions = {} as RefFunctions;

const OrderList = (props: any) => {
  const [currentData, setCurrentDta] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [visiblePrice, setVisiblePrice] = useState(false);
  const [visibleProgress, setVisibleProgress] = useState(false);

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

  const handleUpdatePrice = (record: any) => {
    setCurrentDta(record);
    setVisiblePrice(true);
  };

  const handleUpdateProgress = (record: any) => {
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
      render: (res: string) => <ImagePreview imgSrc={res} />,
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
      render: () => <a>查看</a>
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
      title: '是否禁用',
      dataIndex: 'isDisable',
      key: 'isDisable',
      render: (isDisable: boolean, record: any) => (
        <Switch
          defaultChecked={isDisable}
          disabled={!record.id}
          onChange={(value: boolean) => handleChangeDisableState(value, record.id)}
        />
      ),
    },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      render: (record: any) => (
        <>
          {/* <Button size="small" type="primary" onClick={() => handleUpdatePrice(record)}>
            编辑
          </Button> */}
          <Button size="small" type="primary" onClick={() => handleUpdateProgress(record)}>
            修改进度
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
      dataList: [{
        label: '是',
        value: 1,
      }, {
        label: '否',
        value: 2
      }]
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
      <ProgressList data={[]} />
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
            <InputNumber placeholder="请输入总价！" />
          </Form.Item>

        </ModalForm>
      ) : null}

    {visibleProgress ? (
        <ModalForm
          title="修改进度"
          onFinish={handleSubmitTotalProgressModal}
          visible={true}
          loading={loading}
          onCancel={() => setVisibleProgress(false)}
        >
          <Form.Item
            name="progressName"
            label="进度名称"
            rules={[{ required: true, message: '进度名称不能为空！' }]}
          >
            <Input placeholder="请输入进度名称" />
          </Form.Item>

          <Form.Item
            name="sortNumber"
            label="排序编号"
            rules={[{ required: true, message: '排序编号不能为空！' }]}
          >
            <InputNumber placeholder="请输入排序编号" />
          </Form.Item>

          <Form.Item
            name="isEnd"
            label="是否完结"
          >
            <Radio.Group>
              <Radio value="1" >是</Radio>
              <Radio value="2" >否</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="progressDetail"
            label="进度详情"
          >
            <Input placeholder="请输入进度详情" />
          </Form.Item>

        </ModalForm>
      ) : null}
    </>
  );
};

export default OrderList
