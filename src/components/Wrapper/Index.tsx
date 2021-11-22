import { Card } from 'antd';
import styles from './style.less'
const Wrapper = (props: any) => {
  const {children, title} = props
  return <Card title={title}>
      <div className={styles.content}>{children}</div></Card>;
};

export default Wrapper;
