import { Pagination } from 'antd'

/**
 * @PaginationProps 分页部分参数说明
 * @param {simplePagination} 是否为简单分页
 * @param {paginationAlign} 分页对齐方式
 */
export interface PaginationProps {
  totalCount: number | undefined
  currentPage: number | undefined
  onChange?: (page: number, pageSize?: number) => void | undefined
  onShowSizeChange?: (page: number, pageSize?: number) => void
  pageSize: number | undefined
  pageSizeOptions?: any[]
  disabled?: boolean
  simplePagination?: boolean
  paginationAlign?: 'left' | 'center' | 'right' | undefined
}

const showTotal = (totalCount: number | undefined) => {
  if (!totalCount) return
  return `共 ${totalCount} 条数据`
}

const PaginationComponent = (props: PaginationProps) => {
  const {
    totalCount,
    currentPage,
    onChange,
    onShowSizeChange,
    pageSize,
    pageSizeOptions,
    disabled,
    simplePagination = false,
    paginationAlign,
  } = props
  const textAlign = paginationAlign ? paginationAlign : 'right'
  return (
    <div className="paginationContainer" style={{ textAlign, paddingTop: 20 }}>
      <Pagination
        simple={simplePagination}
        showQuickJumper
        showSizeChanger
        current={currentPage}
        total={totalCount === 0 ? 1 : totalCount}
        showTotal={() => showTotal(totalCount)}
        onChange={onChange}
        disabled={disabled}
        pageSize={pageSize || 10}
        pageSizeOptions={pageSizeOptions || ['10', '20', '30', '40']}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  )
}

export default PaginationComponent
