"use client"
import { FC, useState } from 'react'
import Form from './Form'
import { FormState, Input } from '@/types/form'
import axios from 'axios'

interface LoginFormProps {
  
}

const LoginForm: FC<LoginFormProps> = ({}) => {
    const [loginErrorMessage,setLoginErrorMessage] = useState<string>("");
    function addInputs<Input>(type? : string,placeholder? : string,icon? : string,name?:string){
        return {type:type || "text",placeholder:placeholder || "",icon:icon || "",name:name || ""}
      }
  
      async function handleLoginAccount(formStates:FormState){
        try{
          console.log(formStates);
          
          const res = await axios.post(`/api/user/find`,{formStates});
          console.log(res);
          if(res.data.ok){
            localStorage.setItem('sessionToken',res.data.token);
            window.location.reload();
          }else{
            setLoginErrorMessage(res.data.message);
          }
          
        }catch(err){
          setLoginErrorMessage("Something went wrong while trying fetch your account.Please try again later!");

          console.log(err);
          
        }
      
      }
      
      const inputs: Input[] = [];
      inputs.push(addInputs("email","email","bi bi-envelope-fill","email"));
      inputs.push(addInputs("password","password","bi bi-shield-lock-fill","password"));

  return <div className='h-full'>
    <Form title='Sign In' buttonTitle='Sign In Now' buttonClickHandler={handleLoginAccount} inputs={inputs} errorMessage={loginErrorMessage} setErrorMessage={setLoginErrorMessage}/>
  </div>
}

export default LoginForm