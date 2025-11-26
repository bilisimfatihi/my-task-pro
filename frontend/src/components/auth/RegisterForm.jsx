// src/components/auth/RegisterForm.jsx
import React from "react";
export default function RegisterForm() {
return (
<form className="flex flex-col gap-4 w-80 p-6 rounded-2xl shadow">
<input type="text" placeholder="Name" className="p-3 rounded-xl bg-gray-100" />
<input type="email" placeholder="Email" className="p-3 rounded-xl bg-gray-100" />
<input type="password" placeholder="Password" className="p-3 rounded-xl bg-gray-100" />
<button className="p-3 rounded-xl bg-green-300 hover:bg-green-400">Register</button>
</form>
);
}