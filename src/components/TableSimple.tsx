import React from 'react'
import './TableSimple.sass'

interface TableSimpleProps {
  dataSource: Array<{ [key: string]: React.ReactNode }>
  columns: Array<{ dataIndex: string; key: string }>
}

const TableSimple: React.FC<TableSimpleProps> = ({ dataSource, columns }) => {
  return (
    <table className="table-simple">
      <tbody>
        {dataSource.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(col => (
              <td key={col.key}>{row[col.dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableSimple
