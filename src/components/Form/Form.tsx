import { Input} from '@/types/form'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { MouseEvent } from 'react'
import Image from 'next/image'
import GoogleLogo from "../../assets/google.png"

interface FormProps {
    title: string,
    subtitle?: string,
    inputs: Input[],
    buttonTitle?: string,
    buttonClickHandler?: ()=>void,
}
interface FormState {
  [key:string]: {
    value: string,
    error:boolean
  },
}

const Form: FC<FormProps> = ({title,subtitle,inputs,buttonTitle,buttonClickHandler}) => {

  const [formState,setFormState] = useState<FormState>({});

  function isEmail(email:string) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  function validateInputs():boolean {
    
    if(!formState || Object.keys(formState).length===0)
      return false;
    
    const formStateKeys = Object.keys(formState);
    console.log(formStateKeys,formState);
    
    for(let i : number=0;i<formStateKeys.length;i++){
      const currentInput = formState[formStateKeys[i]].value;

      if(currentInput.trim()===''){
        return false;
      }else if(formStateKeys[i]==="email"){
        if(!isEmail(currentInput))
          return false;
      }
    }
      
      return true;
  }
  
  async function handleButtonClick(e:MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    if(validateInputs()){
      if(buttonTitle && buttonClickHandler)
        buttonClickHandler();
    }
  }

  return (
    <div className='bg-gray-200 w-full py-1 px-2 h-full lg:px-6'>
      <div className='header'>
        <h1 className='text-[1.7em] font-semibold'>{title}</h1>
        <h3 className='text-gray-500'>{subtitle}</h3>
      </div>
      <div className='flex flex-col gap-3 mt-3'>
        {inputs.map((input,index)=>{
          
          return (
            <div key={index} className='flex'>
              <div className='bg-slate-400 rounded-l-md p-1 flex items-center justify-center'>
                <i className={input.icon}></i>
              </div>
              <div className='flex-1'>
                <input type={input.type || "text"} value={formState[input.name]?.value || ""}  onChange={(e)=>setFormState(prev=> ({...prev,[input.name]:{value:e.target.value,error:false}}))} className={`w-full outline-none py-[2px] px-1 h-full focus:shadow-[0.4px_0px_4px_0px_#5b15b0] duration-100 bg-transparent border-y-2 border-r-2 border-gray-300 rounded-r-md`} placeholder={input.placeholder}/>
              </div>
            </div>
          )
        })}
        <button onClick={handleButtonClick} className='bg-[#68a5e4] duration-75 border border-[#68a5e4] text-white py-2 hover:bg-transparent hover:text-[#68a5e4] active:bg-[#68a5e4] active:text-white'>{buttonTitle}</button>
      </div>
      <p className='text-center my-2'>or</p>
      <div className='signInProviders'>
          <button className='bg-white flex items-center justify-center gap-3 w-full max-w-[250px] py-1 mx-auto rounded-sm'>
            <Image src={GoogleLogo} width={20} height={20} alt='google logo'/>
            Sign in with Google
          </button>
      </div>
    </div>
  )
}

export default Form