import { FC } from 'react'
import Auth from '@/components/hoc/Auth'

const page: FC= () => {
  return (
  <Auth>
    <div>
        <h1 className='text-center font-semibold text-[1.8em]'>This is a protected route for authenticated users only</h1>
    </div>
  </Auth>
  )
}

export default page