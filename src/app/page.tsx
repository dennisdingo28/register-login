import Image from 'next/image'
import rocket from "../assets/rocket.png"
import RegisterForm from '@/components/Form/RegisterForm'

export default function Home() {
  return (
      <div className='min-h-[100vh] flex items-center justify-center p-2'>
        <form className='form lg:flex'>
          <div className='bg-darkPurple rounded-t-md lg:rounded-t-none lg:rounded-l-md py-1 px-2'>
            <h1 className='text-center font-bold text-[2em] text-gray-300'>Welcome,</h1>
            <div className="flex items-center justify-center">
              <Image src={rocket} className='min-w-[200px] w-full max-w-[450px] object-cover' alt='rocket'/>
            </div>
            <div className="">
              <p className='font-medium text-gray-400 text-[1.1em] text-center'>Authenticate and unleash the full features of our app</p>
            </div>
            <div className="flex items-center justify-center mt-3 mb-3">
              <button className='bg-[#edbc3f] p-2 rounded-full cursor-pointer font-medium duration-75 hover:bg-[#dcb246] active:scale-95'>I already have an account</button>
            </div>
            <small className='underline text-gray-400 cursor-pointer'>© Copyright 2023.All rights reserved</small>
          </div>
          <div className=''>
            <RegisterForm/>
          </div>
        </form>

      </div>
  )
}
