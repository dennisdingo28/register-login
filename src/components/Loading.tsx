import { FC } from 'react'

interface LoadingProps {
  message?: string
}

const Loading: FC<LoadingProps> = ({message}:LoadingProps) => {
  return <div className='mt-6'>
    <p className='font-semibold'>{message}</p>
  </div>
}

export default Loading