import { useState } from "react";
import UserContext from "./UserContext";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserState = (props) => {
    const router = useRouter();

    const handleLogin = async (credentials) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })

        const response = await res.json();

        return response
    }

    const handleSignup = async (credentials) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, phoneNo: credentials.phone, email: credentials.email, password: credentials.password })
        })

        const response = await res.json();

        return response
    }

    const getUser = async () => {
        const token = localStorage.getItem('authToken')
        if (token) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': `${token}`
                }
            })

            const response = await res.json();
            return response
        }
    }

    const CheckUser = async () => {
        
        const res = await fetch(`${process.env.REACT_APP_HOST}/api/auth/checkuser`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const response = await res.json();
        console.log(response);
    }

    const updateUser = async (type, data) => {
        const token = localStorage.getItem('authToken')
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': `${token}`
            },
            body: JSON.stringify({
                type : type,
                data : data
            })
        })

        const response = await res.json();
        return response
    }



    return (
        <UserContext.Provider value={{handleLogin, getUser, CheckUser, handleSignup, updateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;