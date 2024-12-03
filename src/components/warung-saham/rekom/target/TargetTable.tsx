'use client'
import Column from '@/components/ui/column'
import TextField from '@/components/ui/input/textfield';
import Table from '@/components/table'
import { TargetTableData } from '@/types/Rekom'
import { CheckIcon, MinusIcon, PencilIcon, Trash2Icon, XIcon } from 'lucide-react';
import React from 'react';


interface TargetTableProps {
    targetList: TargetTableData[]
    onSubmitEdit: (index : number , newTarget : TargetTableData) => void
    onRemove : (index : number) => void
}

const TargetTable : React.FC<TargetTableProps> = (props) => {

    const [editModeIndex , setEditModeIndex] = React.useState<number>(-1);
    const [targetFrom, setTargetFrom] = React.useState<string>('');
    const [targetTo, setTargetTo] = React.useState<string>('');
    const [status , setStatus] = React.useState<string>('');
    const [orders,setOrders] = React.useState<string>('');

    const reset = () => {
        setTargetFrom('');
        setTargetTo('');
        setOrders('');
        setStatus('');
    }

    const targetTemplate = (data : TargetTableData , index : number | undefined) => {
        if(editModeIndex === index){
            return (
                <div className='flex justify-center items-center'>
                    <TextField className='w-16 text-center' key={'edit_target_from_' + index} value={targetFrom} onChange={e => setTargetFrom(e.target.value)}/>
                    <MinusIcon/>
                    <TextField className='w-16 text-center' key={'edit_target_to_' + index} value={targetTo} onChange={e => setTargetTo(e.target.value)}/>
                </div>
            )
        }


        return <p>{data.targetFrom} - {data.targetTo}</p>
    }

    const orderTemplate = (data : TargetTableData , index : number | undefined) => {
        if(editModeIndex === index){
            return (
                <>
                    <TextField className='w-12 text-center' type='number' key={'edit_order_' + index} value={orders} onChange={e => setOrders(e.target.value)}/>
                </>
            )
        }


        return <p>{data.orders}</p>
    }

    const statusTemplate = (data : TargetTableData , index : number | undefined) => {
        return <TextField type='checkbox' key={'edit_status_' + index} disabled={index === editModeIndex} checked={data.status === 1} onChange={() => {}}/>
                
    }

    const actionHandler = (action : 'open' | 'close',data : TargetTableData | null,index: number | undefined) => {
        setEditModeIndex(index !== undefined ? index : -1);
        if(action === "open" && data !== null){
            setTargetFrom(data.targetFrom.toString());
            setTargetTo(data.targetTo.toString());
            setOrders(data.orders.toString());
            setStatus(data.status.toString());
        }else{
            setTargetFrom('');
            setTargetTo('');
            setOrders('');
            setEditModeIndex(-1);
        }
    }

    const deleteHandler = (index : number) => {
        props.onRemove(index)
    }

    const editHandler = (data : TargetTableData) => {
        // console.log(data)
        props.onSubmitEdit(editModeIndex,{
            id: data.id,
            targetFrom: Number(targetFrom),
            targetTo: Number(targetTo), 
            status: 0, 
            orders: Number(orders)
        });
        actionHandler('close', null ,editModeIndex)
    }

    const actionTemplate = (data: TargetTableData ,index : number | undefined) =>{
        return (
            <div className='flex justify-center gap-2'>
                {editModeIndex === index ? 
                    <>
                        <CheckIcon onClick={() => editHandler(data)}/>
                        <XIcon onClick={() => actionHandler('close', data,index)} />
                    </>
                    :
                    <>
                        <PencilIcon onClick={() => actionHandler('open', data,index)}/>
                        <Trash2Icon onClick={() => deleteHandler(index === undefined ? -1 : index)}/>
                    </>
                }

            </div>
        )

    }

  return (
    <div>
      <Table<TargetTableData> data={props.targetList} totalData={1} rowId='field_id'>
        <Column body={(_,index = 1) => index+1} header="No" />
        <Column header='Target Range' body={(data,index) => targetTemplate(data,index)}/>
        <Column header='Order' body={(data,index) => orderTemplate(data,index)}/>
        <Column header='Status' body={(data,index) => statusTemplate(data,index)}/>
        <Column header='Action' body={(data,index) => actionTemplate(data,index)}/>
      </Table>
    </div>
  )
}

export default TargetTable
