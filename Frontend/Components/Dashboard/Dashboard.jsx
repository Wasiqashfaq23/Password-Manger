import "./Dashboard.css"
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    service: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
}).required();


const Dashboard = ({ setCurrPage }) => {
    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState({})
    const [passwords, setpasswords] = useState([])
    const [user, setuser] = useState("")
    const [error, seterror] = useState("")
    const [showInput, setShowInput] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState({})
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const toggleVisibility = (id) => {
        setVisiblePasswords((prev)=>({
            ...prev,
            [id]: !prev[id],
        }))
    }



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
    };
    const fetchUser = async () => {
        const res = await fetch("http://localhost:8001/me", {
            credentials: "include",

        })
        if (res.ok) setCurrPage("dashboard");
        const data = await res.json()
        setuser(data.userName)
    }
    useEffect(() => {
        (async () => {
            await fetchPasswords();
            await fetchUser();
        })();
    }, []);



    const onSubmit = async (data) => {
        const res = await fetch("http://localhost:8001/password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        reset();
        const dt = await res.json()
        fetchPasswords();
        seterror(dt)
        setTimeout(() => {
            seterror("")
        }, 6000);
    };
    const handleEdit = async (p) => {
        setEditId(p._id)
        setEditData({ service: p.service, email: p.email, password: p.password });
    }
    const handleSave = async () => {
        await fetch(`http://localhost:8001/password/${editId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editData),
            credentials: "include",
        })
        fetchPasswords();
        setEditId(null)
    }
    const handleDelete = async (id) => {
        await fetch(`http://localhost:8001/password/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        fetchPasswords();
    }

    return (
        <>
            <div className="dashboard-container">

                {/* Navbar */}
                <nav className="navbar">
                    <div className="logo">Password Manager</div>
                    <div className="user-info">
                        <span>Welcome, {user}</span>
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
                                        <input {...register("email")} placeholder="Email / Username" />
                                        <p className="error">{errors.email?.message}</p>
                                    </div>
                                    <div className="field">
                                        <div style={{ position: "relative" }}>
                                            <input {...register("password")} type={showInput ? "text" : "password"} placeholder="Password" />
                                            <span className="show-input" onClick={() => setShowInput(!showInput)}>   {showInput ? <GoEye /> : <GoEyeClosed />}
                                            </span>
                                        </div>
                                        <p className="error">{errors.password?.message}</p>
                                    </div>
                                </div>
                                <button className="save-btn" type="submit">Save Password</button>
                                <p className="error">{error}</p>
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
                                    <th>Email/Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords && passwords.length > 0 &&
                                    passwords.map((p) => (
                                        <tr key={p._id}>
                                            {editId === p._id ?
                                                <>
                                                    <td><input type="text" value={editData.service} onChange={(e) => setEditData({ ...editData, service: e.target.value })} placeholder='Enter your Service' /></td>
                                                    <td><input type="text" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} placeholder='Enter Username/Email' /></td>
                                                    <td><input type="text" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} placeholder='Enter Password' /></td>
                                                    <td className="actions">
                                                        <button className="save-changes-btn" onClick={() => handleSave(p)}>Save</button>
                                                        <button className="delete-btn" onClick={() => setEditId(null)}>Exit</button>
                                                    </td>
                                                </>
                                                :
                                                <>
                                                    <td>{p.service}</td>
                                                    <td>{p.email}</td>
                                                    <td>{visiblePasswords[p._id] ? p.password : "********"}
                                                        <span onClick={() => { toggleVisibility(p._id) }}>
                                                            {visiblePasswords[p._id] ? <GoEye /> : <GoEyeClosed />}
                                                        </span>
                                                    </td>
                                                    <td className="actions">
                                                        <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                                                        <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                                                    </td>
                                                </>
                                            }
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