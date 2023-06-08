import { FC } from 'react'
import Form from './Form'
import { Input } from '@/types/form'

interface RegisterFormProps {
  
}

function addInputs<Input>(type? : string,placeholder? : string,icon? : string){
    return {type:type || "text",placeholder:placeholder || "",icon:icon || ""}
}

const RegisterForm: FC<RegisterFormProps> = ({}) => {
    const inputs: Input[] = [];

    inputs.push(addInputs("text","username","bi bi-person-fill"));
    inputs.push(addInputs("email","email","bi bi-envelope-at-fill"));
    inputs.push(addInputs("password","password","bi bi-shield-lock-fill"));

  return (
    <Form title='Create an account' inputs={inputs}/>
  )
}

export default RegisterForm