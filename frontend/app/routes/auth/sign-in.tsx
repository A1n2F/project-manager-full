import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type SigninFormData = z.infer<typeof signInSchema>

const SignIn = () => {
    const form = useForm<SigninFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleOnSubmit = (values: SigninFormData) => {
        console.log(values)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
            <Card className="max-w-md w-full shadow-xl">
                <CardHeader className="text-center mb-5">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>Sign in to your account to continue</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link 
                                            to="/forgot-password" 
                                            className="text-sm text-blue-600 hover:underline transition-all"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>

                                    <FormMessage  />
                                </FormItem>
                            )} />

                            <Button type="submit" className="w-full cursor-pointer">
                                Sign In
                            </Button>
                        </form>
                    </Form>

                    <CardFooter>
                        <div className="flex items-center justify-center w-full mt-4">
                            <p className="text-muted-foreground">
                                Don't have an account?
                                <Link to="/sign-up" className="ml-2 hover:text-black transition-all">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn