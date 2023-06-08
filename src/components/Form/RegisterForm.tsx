"use client"
import { FC, useState, MouseEvent } from 'react'
import Form from './Form'
import { Input} from '@/types/form'


interface RegisterFormProps {
  
}

const RegisterForm: FC<RegisterFormProps> = ({}) => {
    function addInputs<Input>(type? : string,placeholder? : string,icon? : string,name?:string){
      return {type:type || "text",placeholder:placeholder || "",icon:icon || "",name:name || ""}
    }

    function handleCreateAccount(){
      console.log('test');
    
    }
    
    const inputs: Input[] = [];
    inputs.push(addInputs("text","username","bi bi-person-fill","username"));
    inputs.push(addInputs("email","email","bi bi-envelope-fill","email"));
    inputs.push(addInputs("password","password","bi bi-shield-lock-fill","password"));
  

  return (
    <div className='h-full'>
      <Form title='Create an account' subtitle='authenticate and fly' buttonTitle='Create My Account' buttonClickHandler={handleCreateAccount} inputs={inputs}/>
    </div>
  )
}

export default RegisterForm