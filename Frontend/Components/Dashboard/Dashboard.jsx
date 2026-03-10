import React from 'react'
import "./Dashboard.css"
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Inputs.css";

const schema = yup.object({
    service: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
}).required();


const Dashboard = ({ setCurrPage }) => {


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });


    const [passwords, setpasswords] = useState([])
    const handleclick = async () => {
        await fetch("http://localhost:8001/logout", {
            method: "POST",
            credentials: "include"
        });
        setCurrPage("login")
    }
    const fetchPasswords = async () => {
        const res = await fetch("http://localhost:8001/password", {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        setpasswords(data.passwords);
        console.log(data.passwords)
    };

    useEffect(() => {
        (async()=>{
           await fetchPasswords();
        })();
    }, []);



    const onSubmit = async (data) => {
        await fetch("http://localhost:8001/password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        reset();
        fetchPasswords();
    };
    const handleDelete=({id})=>{
const _id=id
    }
    const handleEdit=({id})=>{
const _id= id
    }

    return (
        <>
            <div className="dashboard-container">

                {/* Navbar */}
                <nav className="navbar">
                    <div className="logo">Password Manager</div>
                    <div className="user-info">
                        <span>Welcome, Ahsan</span>
                        <button className="logout-btn" onClick={handleclick}>Logout</button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="main-content">

                    {/* Add Password Section */}
                    <section className="add-password">
                        <section className="add-password">
                            <h2>Add New Password</h2>
                            <form className="inputs-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <div className="field">
                                        <input {...register("service")} placeholder="Service" />
                                        <p className="error">{errors.service?.message}</p>
                                    </div>
                                    <div className="field">
                                        <input {...register("email")} placeholder="Email" />
                                        <p className="error">{errors.email?.message}</p>
                                    </div>
                                    <div className="field">
                                        <input {...register("password")} placeholder="Password" />
                                        <p className="error">{errors.password?.message}</p>
                                    </div>
                                </div>
                                <button className="save-btn" type="submit">Save Password</button>
                            </form>
                        </section>
                    </section>

                    {/* Password List */}
                    <section className="password-list">
                        <h2>Saved Passwords</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords && passwords.length > 0 &&
                                    passwords.map((p) => (
                                        <tr key={p._id}>
                                            <td>{p.service}</td>
                                            <td>{p.email}</td>
                                            <td>{p.password}</td>
                                            <td className="actions">
                                                <button className="edit-btn" onClick={handleEdit(p._id)}>Edit</button>
                                                <button className="delete-btn" onClick={handleDelete(p._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </section>

                </main>
            </div>
        </>
    )
}

export default Dashboard