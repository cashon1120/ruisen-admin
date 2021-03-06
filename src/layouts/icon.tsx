import {
  UserOutlined,
  FlagOutlined,
  NotificationOutlined,
  HomeOutlined,
  CrownOutlined,
  TeamOutlined,
  DiffOutlined,
  LockOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  CommentOutlined,
  DollarOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

interface Props {
  name: string;
}

const Icon = (props: Props) => {
  const { name } = props;
  let icon = <></>;

  switch (name) {
    case 'home':
      icon = <HomeOutlined />;
      break;
    case 'house':
      icon = <FlagOutlined />;
      break;
    case 'news':
      icon = <NotificationOutlined />;
      break;
    case 'user':
      icon = <UserOutlined />;
      break;
    case 'crown':
      icon = <CrownOutlined />;
      break;
    case 'todo':
      icon = <DiffOutlined />;
      break;
    case 'admin':
      icon = <TeamOutlined />;
      break;
    case 'role':
      icon = <LockOutlined />;
      break;
    case 'menus':
      icon = <ProfileOutlined />;
      break;
    case 'logs':
      icon = <SnippetsOutlined />;
      break;
    case 'service':
      icon = <CommentOutlined />;
      break;
    case 'order':
      icon = <DollarOutlined />;
      break;
    case 'income':
      icon = <MoneyCollectOutlined />;
      break;
    case 'setting':
      icon = <SettingOutlined />;
      break;
    case 'rental':
      icon = <UnorderedListOutlined />;
      break;
    default:
  }
  return <>{icon}</>;
};

export default Icon;
