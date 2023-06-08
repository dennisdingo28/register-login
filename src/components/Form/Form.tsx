import { Input } from '@/types/form'
import { FC } from 'react'

interface FormProps {
    title: string,
    subtitle?: string,
    inputs: Input[]
}

const Form: FC<FormProps> = ({title,subtitle,inputs}) => {
  return <div>
    <h1>{title}</h1>
    <i className={inputs[0].icon}></i>
  </div>
}

export default Form