"use client"
import { FC, useState, MouseEvent } from 'react'
import Form from './Form'
import { Input} from '@/types/form'
import axios from 'axios'
import { FormState } from '@/types/form'

const RegisterForm: FC = () => {
  const [registerErrorMessage,setRegisterErrorMessage] = useState<string>("");

    function addInputs<Input>(type? : string,placeholder? : string,icon? : string,name?:string){
      return {type:type || "text",placeholder:placeholder || "",icon:icon || "",name:name || ""}
    }

    async function handleCreateAccount(formStates:FormState){
      try{
        const res = await axios.post('/api/user/createUser',formStates);
        const data = res.data;
        if(data.ok){
          localStorage.setItem('sessionToken',data.token);
          window.location.reload();
        }else{
          setRegisterErrorMessage(data.message);
        }

        
      }catch(err){
        setRegisterErrorMessage("Cannot create your account.Please try again later!");
        console.log(err);
      }
    }
    
    const inputs: Input[] = [];
    inputs.push(addInputs("text","username","bi bi-person-fill","username"));
    inputs.push(addInputs("email","email","bi bi-envelope-fill","email"));
    inputs.push(addInputs("password","password","bi bi-shield-lock-fill","password"));
  

  return (
    <div className='h-full'>
      <Form title='Create an account' subtitle='authenticate and fly' buttonTitle='Create My Account' buttonClickHandler={handleCreateAccount} inputs={inputs} errorMessage={registerErrorMessage} setErrorMessage={setRegisterErrorMessage}/>
    </div>
  )
}

export default RegisterForm