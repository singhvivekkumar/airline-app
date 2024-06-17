'use client'

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as z from  "zod";
import { useRouter } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAuth } from "@/hooks/useAuth";
import { Login } from "@/types/auth";
import { Button } from "./ui/button";

const SignInForm: React.FC = () => {

	const router = useRouter();

  const { login } = useAuth();

	const initialValues: Login = {
		email: "support@gmail.com",
		password: "12345678",
	};

	const validationSchema = z.object({
		email: z.string().email(),
		password: z.string()
			.min(8, "Password is too short - should be 8 chars minimum.")
			// .regex(/[a-zA-Z]/, "Password can only contain Latin letters."),
	});

  useEffect( ()=> {}, [])

	const handleSubmit = async (values: Login): Promise<void> => {
    try {
      const response = await login(values);
      console.log("api data ", response)
      if (response.success) {
        router.push("/dashboard");
      } 
    } catch (error) {
      // call toaster
      console.log("problem in api", error)
    }
	};

	return(
		<div className=" flex flex-col h-full w-full">
			{/* sign in */}
			<div className=" py-4 self-center ">
				<h1 className=" text-2xl font-bold">Sign In</h1>
				<p className=" text-lg ">Enter your email below to sign in to your account</p>
			</div>

			{/* form */}
			<div className="mt-8 mb-4">
				<Formik
					initialValues={initialValues}
					validationSchema={toFormikValidationSchema(validationSchema)}
					onSubmit={handleSubmit}>
					{(props) => {
						return (
							<Form className=" bg-white rounded-2xl p-5 px-7 w-full  " onSubmit={props.handleSubmit}>
								<div className=" flex flex-col justify-start items-baseline space-x-1 mb-5 ">
									<label htmlFor="email" className=" text-lg my-2">
										Enter Email
									</label>
									<Field
										name="email"
										type="email"
										placeholder="Email"
										className=" bg-slate-200/70 hover:bg-slate-300/60 w-full rounded-md  focus:outline-none p-2 md:px-2 "
									/>
									<ErrorMessage
										name="email"
										component="p"
										className=" text-sm italic text-red-600  "
									/>
								</div>

								<div className=" flex flex-col justify-start items-baseline space-x-1 mb-5">
									<label
										htmlFor="password"
										className=" text-lg my-2">
										Password
									</label>
									<Field
										name="password"
										type="password"
										placeholder="Enter password "
										className="bg-slate-200/70 hover:bg-slate-300/60 w-full rounded-md  focus:outline-none p-2 md:px-2 "
									/>
									<ErrorMessage
										name="password"
										component="p"
										className=" text-sm italic text-red-600  "
									/>
								</div>

								<Button
									type="submit"
									// disabled={isPending}
									className="border w-full border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
									Sign In
								</Button>
							</Form>
						);
					}}
				</Formik>
			</div>
			{/* create new account */}
			<div className=" flex justify-center items-center ">
				<p className=" text-sm text-slate-500">Don't have an account?</p>
				<p className=" text-sm text-blue-600">Register here</p>
			</div>
		</div>
	);
};

export default SignInForm;