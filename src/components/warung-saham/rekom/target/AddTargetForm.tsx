import { Dialog } from '@/components/ui/dialog'
import DialogAction from '@/components/ui/dialog/action'
import DialogContent from '@/components/ui/dialog/content'
import DialogHeader from '@/components/ui/dialog/header'
import TextField from '@/components/ui/input/textfield'
import React from 'react'


interface AddTargetFormProps {
    onClose : () => void
    onSubmit : (targetFrom : string | undefined , targetTo : string | undefined) => void
}

const AddTargetForm : React.FC<AddTargetFormProps> = (props) => {

    const targetFromInputRef = React.useRef<HTMLInputElement>(null);
    const targetToInputRef = React.useRef<HTMLInputElement>(null);
    const orderInputRef = React.useRef<HTMLInputElement>(null);

    const onCloseHandler = () => {
        props.onClose();
    }

    const validateNewTarget = () => {
        
    }

    const submitHandler = () => {
        props.onSubmit(targetFromInputRef.current?.value , targetToInputRef.current?.value);
        props.onClose();
    }

  return (
    <Dialog onClose={onCloseHandler}>
        <DialogHeader closeHandler={onCloseHandler}>
            <p>Add Target</p>
        </DialogHeader>
        <DialogContent>
            <TextField 
                label='Target From'
                ref={targetFromInputRef}
                type='number'
            />
                        <TextField 
                label='Target To'
                ref={targetToInputRef}
                type='number'
            />
                <TextField 
                label='Order'
                ref={orderInputRef}
                type='number'
            />
        </DialogContent>
        <DialogAction>
            <button onClick={onCloseHandler} className='w-full p-1 m-1 border border-primary-400 rounded-md'>Cancel</button>
            <button onClick={submitHandler} className='w-full p-1 m-1 border text-white bg-primary-400 border-primary-400 rounded-md'>Confirm</button>
        </DialogAction>
    </Dialog>
  )
}

export default AddTargetForm
