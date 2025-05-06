import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import { USER_PFP_TEMPLATE } from '@/lib/constants'

import { FaHome } from 'react-icons/fa'

const Sidebar = () => {
    return (
        <aside className='w-70 bg border_right h-screen px-4 py-3'>
            <div className="flex items-center gap-2 p-2 hover:bg-[hsla(220,13%,91%,1)] cursor-pointer rounded">
                <Avatar className='w-7 h-7'>
                    <AvatarImage src="https://res.cloudinary.com/dkzv6wsvl/image/upload/v1746349128/profile_pictures/image-1746349124680.png" />
                    <AvatarFallback>
                        <AvatarImage src={USER_PFP_TEMPLATE} />
                    </AvatarFallback>
                </Avatar>
                <h1>Fingerbush</h1>
            </div>
        </aside>
    )
}

export default Sidebar