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
import {
    Textarea
} from "@/components/ui/textarea"
import {
    PhoneInput
} from "@/components/ui/phone-input";
import LocationSelector from "@/components/ui/location-input"
import CardWrapper from "@/components/auth/auth-wrapper"

const formSchema = z.object({
    displayName: z.string().min(1).min(1).max(30),
    username: z.string().min(1).min(1).max(30),
    email: z.string(),
    password: z.string().min(6).max(255),
    bio: z.string().min(0).max(1000).optional(),
    phoneNumber: z.string(),
});

import { API_URL, WEB_URL } from "@/lib/constants"

export default function MyForm() {
    const [countryName, setCountryName] = useState<string>('')
    const [stateName, setStateName] = useState<string>('')

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)

            const response = await fetch(`${API_URL}/artist/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errorCode === 'USER_EXISTS') {
                    form.setError('username', {
                        type: 'manual',
                        message: 'Display name or username is taken.'
                    })

                    form.setError('displayName', {
                        type: 'manual',
                        message: 'Display name or username is taken.'
                    })
                } else {
                    window.location.reload()
                }
            }

            window.location.href = `${WEB_URL}`
        } catch (error) {
            console.log(error);
        } finally { setIsLoading(false) }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <CardWrapper title="Signup">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl space-y-4 mx-auto py-10">

                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>This will be your display name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type=""
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="youremail@example.com"

                                            type="email"
                                            {...field} />
                                    </FormControl>

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


                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start cursor-pointer">
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl className="w-full">
                                        <PhoneInput className="cursor-pointer"
                                            placeholder="Placeholder"
                                            {...field}
                                            defaultCountry="US"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full cursor-pointer" variant={'outline'} type="submit">{!isLoading ? <p>Submit</p> : <img className="w-5" src="/spinners/180-ring.svg" />}</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}