import React from 'react'
import { Form, Modal } from 'antd'
import { BasicFormProps } from '@/components/BasicForm/Index'

import styles from './style.less'

interface ModalFromProps extends BasicFormProps {
  visible: boolean
  title: string
  onCancel: () => void
  width?: number
  okText?: string
  cancelText?: string
  zIndex?: number
  footer?: any
  onFormRef?: any
  vertical?: boolean
  canDrag?: boolean
  disableMask?: boolean
  disableToggleShowTopMask?: boolean
  disableMaskClosable?: boolean
  onRef?: any
  //水平位置调整
  left?: number
}

const form_layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
}

interface IState {
  height: number | string
}

class ModalForm extends React.Component<ModalFromProps, IState> {
  formInstance: any = null
  constructor(props: ModalFromProps) {
    super(props)
    this.state = {
      height: 'auto',
    }
  }

  componentDidMount() {
    const windowHeight = document.body.offsetHeight
    this.setState({
      height: windowHeight - 300,
    })
  }

  onFinish = (values: any) => {
    const { onFinish } = this.props
    if (onFinish) {
      this.formInstance.current.resetFields()
      onFinish(values)
    }
  }

  handleSetValue = () => { }

  connectInstance = (modalInstance: any) => {
    const { onRef } = this.props
    setTimeout(() => {
      if (this.formInstance && modalInstance && onRef) {
        Object.keys(this.formInstance).forEach((key: string) => {
          modalInstance[key] = this.formInstance[key]
        })
        onRef(modalInstance)
      }
    }, 0)
  }

  okHandle = () => {
    this.formInstance.submit()
  }

  setInstance = (e: any) => {
    this.formInstance = e
    const { onFormRef } = this.props
    if (onFormRef) {
      onFormRef(e)
    }
  }

  afterClose = () => {
    this.formInstance.resetFields()
  }

  onFormFinish = (values: any) => {
    const { onFinish } = this.props
    Object.keys(values).forEach((key: string) => {
      if (typeof values[key] === 'string') {
        values[key] = values[key].replace(/\s/g, '')
      }
    })
    onFinish(values)
  }

  render() {
    const formItem: any = this.props.children || []
    const {
      visible,
      width,
      okText,
      cancelText,
      footer,
      title,
      loading,
      onCancel,
      zIndex,
      initialValues,
      layout,
      vertical,
      disableMask,
      disableMaskClosable,
    } = this.props
    const { okHandle, afterClose } = this
    if (layout) {
      form_layout.labelCol.span = layout.labelCol
      form_layout.wrapperCol.span = layout.wrapperCol
    }
    const { height } = this.state
    return (
      <Modal
        forceRender
        className={styles.modalForm}
        title={title}
        width={width || 520}
        okText={okText || '确定'}
        cancelText={cancelText || '取消'}
        footer={footer}
        zIndex={zIndex || 1000}
        visible={visible || false}
        onOk={okHandle}
        confirmLoading={loading || false}
        onCancel={onCancel}
        afterClose={afterClose}
        mask={!disableMask}
        maskClosable={!disableMaskClosable}
      >
        <div style={{ overflow: 'auto', maxHeight: height }}>
          <Form
            {...form_layout}
            ref={e => this.setInstance(e)}
            layout={vertical ? 'vertical' : 'horizontal'}
            scrollToFirstError={true}
            onFinish={this.onFormFinish}
            initialValues={initialValues}
          >
            {Array.isArray(formItem) ? formItem.map((item: any, index: number) => <div key={index}>{item}</div>) : formItem}
          </Form>
        </div>
      </Modal>
    )
  }
}

export default ModalForm
