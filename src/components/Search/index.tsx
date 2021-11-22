import React from 'react'
import dayjs from 'dayjs'
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Checkbox,
  Divider,
  InputNumber,
  TreeSelect,
  TimePicker,
  Switch,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './style.less'

const dateFormat = 'YYYY-MM-DD'


/**
 * @FormItem 查询表单组件
 * @param {label} 名称
 * @param {name} 表单 name
 * @param {componentType} 组件类型, 目前有 Input, Select, Checkbox, Date, DateRange,
 * 大多都是antd里的命名, 后期可扩展.
 * 新增分组下拉 SelectGroup
 * SelectGroup dataList 格式为[{label: '组1',list: [{label: '组1-1',alue: 1, ... }, ...]},
 * @param {hidden} 是否隐藏, 当为 true 的时候隐藏该选项, 一般是用于某些条件筛选的时候 可选
 * @param {defaultValue} 初始值, 可选
 * @param {placeholder} placeholder 值, 可选
 * @param {dataList} 数据列表, 默认格式为[{name: xxx, value: yyy}], 如 componentType: Select, 必须设置 dataList, 也就是 option 选项,
 * @param {dataValueKey} 指定 dataList 的 value 字段
 * @param {dataLabelKey} 指定 dataList 的 lable字段
 * @param {dataTitleKey} 指定 dataList 的 title字段
 * @param {selectMultiple} 下拉框 多选
 * @param {onChange} 组件选择事件, 可选,
 * @param {onLoadMore} 加载更多, 可选,
 * @param {width} 组件宽度, 可选
 * @param {allowClear} 支持清除, 可选, 默认不能清除
 * @param {rightContent} 右边内容
 * @param {addNewEvent} 是否有新增功能, 传入一个方法
 * @param {dateFormat} 时间格式, 'YYYY-MM-DD' || 'YYYY-MM-DD HH:mm:ss' 默认前者
 */



export interface FormItem {
  name: string
  componentType: string
  loading?: boolean
  filterOption?: (inputValue: any, option: any) => boolean
  placeholder?: string
  colon?: boolean
  label?: string
  hidden?: boolean
  defaultValue?: any
  dataList?: any[]
  dataValueKey?: any
  dataLabelKey?: string
  dataTitleKey?: string
  selectMultiple?: boolean
  selectGroup?: boolean
  showSearch?: boolean
  onChange?: (formItem: string, value: any) => void
  onLoadMore?: () => void
  width?: number | string
  allowClear?: boolean
  min?: number
  max?: number
  showTime?: boolean
  dateFormat?: string
  required?: boolean
  rules?: any[]
  order?: false
  disabledDate?: (currentDate: any) => boolean
  onCalendarChange?: (value: any) => void
  disabled?: boolean | [boolean, boolean]
  picker?: string
  open?: boolean
  toggleTreeOpen?: (e: boolean) => void
  disabledToday?: boolean
  disabledCurrentMonth?: boolean
  unit?: string
  dropdownRender?: any
  onFocus?: any
  customBtnText?: any
  hideDom?: boolean
}

interface SearchProps {
  items: FormItem[]
  loading: boolean
  isVehicleSetting: boolean
  buttons?: React.ReactNode
  handleSearch?: (values: object, page?: number) => void
  handleFormReset?: () => void
  setFormValue?: () => void
  rightContent?: React.ReactNode
  addNewEvent?: () => void
  mainButtonIcon?: string
  mainButtonText?: string
  noTitle?: boolean
  title?: string
  onRef?: (e: any) => void
  style?: any
  mainButtonVisible?: boolean;
  disableSearchByHistory?: boolean
  titleRight?: string
}

interface SearchState {
  isAutoSearch: boolean
}

