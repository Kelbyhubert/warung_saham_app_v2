'use client'
import React from 'react'
import Column, { ColumnProps } from '../column'
import {BaseTableData} from '../../../types/base/BaseTableData'


type ColumnType = React.ReactElement<typeof Column>;

interface TableProps<T extends BaseTableData> {
    children: ColumnType | ColumnType[]
    data: T[] | any[]
    totalData: number
    rowId?:string
}

const Table = <T extends BaseTableData>({children,data,totalData,rowId = 'id'}: TableProps<T>) : React.ReactNode => {

  const childrenArray = React.Children.toArray(children) as ColumnType[];

  const columnLength = Math.floor(100/ childrenArray.length);

  const renderHeader = () : React.ReactNode => {
    return childrenArray.map(child => {
        const props = child.props as unknown as ColumnProps
        return (
          <th style={{width: `${columnLength}%`}} className={` text-white`} key={props.header}>{props.header}</th>
        )
      }
    )
  }

  const renderBody = () : React.ReactNode => {

    return data.map((value,index) => (
      <tr key={value[rowId]} className='border-b border-primary-400'>
        {renderColumn(value,index)}
      </tr>
    ))
  }

  const renderColumn = (value: T,index : number) : React.ReactNode => {
    return childrenArray.map((child) => {
      const {body,field,header} = child.props as unknown as ColumnProps
      const renderedData : React.ReactNode | string = body ? body(value,index) : field ? value[field as keyof T] as string ?? '-' : '-';
      return (
        <td key={`${header} - ${value.id}`} className='text-center'>{renderedData}</td>
      )
    }
  )
  }

  return (
    <div className='overflow-x-auto h-96 border border-primary-400 scrollbar-thin'>
      <table className='border-collapse min-w-full table-fixed'>
          <thead className='sticky top-0 z-10'>
            <tr className='bg-primary-400 h-12'>
              {renderHeader()}
            </tr>
          </thead>
          <tbody>
            {renderBody()}
          </tbody>
      </table>
    </div>

  )
}

export default Table;
