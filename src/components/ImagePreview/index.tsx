import { useState } from 'react';
import { Modal } from 'antd';
interface IProps {
  imgSrc: string;
}
const ImagePreview = (props: IProps) => {
  const { imgSrc } = props;
  const [visible, setVisible] = useState(false);
  const handleTriggerVisible = () => {
    setVisible(!visible);
  };
  const handleError = (e: any) => {
      e.target.src = '/images/noimg.jpg'
  }
  return (
    <>
      <img src={imgSrc} style={{ height: 50 }} onClick={handleTriggerVisible} onError={handleError} />
      <Modal
        footer={[]}
        title="图片预览"
        width={700}
        visible={visible}
        onCancel={handleTriggerVisible}
        onOk={handleTriggerVisible}
      >
        <div style={{textAlign: 'center'}}>
          <img src={imgSrc} style={{ maxWidth: '100%' }}  onError={handleError}/>
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;
