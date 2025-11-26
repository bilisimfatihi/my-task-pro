// src/components/auth/LoginForm.jsx
import React from "react";
export default function LoginForm() {
return (
<form className="flex flex-col gap-4 w-80 p-6 rounded-2xl shadow">
<input type="email" placeholder="Email" className="p-3 rounded-xl bg-gray-100" />
<input type="password" placeholder="Password" className="p-3 rounded-xl bg-gray-100" />
<button className="p-3 rounded-xl bg-blue-300 hover:bg-blue-400">Login</button>
</form>
);
}