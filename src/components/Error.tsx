import { FC } from 'react'
import Link from 'next/link'

interface ErrorProps {
    message: string,
}

const page: FC<ErrorProps> = ({message}:ErrorProps) => {
  return <div className="h-screen flex justify-center items-center gap-2">
            <h1 className='font-bold text-[2em]'>{message}</h1>
            <Link href={"/"} className='bg-darkPurple p-2 rounded-md text-white font-medium'>back home</Link>
        </div>
}

export default page;