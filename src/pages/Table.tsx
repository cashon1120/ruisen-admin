import {useState} from 'react'
import TablePage, {RefFunctions} from "@/components/TablePage";
import {Button, Form, Input, Radio} from 'antd'
import ModalForm from '@/components/ModalForm'

let tableRef: RefFunctions = {} as RefFunctions

const Table = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    },{
      title: '操作',
      render: (record: any) => <>
        <Button size="small" type="primary">编辑</Button>
        <Button size="small" type="primary" className="tab-btn" onClick={() => setVisible(true)}>刷新</Button>
        <Button size="small" type="default" className="tab-btn" onClick={() => tableRef.deleteData(record)}>删除</Button>
      </>
    }
  ]

  const searchItems = [
    {
      label: 'SIM卡号',
      name: 'sim',
      componentType: 'Input',
      placeholder: '请输入',
    },
    {
      label: '终端编号',
      name: 'terminalId',
      componentType: 'Input',
    },
  ]

  const defaultParams = {
    sim: 123,
    terminalId: 1
  }


  const getRef = (options: any) => {
  tableRef = options
  }

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmitModal = (values: any) => {

  }

  return <>
    <TablePage url="api/test" deleteUrl="api/delete/343434" onRef={getRef} columns={columns} defaultParams={defaultParams} searchItems={searchItems} title="这是一个表格" />
    <ModalForm
        title="新增驾驶员"
        onFinish={handleSubmitModal}
        visible={visible}
        loading={loading}
        initialValues={{
          DriverLicence: '',
          Sex: 1,
          Telephone: '',
          IDCard: '',
        }}
        onCancel={() => setVisible(false)}
      >
        <Form.Item
          name="Name"
          label="姓名"
          rules={[
            { required: true, message: '请输入姓名!' },
            { min: 2, message: '姓名为2-15位!' },
            { max: 15, message: '姓名为2-15位!' },
          ]}
        >
          <Input placeholder="请输入姓名" maxLength={15} />
        </Form.Item>

        <Form.Item name="Sex" label="性别">
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="DriverLicence" label="驾驶证号">
          <Input placeholder="请输入驾驶证号" />
        </Form.Item>

        <Form.Item name="IDCard" label="身份证号" rules={[{ pattern: /^\d{17}[\dXx]$/g, message: '身份证号为18位' }]}>
          <Input placeholder="请输入身份证号" maxLength={18} />
        </Form.Item>

        <Form.Item name="Telephone" label="联系电话">
          <Input placeholder="请输入联系电话" maxLength={20} />
        </Form.Item>
    </ModalForm>
  </>
}

export default Table
