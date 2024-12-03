'use client'
import React from 'react'

interface DateInputProps {
    type? : 'single' | 'range'
    label : string
    dateValue: string
    endDateValue?: string
    onChangeDateValue: (value : any) => void
    onChangeEndDateValue?: (value : any) => void

}

const DateInput : React.FC<DateInputProps> = (
    {
        type = 'single',
        label,
        dateValue,
        endDateValue,
        onChangeDateValue,
        onChangeEndDateValue
    }
) => {
  // Handle the change in date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(endDateValue !== undefined && onChangeEndDateValue !== undefined ){
        if(new Date(e.target.value) > new Date(endDateValue)){
            onChangeEndDateValue(e.target.value);
        }
    }
    onChangeDateValue(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(onChangeEndDateValue !== undefined){
        if((new Date(e.target.value) < new Date(dateValue)) || dateValue === ''){
            onChangeDateValue(e.target.value);
        }

        onChangeEndDateValue(e.target.value);
    }
  };
  

  return (
    <div className="flex flex-col">
        <label htmlFor="">{label}</label>
        <div className='flex justify-between'>
            <div className="flex flex-col">
                {type === 'range' &&  <label className='text-xs' htmlFor="">Start</label> }
                <input
                    type="date"
                    value={dateValue}
                    onChange={handleDateChange}
                    className="px-4 py-2 border rounded-md border-primary-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
                />
            </div>
        {type === 'range' && 
            <div className="flex flex-col">
                <label className='text-xs' htmlFor="">End</label>
                <input
                    type="date"
                    value={endDateValue}
                    onChange={handleEndDateChange}
                    className="px-4 py-2 border border-primary-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
                />
            </div>
        }   
        </div>
    </div>
  );
}

export default DateInput