class Search extends React.Component<SearchProps, SearchState> {
  searchTimer: any = null
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      isAutoSearch: false
    }
  }

  componentDidMount() {
    const { onRef } = this.props
    if (onRef) {
      onRef(this)
    }
  }

  onChange = (formItem: FormItem, e: any) => {
    const value = (e.target && e.target.value) || e
    formItem.onChange && formItem.onChange(formItem.name, value)
  }

  form: any = null

  /**
   * setFieldsValue, 解决设置defaultValue不生效的问题, 通过父组件手动设置某个表单的值,
   * 需要在父组件设置 ref="Search", 比如设置返回时间段
   */
  setFieldsValue = (name: string, val: any) => {
    let value: any = {}
    value[name] = val
    if (this.form) {
      this.form.setFieldsValue(value)
      // this.onValuesChange()
    }
  }

  //获取某个item值
  getFieldValue = (value: any) => {
    if (this.form) {
      return this.form.getFieldValue(value)
    }
  }

  autoSubmit = () => {
    this.form.submit()
  }

  exportData: boolean = false
  exportParams: any = null
  async exportSubmit() {
    this.exportData = true
    this.form.submit()
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve(this.exportParams)
      }, 0)
    })
  }

  componentWillUnmount() {
    this.setState({
      isAutoSearch: false
    })
  }

  autoSearch = () => {
    const { isAutoSearch } = this.state
    if (!isAutoSearch) {
      this.setState({
        isAutoSearch: true
      })
    }
  }

  onFinish = (values: any) => {
    // 公司, 车队, 车辆 条件筛选统一处理, 当其中一个有值时, 其它返回 -1
    if (values.searchType) {
      const { items } = this.props
      let hasCompanyId = false
      let hasGroupId = false
      let hasVehicleId = false
      let hasUserId = false
      items.forEach((item: any) => {
        switch (item.name) {
          case 'companyId':
            hasCompanyId = true
            break
          case 'groupId':
            hasGroupId = true
            break
          case 'vehicleId':
            hasVehicleId = true
            break
          case 'userId':
            hasUserId = true
            break
          default:
            break
        }
      })
      values.companyId = hasCompanyId ? values.companyId || -1 : -1
      values.groupId = hasGroupId ? values.groupId || -1 : -1
      values.vehicleId = hasVehicleId ? values.vehicleId || -1 : -1
      values.userId = hasUserId ? values.userId || -1 : -1
    }

    const { handleSearch } = this.props

    // 提交查询必须有字段且值为空????
    Object.keys(values).forEach((key: string) => {
      if (values[key] === undefined) {
        values[key] = ''
      }
      // 暂时想到的优化-1的效果...
      if (values[key] === '全部' || values[key] === '-1') {
        values[key] = -1
      }
    })

    if (this.exportData) {
      this.exportData = false
      this.exportParams = values
      return values
    }

    if (handleSearch) {
      handleSearch(values)
    }
  }

  render() {
    const { onChange, onFinish } = this
    const {
      items,
      buttons,
      loading,
      rightContent,
      addNewEvent,
      mainButtonText,
      noTitle,
      title,
      isVehicleSetting = false,
      style,
      mainButtonVisible = true,
      titleRight
    } = this.props
    const formItem: React.ReactNode[] = []
    const initialValues: any = {}
    items.forEach((item: FormItem) => {
      let FormItem: any
      switch (item.componentType) {
        case 'Input':
          FormItem = <Input style={{ width: item.width }} disabled={item.disabled as any} placeholder={item.placeholder} />
          break

        case 'Radio':
          FormItem = (
            <Radio.Group disabled={item.disabled as any} value={item.defaultValue} onChange={e => onChange(item, e)} buttonStyle="solid">
              {item.dataList
                ? item.dataList.map(list => (
                  <Radio.Button
                    key={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                    value={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                  >
                    {item.dataLabelKey ? list[item.dataLabelKey] : list.name || list.text}
                  </Radio.Button>
                ))
                : null}
            </Radio.Group>
          )
          break
        case 'RadioNormal':
          FormItem = (
            <Radio.Group disabled={item.disabled as any} onChange={e => onChange(item, e)} buttonStyle="solid">
              {item.dataList
                ? item.dataList.map(list => (
                  <Radio
                    key={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                    value={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                  >
                    {item.dataLabelKey ? list[item.dataLabelKey] : list.name || list.text}
                  </Radio>
                ))
                : null}
            </Radio.Group>
          )
          break
        case 'SelectGroup':
          FormItem = (
            <Select
              disabled={item.disabled as any}
              value={item.defaultValue}
              placeholder={item.placeholder}
              maxTagCount={0}
              allowClear={item.allowClear}
              style={{
                width: item.width || 150,
              }}
              onChange={e => onChange(item, e)}
            >
              {item.dataList
                ? item.dataList.map((group: any, index: number) => (
                  <Select.OptGroup label={group.label} key={index}>
                    {group.list.map((list: any) => (
                      <Select.Option
                        key={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                        value={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                      >
                        {item.dataLabelKey ? list[item.dataLabelKey] : list.label || list.text}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                ))
                : null}
            </Select>
          )
          break
        case 'Select':
          // 查询车辆优化
          // if (item.name === 'vehicleId') {
          //   const options: any = [];
          //   if (item.dataList) {
          //     item.dataList.map((item: any) => (
          //       options.push({
          //         value: item.ID,
          //         label: item.NumberPlate,
          //       })
          //     ))
          //   }
          //   FormItem = (<Select
          //     placeholder="请选择车辆"
          //     optionFilterProp="label"
          //     showSearch={item.showSearch}
          //     allowClear={item.allowClear}
          //     onFocus={item.onFocus || null}
          //     onChange={e => onChange(item, e)}
          //     style={{ width: item.width || 150 }}
          //     disabled={item.disabled as any}
          //     options={options}
          //   />)
          // } else {
            FormItem = (
              <Select
                loading={item.loading}
                disabled={item.disabled as any}
                optionFilterProp="children"
                filterOption={item.filterOption}
                getPopupContainer={e => e}
                mode={item.selectMultiple ? 'multiple' : undefined}
                placeholder={item.placeholder || '请选择'}
                maxTagCount={0}
                showSearch={item.showSearch}
                allowClear={item.allowClear}
                onChange={e => onChange(item, e)}
                onFocus={item.onFocus || null}
                style={{ width: item.width || 150 }}
                dropdownRender={
                  !item.dropdownRender
                    ? (menu: any) => (
                      <div>
                        {menu}
                        {item.onLoadMore ? (
                          <div>
                            <Divider style={{ margin: '4px 0 2px' }} />
                            <div className={styles.searchComponentMore}>
                              <a onClick={item.onLoadMore}>
                                <PlusOutlined /> 加载更多
                              </a>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                    : item.dropdownRender
                }
              >
                {item.dataList
                  ? item.dataList.map(list => (
                    <Select.Option
                      title={item.dataTitleKey ? list[item.dataTitleKey] : list.label || list.text}
                      key={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                      value={item.dataValueKey ? list[item.dataValueKey] : list.value || list.key}
                    >
                      {item.dataLabelKey ? list[item.dataLabelKey] : list.label || list.text}
                    </Select.Option>
                  ))
                  : null}
              </Select>
            )
          // }
          break
        case 'TreeSelect':
          FormItem = (
            <TreeSelect
              style={{ width: item.width || 150 }}
              dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
              treeData={item.dataList}
              placeholder={item.placeholder}
              showSearch={item.showSearch}
              allowClear={item.allowClear}
              onChange={e => onChange(item, e)}
              treeNodeFilterProp="title"
              treeDefaultExpandAll
              treeDataSimpleMode={true}
              getPopupContainer={e => e}
              notFoundContent={null}
              open={item.open}
              onDropdownVisibleChange={e => (item.toggleTreeOpen ? item.toggleTreeOpen(e) : null)}
            />
          )
          break
        case 'DatePicker':
          let datePickerOtherProps: any = {}
          if (item.picker != void 0) {
            datePickerOtherProps['picker'] = item.picker
          } else {
            datePickerOtherProps['showTime'] = item.showTime
          }
          FormItem = (
            <DatePicker
              {...datePickerOtherProps}
              onChange={e => onChange(item, e)}
              // defaultValue={item.defaultValue}
              allowClear={item.allowClear}
              disabledDate={item.disabledDate}
              format={item.dateFormat || dateFormat}
            />
          )
          break
        case 'RangePicker':
          let dayText = '今天'
          let monthText = '本月'
          if (item.customBtnText) {
            dayText = item.customBtnText.day
            monthText = item.customBtnText.month
          }
          let today: any = {
            [dayText]: [dayjs().startOf('day'), dayjs().endOf('day')],
          }
          let month: any = {
            [monthText]: [dayjs().startOf('month'), dayjs().endOf('month')],
          }
          if (item.disabledToday) {
            today = {}
          }
          if (item.disabledCurrentMonth) {
            month = {}
          }
          const ranges = { ...today, ...month }
          FormItem = (
            <DatePicker.RangePicker
              onChange={e => onChange(item, e)}
              // defaultValue={item.defaultValue}
              allowClear={item.allowClear}
              style={{ width: item.showTime ? 350 : 240 }}
              ranges={ranges}
              disabledDate={item.disabledDate}
              onCalendarChange={item.onCalendarChange}
              disabled={item.disabled}
              format={item.dateFormat || item.showTime ? 'YYYY-MM-DD HH:mm:ss' : dateFormat}
              showTime={item.showTime}
            />
          )
          break
        case 'TRangePicker':
          FormItem = (
            <TimePicker.RangePicker
              defaultValue={item.defaultValue}
              allowClear={item.allowClear}
              disabled={item.disabled as any}
              order={item.order}
              format={item.dateFormat || 'HH:mm:ss'}
              style={{ width: item.width ? 'auto' : 240 }}
            />
          )
          break
        case 'Switch':
          FormItem = <Switch disabled={item.disabled as any} checked={item.defaultValue} />
          break
        case 'CheckBox':
          FormItem = item.dataList ? (
            <Checkbox.Group
              onChange={e => onChange(item, e)}
              disabled={item.disabled as any}
              options={item.dataList}
            // defaultValue={item.defaultValue}
            />
          ) : null
          break
        case 'InputNumber':
          FormItem = <InputNumber disabled={item.disabled as any} min={item.min} max={item.max} />
          break
        case 'InputNumbers':
          FormItem = (
            <InputNumber
              disabled={item.disabled as any}
              min={item.min}
              max={item.max}
              formatter={value => `${value}`.replace(/[^\d]/, '')}
            />
          )
          break
        default:
          FormItem = <Input disabled={item.disabled as any} placeholder="Username" allowClear={item.allowClear} />
          break
      }
      // 设置默认值, 可能为0
      if (item.defaultValue || item.defaultValue === 0) {
        if (item.componentType !== 'CheckBox') {
          if (parseInt(item.defaultValue) === -1) {
            item.defaultValue = '全部'
          }
        }
        initialValues[item.name] = item.defaultValue
      }
      if (!item.hidden) {
        let form = (
          <Form.Item style={{ display: item.hideDom ? 'none' : 'block' }} colon={item.colon} label={item.label} name={item.name} required={item.required} rules={item.rules}>
            {FormItem}
          </Form.Item>
        )
        if (item.unit) {
          form = (
            <Form.Item label={item.label}>
              <Form.Item colon={item.colon} name={item.name} required={item.required} rules={item.rules}>
                {FormItem}
              </Form.Item>
              <span className="ant-form-text">{item.unit}</span>
            </Form.Item>
          )
        }
        formItem.push(form)
      }
    })
    return (
      <div className={`${styles.searchContainer} searchContainer`} style={style}>
        {loading ? <div className={styles.disabled}></div> : null}
        <div className={styles.flex}>
          <div>
            <Form
              ref={(e: any) => {
                this.form = e
                if (!this.props.disableSearchByHistory) {
                  this.autoSearch()
                }
              }}
              layout="inline"
              initialValues={{
                ...initialValues,
                isOfflineSend: false,
              }}
              onFinish={onFinish}
            >
              {formItem.map((item: React.ReactNode, index: number) => (
                <span key={index}>{item}</span>
              ))}
              {isVehicleSetting ? (
                <Form.Item valuePropName="checked" name="isOfflineSend">
                  <Checkbox>离线下发</Checkbox>
                </Form.Item>
              ) : (
                <></>
              )}
              <Form.Item className={`${styles.buttons} buttons`}>
                {mainButtonVisible && <Button type="primary" htmlType="submit" loading={loading}>
                  {/* {!loading && mainButtonIcon ? <CommonIcon type={mainButtonIcon || 'search'} /> : null} */}
                  {mainButtonText || '搜索'}
                </Button>}
                {addNewEvent ? (
                  // <Authorized type="add">
                  <Button type="default" onClick={addNewEvent}>
                    {/* <CommonIcon type="plus" /> */}
                    新增
                  </Button>
                ) : // </Authorized>
                  null}
              </Form.Item>
              {buttons ? (buttons instanceof Array ? buttons.map((item: any, index: number) => <span key={index}>{item}</span>) : buttons) : null}
              {/* <Button htmlType="button" onClick={onReset}>
                  重置
                </Button> */}
            </Form>
          </div>
          <div>{rightContent ? rightContent : null}</div>
        </div>
      </div>
    )
  }
}

export default React.forwardRef((props: any, ref: any) => <Search ref={ref} {...props} />)
