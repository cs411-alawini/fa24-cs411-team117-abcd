// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './RegisterPage.css'; // Ensure this import is correct and points to your CSS file

// function RegisterPage({ onRegister }) {
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const validatePassword = (pass) => {
//         const lengthCheck = /^.{8,12}$/;
//         const uppercaseCheck = /[A-Z]/;
//         const numberCheck = /\d/;
//         const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/;

//         if (!lengthCheck.test(pass)) return "Password must be 8-12 characters long.";
//         if (!uppercaseCheck.test(pass)) return "Password must contain at least one uppercase letter.";
//         if (!numberCheck.test(pass)) return "Password must contain at least one number.";
//         if (!specialCharCheck.test(pass)) return "Password must contain at least one special character.";
//         return null;
//     };

//     const handleRegisterClick = () => {
//         const validationError = validatePassword(password);
//         if (validationError) {
//             setError(validationError);
//             return;
//         }

//         if (password !== confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         onRegister(email, username, password);
//         navigate('/');
//     };

//     return (
//         <div className="register-root">
//             <div className="hero-background">
//                 <div className="overlay">
//                     <div className="register-panel">
//                         <h1 className="register-title">Create Account</h1>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="input-field"
//                             required
//                         />
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="input-field"
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="input-field"
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="Confirm Password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="input-field"
//                             required
//                         />

//                         <div className="requirements-box">
//                             <h3>Password Requirements:</h3>
//                             <ul>
//                                 <li>8-12 characters in length</li>
//                                 <li>At least one uppercase letter</li>
//                                 <li>At least one number</li>
//                                 <li>At least one special character</li>
//                             </ul>
//                         </div>

//                         {error && <p className="error">{error}</p>}

//                         <button
//                             onClick={handleRegisterClick}
//                             className="cta-btn"
//                         >
//                             Register
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default RegisterPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Ensure this import is correct and points to your CSS file

function RegisterPage({ onRegister }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [goal, setGoal] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validatePassword = (pass) => {
        const lengthCheck = /^.{8,12}$/;
        const uppercaseCheck = /[A-Z]/;
        const numberCheck = /\d/;
        const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/;

        if (!lengthCheck.test(pass)) return "Password must be 8-12 characters long.";
        if (!uppercaseCheck.test(pass)) return "Password must contain at least one uppercase letter.";
        if (!numberCheck.test(pass)) return "Password must contain at least one number.";
        if (!specialCharCheck.test(pass)) return "Password must contain at least one special character.";
        return null;
    };

    const handleRegisterClick = async () => {
        const validationError = validatePassword(password);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Prepare the user data
        const userData = {
            name,
            age,
            gender,
            height,
            weight,
            fitnessLevel,
            goal,
            username,
            password,
        };

        // Call the onRegister function (this should make the API call to create the user)
        await onRegister(userData);
        navigate('/');
    };

    return (
        <div className="register-root">
            <div className="hero-background">
                <div className="overlay">
                    <div className="register-panel">
                        <h1 className="register-title">Create Account</h1>
                        
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Height (in meters)"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Weight (in kg)"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Fitness Level"
                            value={fitnessLevel}
                            onChange={(e) => setFitnessLevel(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Goal"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                        
                        <div className="requirements-box">
                            <h3>Password Requirements:</h3>
                            <ul>
                                <li>8-12 characters in length</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one number</li>
                                <li>At least one special character</li>
                            </ul>
                        </div>

                        {error && <p className="error">{error}</p>}

                        <button
                            onClick={handleRegisterClick}
                            className="cta-btn"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

