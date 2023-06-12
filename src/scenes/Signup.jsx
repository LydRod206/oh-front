import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../api/firebase";

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: displayName
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
        <section>
            <div style={{ textAlign: 'center' }}>
            {/* <p>Only Hands</p> */}
            <img
                alt="logo"
                width="350px"
                height="350px"
                src={'../../assets/logo-wht-bg.png'}
                // src={`../../assets/logo-wht-bg.png`}
                style={{ cursor: 'pointer', borderRadius: '50%' }}
            /><br></br><br></br><br></br>
                        <form>
                            <div>
                                <label htmlFor="email">Email</label><br></br>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter Email" />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label><br></br>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter Password" />
                            </div>

                            <div>
                                <label htmlFor="displayName">Name</label><br></br>
                                <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required placeholder="What's your name?" />
                            </div>

                            <button type="submit" onClick={onSubmit}>Sign Up</button>
                        </form>

                        <p>
                            Already have an account?{' '}
                            <NavLink to="/login">
                                Sign in
                            </NavLink>
                        </p>
                    </div>
            </section>
        </main>
    )
}

export default Signup;