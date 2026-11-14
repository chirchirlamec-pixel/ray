"use client";

import { useState } from "react";

export default function Register(){

const [loading,setLoading] =
useState(false);

const register = async (
  e:any
)=>{

e.preventDefault();

setLoading(true);

const form =
new FormData(e.target);

await fetch(
"/api/register",
{
method:"POST",

body:JSON.stringify({
name:form.get("name"),
email:form.get("email"),
password:form.get("password")
}),

headers:{
"Content-Type":"application/json"
}
}
);

window.location.href="/login";
};

return(

<div className="min-h-screen flex items-center justify-center">

<form
onSubmit={register}
className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg space-y-4"
>

<h1 className="text-3xl font-bold">
Create Account
</h1>

<input
name="name"
placeholder="Full Name"
className="border p-3 w-full rounded"
/>

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

{loading
? "Creating..."
: "Create Account"}

</button>

</form>

</div>

);
}
