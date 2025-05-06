import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthProps {
    children: React.ReactNode
    title: string
}

const CardWrapper = ({
    children,
    title
}: AuthProps) => {
    return (
        <div className='flex flex-col items-center gap-4'>
            <Card className='sm:w-110 m-0 p-0 pt-8'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl'>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
            <p className='w-full text-sm opacity-50 text-center'>By continuing, you agree to our Terms of Service & Privacy Policy.</p>
        </div>
    )
}

export default CardWrapper