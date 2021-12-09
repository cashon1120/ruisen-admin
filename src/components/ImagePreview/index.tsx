import { useState } from 'react';
import { Modal } from 'antd';
interface IProps {
  imgSrc: string;
  disableShowBig?: boolean;
  showBgColor?: boolean;
}
const defaultSrc = '/images/noimg.jpg'
const ImagePreview = (props: IProps) => {
  const { imgSrc, showBgColor, disableShowBig } = props;
  const [visible, setVisible] = useState(false);
  const handleTriggerVisible = () => {
    !disableShowBig && setVisible(!visible);
  };
  const handleError = (e: any) => {
    e.target.src = defaultSrc;
  };
  return (
    <>
      <img
        src={imgSrc || defaultSrc}
        title="点击查看大图"
        style={{
          height: 50,
          marginRight: 5,
          borderRadius: 5,
          cursor: disableShowBig ? 'default' : 'pointer',
          background: showBgColor ? '#752117' : 'transparent',
        }}
        onClick={handleTriggerVisible}
        onError={handleError}
      />
      <Modal
        footer={[]}
        title="图片预览"
        width={700}
        visible={visible}
        onCancel={handleTriggerVisible}
        onOk={handleTriggerVisible}
      >
        <div style={{ textAlign: 'center' }}>
          <img src={imgSrc} style={{ maxWidth: '100%'}} onError={handleError} />
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;
