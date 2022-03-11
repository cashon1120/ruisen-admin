import { useState } from 'react';
import { Modal } from 'antd';
interface IProps {
  imgSrc: string;
  disableShowBig?: boolean;
  showBgColor?: boolean;
}
const defaultSrc = '/images/noimg.jpg';
const videoSrc = '/images/video.png';
const ImagePreview = (props: IProps) => {
  const { imgSrc, showBgColor, disableShowBig } = props;
  const [visible, setVisible] = useState(false);
  const handleTriggerVisible = () => {
    !disableShowBig && setVisible(!visible);
  };
  const handleError = (e: any) => {
    e.target.src = defaultSrc;
  };
  const isVideo = imgSrc.indexOf('.mp4') > -1;
  return (
    <>
      <img
        // src={formatImgSrc(imgSrc || defaultSrc)}
        src={isVideo ? videoSrc : imgSrc || defaultSrc}
        title="点击预览"
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
        title="预览"
        width={750}
        visible={visible}
        onCancel={handleTriggerVisible}
        onOk={handleTriggerVisible}
      >
        <div style={{ textAlign: 'center' }}>
          {!isVideo ? (
            <img
              src={imgSrc}
              style={{ maxWidth: '100%', background: showBgColor ? '#752117' : '#fafafa' }}
              onError={handleError}
            />
          ) : (
            <video src={imgSrc} autoPlay controls style={{ height: 400 }} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;
