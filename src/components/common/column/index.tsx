import React from 'react'

export interface ColumnProps{
    header: string | undefined
    field?: string | undefined
    body? : (value: any , index?: number) => React.ReactNode | undefined
}

const Column : React.FC<ColumnProps> = ({field,body,header}) : React.ReactNode => {
  return (<></>)
}

export default Column
