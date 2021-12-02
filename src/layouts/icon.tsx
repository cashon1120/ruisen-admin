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
    case 'flag':
      icon = <FlagOutlined />;
      break;
    case 'notification':
      icon = <NotificationOutlined />;
      break;
    case 'user':
      icon = <UserOutlined />;
      break;
    case 'crown':
      icon = <CrownOutlined />;
      break;
    case 'diff':
      icon = <DiffOutlined />;
      break;
    case 'team':
      icon = <TeamOutlined />;
      break;
    case 'lock':
      icon = <LockOutlined />;
      break;
    case 'profile':
      icon = <ProfileOutlined />;
      break;
    case 'snippets':
      icon = <SnippetsOutlined />;
      break;
    default:
      icon = <UserOutlined />;
  }
  return <>{icon}</>;
};

export default Icon;
