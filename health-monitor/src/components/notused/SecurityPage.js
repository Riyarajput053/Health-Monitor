import React, { useState } from 'react';

const SecurityPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = () => {
        // Implement logic to change password
        // For example, you can send an API request to your backend server to update the password
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match');
        } else {
            // Here, you would typically send an API request to your backend server to update the password
            // Replace the alert with your actual logic
            alert('Password changed successfully');
            // Clear input fields after successful password change
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Change Password? </h1>
            <form onSubmit={handleChangePassword}>
                <label>
                    Current Password:
                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    New Password:
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Confirm New Password:
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SecurityPage;