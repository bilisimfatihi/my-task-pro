// src/pages/AuthPage.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";


export default function AuthPage() {
const { id } = useParams();


return (
<div className="flex flex-col items-center justify-center h-screen p-4 gap-6">
<div className="flex gap-4 text-lg">
<Link
to="/auth/login"
className={`px-4 py-2 rounded-xl shadow ${id === "login" ? "bg-gray-300" : "bg-gray-100"}`}
>
Login
</Link>
<Link
to="/auth/register"
className={`px-4 py-2 rounded-xl shadow ${id === "register" ? "bg-gray-300" : "bg-gray-100"}`}
>
Register
</Link>
</div>


{id === "login" ? <LoginForm /> : <RegisterForm />}
</div>
);
}