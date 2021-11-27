import React from 'react';
import { Table } from 'antd';
import Pagination, { PaginationProps } from '@/components/Pagination';
import { debouncing } from '@/utils/commonUtils';

import styles from './style.less';
interface TableListState {
  maxHeight: number | undefined;
  rowId: number;
}

export interface TableColums {
  title: string;
  dataIndex?: string;
  key?: string;
  width?: number;
  render?: any;
  ellipsis?: boolean;
  [name: string]: any;
  visible?: any;
}

/**
 * @TableProps 表格部分参数说明
 * @param {onTableChange} 排序、筛选变化时触发, 回调参数有4个, 但分页, pagination 拿不到, 因为没用 Table 集成的
 * @param {pagination} 是否显示分页, 默认为 true
 * @param {rowKey} 数据的key, 比如 ID 之类, 不指定则为当前数据的索引, 当用到 onRow 等回调时最好设置一个
 * @param {showOrderNumber} 是否显示排序, 默认为 false
 * @param {scrollHeight} 限制滚动高度, 尽量获取当前表格能显示的最大高度(包括表头和分页), 用下面 setMaxHeight 的计算方法
 * @param {scrollWidth} 设置滚动宽度
 * @param {onRowClick} 单击行回调事件,回调参数为当前行的数据, 需要设置 rowKey
 * @param {activeRowKey} 选中行的key
 * @param {selectedRowKeys} 默认选中行, 如果设置了此项, 则需要在 rowSelection 回调中重新设置, 不然选中没效果
 * @param {rowSelectionType} 选中的类型, 'checkbox' | 'radio', 默认为checkbox
 * @param {onRowSelection} 选中行回调, 注意和 onRowClick 区分
 * @param {rowSelectionType} 选中的类型, 'checkbox' | 'radio', 默认为checkbox
 * @param {onRowSelection} 选中行回调, 注意和 onRowClick 区分
 */
interface TableProps extends Partial<PaginationProps> {
  data: any[];
  columns: TableColums[];
  loading: boolean;
  onChange?: (page: number, pageSize?: number) => void | undefined;
  onTableChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  rowKey?: string;
  showOrderNumber?: boolean;
  scrollHeight?: number;
  scrollWidth?: number;
  onRowClick?: (record: any) => void;
  activeRowKey?: number;
  selectedRowKeys?: any[];
  rowSelectionType?: string;
  noCheckAll?: boolean; //是否需要全选按钮，加上无全选
  onRowSelection?: (selectedRowKeys: any[], selectedRows: any) => void;
  pagination?: boolean;
  disableSetTrHeight?: boolean;
  className?: any;
  isNumberFlex?: boolean;
  trHeight?: number | undefined;
  expandable?: any;
  orderTitle?: string;
  //双击弹窗控制
  setEditId?: (id: number) => void;
  showEditModal?: () => void;
  style?: any; //自定义外层样式
  color?: string;
  pageSizeOptions?: string[];
  size?: 'small' | 'large' | 'middle';
}

