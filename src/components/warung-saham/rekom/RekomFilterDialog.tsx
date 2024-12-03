'use client'

import { Dialog } from '@/components/ui/dialog';
import DialogAction from '@/components/ui/dialog/action';
import DialogContent from '@/components/ui/dialog/content';
import DialogHeader from '@/components/ui/dialog/header';
import DateInput from '@/components/ui/input/date';
import TextField from '@/components/ui/input/textfield';
import { useSearchParams, usePathname,useRouter } from 'next/navigation';
import React from 'react'

const RekomFilterDialog = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [startDate,setStartDate] = React.useState<string>('');
    const [endDate,setEndDate] = React.useState<string>('');

    const codeInputRef = React.useRef<HTMLInputElement>(null);

    function onCloseHandler() {
        const params = new URLSearchParams(searchParams);
        params.delete('filterModal');
        router.replace(`${pathname}?${params.toString()}`)
    }

    function submitHandler() {
        const params = new URLSearchParams(searchParams);
        if(codeInputRef.current?.value !== ''){
            params.set('stockcode',codeInputRef.current?.value || '');
        }else{
            params.delete('stockcode');
        }

        if(startDate !== ''){
            params.set('startdate',startDate);
        }else{
            params.delete('startdate');
        }

        if(endDate !== ''){
            params.set('enddate',endDate);
        }else{
            params.delete('enddate');
        }

        params.delete('filterModal');
        router.replace(`${pathname}?${params.toString()}`)

    }


  return (
    <Dialog onClose={onCloseHandler}>
        <DialogHeader closeHandler={onCloseHandler}>
            <p>Rekom Filter</p>
        </DialogHeader>
        <DialogContent>
            <TextField 
                label='Code'
                ref={codeInputRef}
            />
            <DateInput
                type='range'
                label='Date Range'
                dateValue={startDate}
                endDateValue={endDate}
                onChangeDateValue={setStartDate}
                onChangeEndDateValue={setEndDate}
            />
        </DialogContent>
        <DialogAction>
            <button onClick={submitHandler} className='w-full p-1 m-1 border text-white bg-primary-400 border-primary-400 rounded-md'>Confirm</button>
            <button onClick={onCloseHandler} className='w-full p-1 m-1 border border-primary-400 rounded-md'>Cancel</button>
        </DialogAction>
    </Dialog>
  )
}

export default RekomFilterDialog
