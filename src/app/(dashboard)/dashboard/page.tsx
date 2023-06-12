"use client"

import {FC} from 'react'
import Auth from '@/components/hoc/Auth'

const page: FC= () => {
  return (
    <div>
      <Auth>
        <div>dashboard</div>
      </Auth>
    </div>
    
  )
}

export default page