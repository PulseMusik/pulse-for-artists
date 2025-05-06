"use client"
import {
    useState
} from "react"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    PasswordInput
} from "@/components/ui/password-input"
import CardWrapper from "@/components/auth/auth-wrapper"
import { API_URL, WEB_URL } from "@/lib/constants"

const formSchema = z.object({
    username: z.string().min(1).min(1).max(30),
    password: z.string()
});

export default function Login() {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)

            const response = await fetch(`${API_URL}/artist/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: 'include'
            })

            const data = await response.json()

            if (!response.ok) {
                if (data.errorCode === "ARTIST_NOT_FOUND") {
                    form.setError('username', {
                        type: 'manual',
                        message: 'Artist not found.'
                    })

                    form.setError('password', {
                        type: 'manual',
                        message: 'Artist not found.'
                    })
                } else if (data.errorCode === "INCORRECT_PASSWORD") {
                    form.setError('password', {
                        type: 'manual',
                        message: 'Incorrect password.'
                    })
                } else if (data.errorCode === "BAD_REQUEST") {
                    form.setError('username', {
                        type: 'manual',
                        message: 'Username and/or password not provided.'
                    })

                    form.setError('password', {
                        type: 'manual',
                        message: 'Username and/or password not provided.'
                    })
                }
            }

            window.location.href = `${WEB_URL}`
        } catch (error) {
            console.error(error);
        } finally { setLoading(false) }
    }

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <CardWrapper title="Login">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>Please use the username you used to sign up, not the display name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full cursor-pointer" variant={'outline'} type="submit">{!loading ? <p>Submit</p> : <img className="w-5" src="/spinners/180-ring.svg" />}</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}