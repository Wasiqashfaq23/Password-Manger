import React from 'react'
import "./Dashboard.css"
import Inputs from './Inputs'
const Dashboard = () => {
    return (
        <>
            <div className="dashboard-container">

                {/* Navbar */}
                <nav className="navbar">
                    <div className="logo">Password Manager</div>
                    <div className="user-info">
                        <span>Welcome, Ahsan</span>
                        <button className="logout-btn">Logout</button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="main-content">

                    {/* Add Password Section */}
                    <section className="add-password">
                        <Inputs/>
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
                                <tr>
                                    <td>Github</td>
                                    <td>ahsan@mail.com</td>
                                    <td>••••••••</td>
                                    <td className="actions">
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gmail</td>
                                    <td>ahsan@mail.com</td>
                                    <td>••••••••</td>
                                    <td className="actions">
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Netflix</td>
                                    <td>ahsan@mail.com</td>
                                    <td>••••••••</td>
                                    <td className="actions">
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                </main>
            </div>
        </>
    )
}

export default Dashboard