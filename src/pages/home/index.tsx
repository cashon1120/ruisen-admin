import {memo} from 'react'
import styles from './style.less'

const getUserInfo = () => {
  const userInfo = localStorage.getItem('useInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return {};
};

const userInfo = getUserInfo();

const Home = () => {
  return <div className={styles.wrapper}>
    <div>
      <div><img className={styles.avatar} src={userInfo.avatar} /></div>
      您好, {userInfo.nickname}
      <h4>欢迎来到瑞森海外房管家后台管理系统</h4>
    </div>
  </div>;
};

export default memo(Home);
