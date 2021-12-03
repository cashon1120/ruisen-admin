import {useState} from 'react'
import {Table, Modal} from 'antd'

interface IProps{
  data: any
}
const ProgressList = (props: IProps) => {
  const {data} = props
  const [visible, setVisible] = useState(false)
  const handleTriggleVisible = () => {
    setVisible(!visible)
  }
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '进度名称',
      dataIndex: 'progressName',
      key: 'progressName',
    },
    {
      title: '进度详情',
      dataIndex: 'progressDetail',
      key: 'progressDetail',
    },
    {
      title: '排序编号',
      dataIndex: 'sortNumber',
      key: 'sortNumber',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ]
  return <>
    <a onClick={handleTriggleVisible}>查看</a>
    {visible ?  <Modal
        width={700}
        forceRender
        title="进度"
        visible={true}
        onCancel={handleTriggleVisible}
        onOk={handleTriggleVisible}
      >
       <Table columns={columns} dataSource={data} pagination={false} />
    </Modal> : null}
  </>
}

export default ProgressList
