import { useState } from 'react';
import { Table, Modal, message, Button } from 'antd';
import CreateProgress from './createProgress';
import HttpRequest from '@/utils/request';

interface IProps {
  data: any;
  updateCallBack: () => void
}
const ProgressList = (props: IProps) => {
  const { data, updateCallBack } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false);
  const [record, setRecord] = useState<any>({})
  const handleTriggleVisible = () => {
    setVisible(!visible);
  };
  const handleUpdateData = (record: any) => {
    setRecord(record)
    setUpdateVisible(true);
  };

  const columns = [
    {
      title: '排序',
      dataIndex: 'sortNumber',
      key: 'sortNumber',
      width: 60,
    },
    {
      title: '进度名称',
      dataIndex: 'progressName',
      key: 'progressName',
      width: 180,
    },
    {
      title: '进度详情',
      dataIndex: 'progressDetail',
      key: 'progressDetail',
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      width: 100,
      render: (record: any) => <a onClick={() => handleUpdateData(record)}>修改</a>,
    },
  ];

  const onSubmit = (values: any) => {
    values.id = record.id
    setLoading(true);
    HttpRequest({
      method: 'post',
      url: 'order/update/service/progress',
      params: values,
    })
      .then(() => {
        setLoading(false)
        setUpdateVisible(false)
        updateCallBack()
        message.success('操作成功');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button onClick={handleTriggleVisible} size='small' >查看进度</Button>
      {visible ? (
        <Modal
          width={1000}
          zIndex={2000}
          footer={<Button type='primary' onClick={handleTriggleVisible}>确认</Button>}
          forceRender
          title="服务进度"
          visible={visible}
          onCancel={handleTriggleVisible}
        >
          <Table columns={columns} dataSource={data} pagination={false} />
        </Modal>
      ) : null}
      {updateVisible ? (
        <CreateProgress initialValues={record} handleSubmit={onSubmit} loading={loading} handleCancel={() => setUpdateVisible(false)} />
      ) : null}
    </>
  );
};

export default ProgressList;
