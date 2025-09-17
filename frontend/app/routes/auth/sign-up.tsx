import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useSignUpMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

export type SignupFormData = z.infer<typeof signUpSchema>

const SignUp = () => {
    const form = useForm<SignupFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            confirmPassword: ""
        }
    });

    const {mutate, isPending} = useSignUpMutation()

    const handleOnSubmit = (values: SignupFormData) => {
        mutate(values, {
            onSuccess: () => {
                toast.success("Account created successfully")
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || "An error occurred"
                console.log(error)
                toast.error(error.message)
            }
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
            <Card className="max-w-md w-full shadow-xl">
                <CardHeader className="text-center mb-5">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Create an account to continue</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="John Doe" {...field} />
                                    </FormControl>

                                    <FormMessage  />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email@example.com" {...field} />
                                    </FormControl>

                                    <FormMessage  />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="password" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>

                                    <FormMessage  />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="confirmPassword" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>

                                    <FormMessage  />
                                </FormItem>
                            )} />

                            <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                                {isPending ? "Signing up..." : "Sign Up"}
                            </Button>
                        </form>
                    </Form>

                    <CardFooter>
                        <div className="flex items-center justify-center w-full mt-4">
                            <p className="text-muted-foreground">
                                Already have an account?
                                <Link to="/sign-in" className="ml-2 hover:text-black transition-all">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp