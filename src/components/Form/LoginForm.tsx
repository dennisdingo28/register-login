"use client"
import { FC } from 'react'
import Form from './Form'
import { Input } from '@/types/form'

interface LoginFormProps {
  
}

const LoginForm: FC<LoginFormProps> = ({}) => {

    function addInputs<Input>(type? : string,placeholder? : string,icon? : string,name?:string){
        return {type:type || "text",placeholder:placeholder || "",icon:icon || "",name:name || ""}
      }
  
      function handleLoginAccount(){
        console.log('test login');
      
      }
      
      const inputs: Input[] = [];
      inputs.push(addInputs("email","email","bi bi-envelope-fill","email"));
      inputs.push(addInputs("password","password","bi bi-shield-lock-fill","password"));

  return <div className='h-full'>
    <Form title='Sign In' buttonTitle='Sign In Now' buttonClickHandler={handleLoginAccount} inputs={inputs}/>
  </div>
}

export default LoginForm