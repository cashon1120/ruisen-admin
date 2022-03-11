import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, message, Radio } from 'antd';
import FormPage from '@/components/FormPage';
import Uploader from '@/components/Upload';
import BraftEditor from 'braft-editor'; // 引入编辑器组件
import 'braft-editor/dist/index.css'; // 引入编辑器样式
import HttpRequest from '@/utils/request';
import styles from './style.less';

let formInstance: any = null;

const CreateData = (props: any) => {
  const [introState, setIntroState] = useState<any>('');
  const [processState, setProcessState] = useState<any>('');
  const [standardState, setStandardState] = useState<any>('');

  const record = props.location.state ? props.location.state.record : null;
  useEffect(() => {
    if (record) {
      setIntroState(BraftEditor.createEditorState(record.serviceIntro));
      setProcessState(BraftEditor.createEditorState(record.serviceProcess));
      setStandardState(BraftEditor.createEditorState(record.chargeStandard));
    }
  }, []);
  const handleChange = (imgs: any[]) => {
    // if (imgs.length === 0) return;
    // if (imgs[0].status === 'done') {
    //   const img = imgs[0].response.data;
    //   formInstance.setFieldsValue({ image: img });
    // }
    if (imgs.length === 0) {
      formInstance.setFieldsValue({ imageList: [] });
      return;
    }
    const result: string[] = [];
    imgs.forEach((item: any) => {
      if (item.response) {
        result.push(item.response.data);
      } else {
        result.push(item.url);
      }
    });
    formInstance.setFieldsValue({ imageList: result });
  };

  const handleVideoChange = (imgs: any[]) => {
    if (imgs.length === 0) {
      formInstance.setFieldsValue({ videoList: [] });
      return;
    }
    const result: string[] = [];
    imgs.forEach((item: any) => {
      if (item.response) {
        result.push(item.response.data);
      } else {
        result.push(item.url);
      }
    });
    formInstance.setFieldsValue({ videoList: result });
  };

  const handleLogoChange = (imgs: any[]) => {
    if (imgs.length === 0) return;
    if (imgs[0].status === 'done') {
      const img = imgs[0].response.data;
      formInstance.setFieldsValue({ logo: img });
    }
  };

  const handleFormFormatValue = (values: any) => {
    values.enable = parseInt(values.enable);
    if (!introState) {
      message.error('请输入服务介绍');
      return;
    }
    if (!processState) {
      message.error('请输入服务流程');
      return;
    }
    if (!standardState) {
      message.error('请输入收费标准');
      return;
    }
    values.serviceIntro = introState.toHTML();
    values.serviceProcess = processState.toHTML();
    values.chargeStandard = standardState.toHTML();
    return values;
  };

  const uploadFn = (param: any) => {
    const formData = new FormData();
    formData.append('file', param.file);
    HttpRequest({
      url: `file/upload`,
      method: 'post',
      type: 'formData',
      params: { file: param.file, fileType: 'BUTLER_SERVICE_RICH_TEXT_IMAGE' },
    }).then((res: any) => {
      param.success({
        url: res,
      });
    });
  };

  const handleEditorChange = (state: any, type: number) => {
    switch (type) {
      case 1:
        setIntroState(state);
        break;
      case 2:
        setProcessState(state);
        break;
      default:
        setStandardState(state);
        break;
    }
  };

  return (
    <>
      <FormPage
        title={record ? '编辑服务信息' : '添加管家服务'}
        createUrl="butler/service/add"
        updateUrl="butler/service/update"
        backPath="/service"
        data={record}
        type="json"
        onRef={(from: any) => (formInstance = from)}
        initialValues={{ enable: '1' }}
        formatValue={handleFormFormatValue}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item
          name="serviceArea"
          label="服务地区"
          rules={[
            {
              required: true,
              message: '请输入服务地区!',
            },
          ]}
        >
          <Input placeholder="请输入服务地区, 如中国*成都" />
        </Form.Item>

        <Form.Item
          name="logo"
          label="LOGO"
          extra="小程序中显示的小图标, 大小70*70, 白色透明png"
          rules={[
            {
              required: true,
              message: '请输上传图片!',
            },
          ]}
        >
          <Uploader
            data={{ fileType: 'BUTLER_SERVICE_LOGO' }}
            colorbg
            disablePreview
            defaultFile={record?.logo}
            onChange={handleLogoChange}
          />
        </Form.Item>
        <Form.Item
          name="imageList"
          label="图片"
          extra="页面顶部banner图, 建议大小750*340"
          rules={[
            {
              required: true,
              message: '请输上传图片!',
            },
          ]}
        >
          <Uploader
            data={{ fileType: 'BUTLER_SERVICE_IMAGE' }}
            defaultFile={record?.imageList}
            maxLength={6}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="videoList"
          label="视频"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输上传图片!',
          //   },
          // ]}
        >
          <Uploader
            data={{ fileType: 'BUTLER_SERVICE_VIDEO' }}
            defaultFile={record?.videoList}
            maxLength={6}
            accept=".mp4"
            onChange={handleVideoChange}
          />
        </Form.Item>

        {/* <Form.Item name="serviceIntro" label="服务介绍">
          <Input.TextArea placeholder="请输入服务介绍" />
          <BraftEditor
            value={introState}
            onChange={(state: any) => handleEditorChange(state, 1)}
          />
        </Form.Item> */}
        <div className={styles.editorWrapper}>
          <div>
            <span>*</span>服务介绍:
          </div>
          <div>
            <BraftEditor
              id="1"
              media={{ uploadFn: uploadFn }}
              value={introState}
              onChange={(state: any) => handleEditorChange(state, 1)}
            />
          </div>
        </div>

        <div className={styles.editorWrapper}>
          <div>
            <span>*</span>服务流程:
          </div>
          <div>
            <BraftEditor
              id="2"
              media={{ uploadFn: uploadFn }}
              value={processState}
              onChange={(state: any) => handleEditorChange(state, 2)}
            />
          </div>
        </div>

        <div className={styles.editorWrapper}>
          <div>
            <span>*</span>收费标准:
          </div>
          <div>
            <BraftEditor
              id="3"
              media={{ uploadFn: uploadFn }}
              value={standardState}
              onChange={(state: any) => handleEditorChange(state, 3)}
            />
          </div>
        </div>

        {/* <Form.Item name="serviceProcess" label="服务流程">
          <Input.TextArea placeholder="请输入服务流程" />
        </Form.Item>

        <Form.Item name="chargeStandard" label="收费标准">
          <Input.TextArea placeholder="请输入收费标准" />
        </Form.Item> */}

        <Form.Item name="sortNumber" label="排序">
          <InputNumber placeholder="请输排序编号" />
        </Form.Item>

        {!record ? (
          <Form.Item name="enable" label="是否启用">
            <Radio.Group>
              <Radio value="1">启用</Radio>
              <Radio value="2">禁用</Radio>
            </Radio.Group>
          </Form.Item>
        ) : null}
      </FormPage>
    </>
  );
};

export default CreateData;
