import { useState } from 'react';

const RegistrationForm = () => {
    // State to hold form field values
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handleSubmit function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            email: email,
            password: password,
        };

        console.log('Sending data:', data);  // Log the data

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            console.log('Server response:', result);  // Log the response

            if (response.ok) {
                alert('Registration successful');
            } else {
                alert(`Registration failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred while registering');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
