'use client'
import TextArea from '@/components/common/input/textarea'
import TextField from '@/components/common/input/textfield'
import { RekomDetails, TargetTableData } from '@/types/Rekom'
import { Minus } from 'lucide-react'
import React from 'react'
import TargetTable from './target/TargetTable'
import AddTargetForm from './target/AddTargetForm'
import { Button } from '@/components/common/button'
import AutoComplete from '@/components/common/autocomplete'
import useFetchStockList from '@/components/warung-saham/stock/hooks/useFetchStockList'
import { useDebounce } from '@/hooks/debounce/useDebounce'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import useFetchRekomDetails from '@/components/warung-saham/rekom/hooks/useFetchRekomDetails'
import { zodResolver } from '@hookform/resolvers/zod'
import { RekomFormData, RekomFormSchema } from '@/types/form/rekom'

interface RekomFormProps {
    id?: string
}

const RekomForm : React.FC<RekomFormProps> = ({id = ''}) => {

  //still need research about server fetch and component fetch
  const {rekomDetails} = useFetchRekomDetails({id});

  const {
    control,
    register, 
    reset, 
    trigger,
    formState : {errors},
    handleSubmit
  } = useForm<RekomFormData>({
    defaultValues : {
      stock : undefined,
      entryFrom: 0,
      entryTo :  0,
      stopLoss : 0,
      description : '',
      target : [],
    },
    resolver : zodResolver(RekomFormSchema),
    mode: 'onChange'
  });

  const {fields,append,update, remove} = useFieldArray({
    control,
    name: 'target',
    keyName : 'field_id'
  })

  //state for autocomplete
  const [autoCompleteInput, setAutoCompleteInput] = React.useState<string>('');
  const delayAutoCompleteInput = useDebounce(autoCompleteInput,400);
  const stockList = useFetchStockList(delayAutoCompleteInput);

  const [openTargetForm,setOpenTargetForm] = React.useState<boolean>(false);

  const removeTargetHandler = (targetIndex : number) => {
    remove(targetIndex);
  }

  const addTargetHandler = (targetFrom : string | undefined , targetTo : string | undefined) => {
    append({
      id: 0,
      orders: fields.length + 1,
      status: 0,
      targetFrom: Number(targetFrom),
       targetTo: Number(targetTo)
    });
  }

  const editTargetHandler = (targetIndex : number , newTarget : TargetTableData) => {
    update(targetIndex,newTarget)
  }

  React.useEffect(() => {
    if(rekomDetails){
      reset({
        stock : rekomDetails?.stock || undefined,
        entryFrom: rekomDetails?.entryFrom || 0,
        entryTo : rekomDetails?.entryTo || 0,
        stopLoss : rekomDetails?.stopLoss || 0,
        description : rekomDetails?.description || '',
        target : rekomDetails?.target || [],
      });
    }
    
  },[rekomDetails,reset]);

  const transformStringToInt = (v : any) => {
    if(v === ""){
      return undefined;
    }

    return Number(v);
  }

  return (
    <>
      <div>
          <Controller
            name='stock'
            control={control}
            render={({field})=> (
              <AutoComplete 
                label='Stock'
                className='w-1/2'
                selectValue={field.value || null}
                onSelect={field.onChange} 
                options={stockList} 
                getOptionLabel={(e) => e.stockCode}
                onInputChange={(newValue) => setAutoCompleteInput(newValue)}
              />
              )}
          />
          <span className='text-error-500 text-xs'>{(errors.stock) && <p>{errors.stock.message}</p>}</span>

          <div>
            <label>Entry</label>
            <div className='flex items-center w-1/2'>
              <TextField {...register('entryFrom',{setValueAs: transformStringToInt})} name='entryFrom' id='entryFrom' key='entryFrom' placeholder='From' type='number' inputMode='numeric'/>
              <Minus/>
              <TextField {...register('entryTo',{setValueAs: transformStringToInt})} name='entryTo' id='entryTo' key='entryTo' placeholder='To' type='number' inputMode='numeric'/>
            </div>
            <span className='text-error-500 text-xs'>{(errors.entryFrom || errors.entryTo) && <p>{errors.entryFrom?.message || errors.entryTo?.message}</p>}</span>
          </div>

          <TextField {...register('stopLoss',{valueAsNumber : true})} label='Stop Loss' key='stop-loss' type='number' className='w-1/2'/>
          <span>{(errors.stopLoss) && <p>{errors.stopLoss.message}</p>}</span>

          <TextArea label='Description' key='desc' rows={5} className='w-1/2' />
          <span>{(errors.description) && <p>{errors.description.message}</p>}</span>

          <div className='min-h-64'>
            <label>Target</label>
            <div>
              <button className='w-32 p-1 my-2 border text-white bg-primary-400 border-primary-400 rounded-md disabled:opacity-40' onClick={() => setOpenTargetForm(true)} disabled={fields.length >= 5}>Add Target</button>
              <TargetTable targetList={fields} onSubmitEdit={editTargetHandler} onRemove={removeTargetHandler}/>
            </div>
          </div>
          <div className='flex p-2 justify-end items-end gap-2'>
            <Button variant='outline' size='lg'>Back</Button>
            <Button size='lg'>Submit</Button>
          </div>
      </div>

      {openTargetForm && <AddTargetForm onClose={() => setOpenTargetForm(false)} onSubmit={addTargetHandler}/>}
    </>
  )
}

export default RekomForm
