import {useState} from 'react'
import {Modal, Button} from 'antd'
import {TableColums} from '../TableList'
import styles from './index.less'
interface IProps {
  data : any,
  columns : TableColums[]
}

const Detail = (props : IProps) => {
  const {columns, data} = props
  const [visible,
    setVisible] = useState(false)
  const handleTriggleVisible = () => {
    setVisible(!visible)
  }
  const render = (item : TableColums) => {
    if (!item.render) {
      return data[item.dataIndex as any]
    }
    return item.render(data[item.dataIndex as any])
  }
  return <> <Button
    size="small"
    style={{
    marginLeft: 10
  }}
    onClick={handleTriggleVisible}>查看</Button>
  {
    visible
      ? <Modal
          title="查看详情"
          visible
          onCancel={handleTriggleVisible}
          onOk={handleTriggleVisible}
          width={800}>
          {columns.map((item : TableColums) => item.title === '操作'
            ? null
            : <div key={item.dataIndex} className={styles.list}>
              <div className={styles.label}>{item.title}:</div>
              <div className={styles.value}>{render(item)}</div>
            </div>)}
        </Modal>
      : null
  } </>
}
export default Detail
