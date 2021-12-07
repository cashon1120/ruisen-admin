import { useState } from 'react';
import { Table, Modal } from 'antd';

interface IProps {
  data: any;
}
const ProgressList = (props: IProps) => {
  const { data } = props;
  const [visible, setVisible] = useState(false);
  const handleTriggleVisible = () => {
    setVisible(!visible);
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
      width: 120,
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
    },
  ];
  return (
    <>
      <a onClick={handleTriggleVisible}>查看</a>
      {visible ? (
        <Modal
          width={700}
          forceRender
          title="进度"
          visible={true}
          onCancel={handleTriggleVisible}
          onOk={handleTriggleVisible}
        >
          <Table columns={columns} dataSource={data} pagination={false} />
        </Modal>
      ) : null}
    </>
  );
};

export default ProgressList;
