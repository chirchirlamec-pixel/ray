"use client";

import { signIn }
from "next-auth/react";

export default function Login(){

const login = async (
e:any
)=>{

e.preventDefault();

const form =
new FormData(e.target);

await signIn(
"credentials",
{
email:form.get("email"),
password:form.get("password"),
callbackUrl:"/dashboard"
}
);

};

return(

<div className="min-h-screen flex items-center justify-center">

<form
onSubmit={login}
className="
bg-white
p-6
rounded-2xl
shadow-lg
max-w-md
w-full
space-y-4
"
>

<h1 className="text-3xl font-bold">
Welcome Back
</h1>

<input
name="email"
type="email"
placeholder="Email"
className="border p-3 w-full rounded"
/>

<input
name="password"
type="password"
placeholder="Password"
className="border p-3 w-full rounded"
/>

<button
className="
bg-emerald-600
text-white
w-full
py-3
rounded-lg
"
>

Login

</button>

</form>

</div>

);
}
