"use client"

import { Input} from '@/types/form'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { MouseEvent } from 'react'
import Image from 'next/image'
import GoogleLogo from "../../assets/google.png"
import {signIn, signOut} from "next-auth/react"
import { FormState } from '@/types/form'
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser'
import Loading from '../Loading'
import SignOut from '@/lib/SignOut'
import { useRouter } from 'next/navigation'

interface FormProps {
    title: string,
    subtitle?: string,
    inputs: Input[],
    errorMessage?: string,
    setErrorMessage?: Dispatch<SetStateAction<string>>
    buttonTitle?: string,
    buttonClickHandler?: (formStates:FormState)=>void,
}

const Form: FC<FormProps> = ({title,subtitle,inputs,errorMessage,setErrorMessage,buttonTitle,buttonClickHandler}) => {
  const router = useRouter();
  const [authenticatedUserLoading,setAuthenticatedUserLoading] = useState<boolean | null>(false);
  const [disabledButton,setDisabledButton] = useState<boolean>(false);

  const user = useAuthenticatedUser({authenticatedUserLoading,setAuthenticatedUserLoading});
  console.log(user);
  
  const [formState,setFormState] = useState<FormState>({});
  const [submitted,setSubmitted] = useState<boolean>(false);
  
  function isEmail(email:string) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
  function clearInputs(){
    setFormState({});
    setSubmitted(false);
    setDisabledButton(false);
    if(setErrorMessage)
      setErrorMessage("");
  }
  function validateInputs():boolean {
    const formStateKeys = Object.keys(formState);

    if(!formState || Object.keys(formState).length===0)
    {
      inputs.map(input=>{
        return setFormState(prev=>{
          return {...prev,[input.name]:{value:"",error:true}}
        })
      });
      return false;
    }
    
  
      for(let i : number=0;i<formStateKeys.length;i++){
        const currentInput = formState[formStateKeys[i]].value;

        if(currentInput.trim()===''){
          setFormState(prev=>({...prev,[formStateKeys[i]]:{value:currentInput,error:true}}))
          return false;
          
        }else if(formStateKeys[i]==="email"){
          if(!isEmail(currentInput)){
            setFormState(prev=>({...prev,[formStateKeys[i]]:{value:currentInput,error:true}}))
            return false;
          }
        
        }
      }

      if(formStateKeys.length!==inputs.length)
      {
        for(let i:number = 0;i<inputs.length;i++){
          let found:boolean = false;
          for(let j:number = 0;j<formStateKeys.length && !found;j++){
            if(inputs[i].name===formStateKeys[j])
              found=true;
          }
          if(!found)
            setFormState(prev=>({...prev,[inputs[i].name]:{value:"",error:true}}))
        }
        return false;
      }

    return true;
  }
  
  async function handleButtonClick(e:MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    setDisabledButton(true);
    if(validateInputs()){
      
      if(buttonTitle && buttonClickHandler){
        
        setSubmitted(true);
        buttonClickHandler(formState);
      }
    }
    setTimeout(()=>{
      clearInputs();
    },3400)
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
            <div key={index} className={`flex border-2 rounded-md ${formState[input.name]?.error ? "border-red-600":"border-gray-300"} ${submitted && "border-green-700"}`}>
              <div className='bg-slate-400 rounded-l-md p-1 flex items-center justify-center'>
                <i className={input.icon}></i>
              </div>
              <div className='flex-1'>
                <input type={input.type || "text"} value={formState[input.name]?.value || ""}  onChange={(e)=>setFormState(prev=> ({...prev,[input.name]:{value:e.target.value,error:false}}))} className={`w-full outline-none py-[2px] px-1 h-full focus:shadow-[0.4px_0px_4px_0px_#5b15b0] duration-100 bg-transparent border-y-2 border-r-2 rounded-r-md`} placeholder={input.placeholder}/>
              </div>
            </div>
          )
        })}
        {errorMessage && errorMessage.length!==0 && <p className='text-red-600 text-center text-[.8em]'>{errorMessage}</p>}
        <button onClick={handleButtonClick} className={`bg-[#68a5e4] duration-75 border border-[#68a5e4] text-white py-2 hover:bg-transparent hover:text-[#68a5e4] active:bg-[#68a5e4] active:text-white ${disabledButton && "cursor-not-allowed bg-[#88aacb]"}`}>{buttonTitle}</button>
      </div>  
      <p className='text-center my-2'>or</p>
      <div className='formFooter'>
        <div className='signInProviders'>
            <button onClick={(e:MouseEvent<HTMLButtonElement>)=>{
              e.preventDefault();
              signIn("google");
              }} className='bg-white flex items-center justify-center gap-3 w-full max-w-[250px] py-1 mx-auto rounded-sm'>
              <Image src={GoogleLogo} width={20} height={20} alt='google logo'/>
              Sign in with Google
            </button>
        </div>
        <div className='userProfileContainer'>
          {
            authenticatedUserLoading ? <Loading message="Loading your data..."/>:user && (
              <div>
              <div className='flex flex-col items-center'>
                
                <div className='flex items-center justify-center gap-1 mt-4'>
                  <Image src={`${user.image}`} width={22} height={22} className='rounded-full object-cover' alt='user profile'/>
                  <p className='font-medium'>{user.name}</p>
                  <i onClick={()=>SignOut(user)} className='bi bi-box-arrow-right w-[20px] h-[20px] cursor-pointer hover:text-red-700'></i>
                </div>
                <button className='bg-[#edbc3f] py-2 w-full mt-2 hover:bg-[#d4a429]' onClick={(e:MouseEvent<HTMLButtonElement>)=>{
                  e.preventDefault();
                  router.push('/dashboard');
                }}>Go To Dashboard</button>
              </div>
            </div>
            )
          
              
          }
        </div>
      </div>
     
    </div>
  )
}

export default Form