class TableList extends React.Component<TableProps, TableListState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      maxHeight: undefined,
      rowId: -1,
    };
  }

  onRowSelect = (selectedRowKeys: any[], selectedRows: any[]) => {
    const { onRowSelection } = this.props;
    onRowSelection && onRowSelection(selectedRowKeys, selectedRows);
  };

  componentDidMount() {
    this.setMaxHeight();
    window.addEventListener('resize', debouncing(this.setMaxHeight, 500), false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debouncing(this.setMaxHeight, 500));
  }

  componentWillReceiveProps(nextProps: Readonly<TableProps>, nextContext: any): void {
    const { scrollHeight } = nextProps;
    const { maxHeight } = this.state;
    if (this.calculateMaxHeight(scrollHeight) !== maxHeight) {
      this.setState({
        maxHeight: this.calculateMaxHeight(scrollHeight),
      });
    }
  }

  setMaxHeight = () => {
    const maxHeight = this.calculateMaxHeight();
    this.setState({
      maxHeight,
    });
  };

  calculateMaxHeight = (_scrollHeight?: number) => {
    const scrollHeight = _scrollHeight ?? this.props.scrollHeight;
    const { pagination = true } = this.props;
    const windowHeight = window.innerHeight;
    const bottomHeight = pagination ? 75 : 30;
    const tableWrapper = this.refs.tableWrapper as HTMLDivElement;
    let offsetTop: number = 0;
    let theadHeight: number = 0;
    if (tableWrapper && tableWrapper.getBoundingClientRect && tableWrapper.getElementsByTagName) {
      offsetTop = tableWrapper.getBoundingClientRect().y;
      theadHeight = tableWrapper.getElementsByTagName('thead')[0].offsetHeight;
    }
    if (theadHeight == 0) {
      theadHeight = 52;
    }
    return scrollHeight
      ? scrollHeight - theadHeight - bottomHeight
      : windowHeight - offsetTop - theadHeight - bottomHeight;
  };

  setClassName = (record: any) => {
    const { activeRowKey, rowKey } = this.props;
    if (activeRowKey) {
      const key = rowKey ? rowKey : 'ID';
      return record[key] === activeRowKey ? `row-active` : null;
    }
    if (record.id) {
      const { rowId } = this.state;
      if (rowId != -1 && activeRowKey) {
        return record.id === this.state.rowId ? 'row-active' : null;
      }
      return null;
    }
    return null;
  };

  onRow = (record: any) => {
    return {
      onClick: (e: any) => {
        const forbidTag = ['A', 'BUTTON', 'INPUT']; // 点击这些元素的时候不进行操作
        if (forbidTag.includes(e.target.tagName)) return;
        const { onRowClick, data, rowKey = 'ID' } = this.props;
        this.setState({
          rowId: record[rowKey],
        });
        this.props.setEditId && this.props.setEditId(record[rowKey]);
        if (onRowClick) {
          for (let i = 0; i < data.length; i++) {
            if (data[i][rowKey] === record[rowKey]) {
              onRowClick(record);
              break;
            }
          }
        }
      },
      onDoubleClick: (e: any) => {
        this.props.showEditModal && this.props.showEditModal();
      },
    };
  };

  setTrHeight = () => {
    const { disableSetTrHeight, trHeight } = this.props;
    if (disableSetTrHeight) return;
    setTimeout(() => {
      const table: any = this.refs.tableWrapper;
      if (!table) return;
      const tr = table.getElementsByClassName('ant-table-row');
      const len = tr.length;
      if (trHeight) {
        for (let i = 0; i < len; i++) {
          tr[i].style.height = `${trHeight}px`;
        }
      } else {
        for (let i = 0; i < len; i++) {
          tr[i].style.height = `auto`;
        }
      }
    }, 0);
  };

  handlePageChange = (page: number, pageSize?: number) => {
    const { onChange } = this.props;
    onChange && onChange(page, pageSize);
  };

  // 延迟修改, 解决初次进入页面时 page 为 1 造成的错误
  setPageTimer: any = null;
  setDefaultPage = (page: number | undefined, pageSize: number | undefined) => {
    clearTimeout(this.setPageTimer);
  };

  render() {
    let {
      data,
      columns,
      loading,
      rowKey,
      showOrderNumber,
      currentPage,
      pageSize,
      totalCount,
      onTableChange,
      onRowSelection,
      rowSelectionType,
      noCheckAll,
      selectedRowKeys,
      pagination = true,
      simplePagination,
      paginationAlign,
      scrollWidth,
      className,
      isNumberFlex,
      expandable,
      orderTitle,
      style,
      color,
      pageSizeOptions,
      size,
    } = this.props;
    this.setDefaultPage(currentPage, pageSize);

    // 设置序号字段
    if (showOrderNumber && columns[0].key !== 'orderNum') {
      let numberColumn: any = {
        title: orderTitle || '序号',
        dataIndex: 'orderNum',
        key: 'orderNum',
        width: 60,
      };
      if (isNumberFlex) numberColumn.fixed = 'left';
      columns.unshift(numberColumn);
    }

    columns.forEach((item: any) => {
      item.ellipsis = true;
    });

    if (!Array.isArray(data)) {
      data = [];
    }
    // 全局添加自动省略字段
    (data || []).forEach((item: any, index: number) => {
      // 设置序号
      if (pageSize && currentPage) {
        if (showOrderNumber) {
          // 不显示序号(一般用于最后一行平均值, 需要在传入数据时设置)
          if (item.disableShowMainOrder) return;
          item.orderNum = index + 1 + pageSize * (currentPage - 1);
        }
      }
    });
    const rowSelectionProps: any = {};
    if (onRowSelection) {
      !noCheckAll
        ? (rowSelectionProps.rowSelection = {
            type: rowSelectionType || 'checkbox',
            selectedRowKeys,
            onChange: this.onRowSelect,
            //禁用点击项目:比如某项属性是item.disabled=true，该选项不能被点击
            getCheckboxProps: (item: any) => ({ disabled: item.disabled }),
          })
        : (rowSelectionProps.rowSelection = {
            type: rowSelectionType || 'checkbox',
            selectedRowKeys,
            columnTitle: ' ',
            onChange: this.onRowSelect,
            //禁用点击项目:比如某项属性是item.disabled=true，该选项不能被点击
            getCheckboxProps: (item: any) => ({ disabled: item.disabled }),
          });
    }
    this.setTrHeight();

    return (
      <div
        className={`${!expandable ? styles.tableWrapper : styles.expandTableWrapper} tableWrapper`}
        data-color={color}
        style={style}
      >
        <div data-color className={`${styles.content} tableContent`}>
          <div className={`${styles.tableContainer} tableContainer`} ref="tableWrapper">
            <div className={`${styles.table_wrapper_expend} table_wrapper_expand`}>
              <Table
                expandable={expandable || null}
                className={className}
                dataSource={data || []}
                loading={loading}
                rowKey={rowKey || columns[0].dataIndex}
                columns={columns || []}
                onChange={onTableChange}
                onRow={this.onRow}
                bordered
                size={size ? size : 'middle'}
                rowClassName={this.setClassName}
                pagination={false}
                {...rowSelectionProps}
              />
            </div>
          </div>
          {pagination ? (
            <div id="paginationContainer">
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount || 0}
                pageSize={pageSize}
                onChange={this.handlePageChange}
                disabled={loading}
                simplePagination={simplePagination}
                // onShowSizeChange={this.handlePageChange}
                paginationAlign={paginationAlign}
                pageSizeOptions={pageSizeOptions}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TableList;
