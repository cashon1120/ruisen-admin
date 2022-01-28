import { useState } from 'react';
import { Button, Modal } from 'antd';
import { TableColums } from '@/components/TableList';
import styles from './index.less';
interface IProps {
  title: string;
  data: any;
  columns: TableColums[];
  btnText?: string;
}

const Detail = (props: IProps) => {
  const { data, columns, title, btnText } = props;
  const [visible, setVisible] = useState(false);
  const renderItem = (item: TableColums) => {
    if (item.title === '操作') return null;
    return (
      <div className={styles.list} key="item.title">
        <div className={styles.label}>{item.title}:</div>
        <div className={styles.value}>{renderValue(item)}</div>
      </div>
    );
  };
  const renderValue = (item: TableColums) => {
    if (item.render) {
      return item.render(data[item.dataIndex as string], data, true);
    }
    return data[item.dataIndex as string];
  };
  const handleTriggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Button onClick={handleTriggleVisible} size="small" style={{ marginLeft: 10 }}>
        {btnText || '详情'}
      </Button>
      <Modal
        title={title}
        visible={visible}
        width={1000}
        onCancel={handleTriggleVisible}
        onOk={handleTriggleVisible}
        footer={
          <Button onClick={handleTriggleVisible} type="primary">
            确认
          </Button>
        }
      >
        {columns.map((item: TableColums) => renderItem(item))}
      </Modal>
    </>
  );
};

export default Detail;
