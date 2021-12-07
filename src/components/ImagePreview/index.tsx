import { useState } from 'react';
import { Modal } from 'antd';
interface IProps {
  imgSrc: string;
  showBgColor?: boolean;
}
const ImagePreview = (props: IProps) => {
  const { imgSrc, showBgColor } = props;
  const [visible, setVisible] = useState(false);
  const handleTriggerVisible = () => {
    setVisible(!visible);
  };
  const handleError = (e: any) => {
    e.target.src = '/images/noimg.jpg';
  };
  return (
    <>
      <img
        src={imgSrc || '/images/noimg.jpg'}
        title="点击放大"
        style={{
          height: 50,
          borderRadius: 5,
          cursor: 'pointer',
          marginRight: 5,
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
          <img src={imgSrc} style={{ maxWidth: '100%' }} onError={handleError} />
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;
