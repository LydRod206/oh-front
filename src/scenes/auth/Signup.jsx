import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../../api/firebase";

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
        <main>
            <section>
                <div>
                    <div>
                        <h1>Only Hands</h1>
                        <form>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
                            </div>

                            <div>
                                <label htmlFor="displayName">Name</label>
                                <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required placeholder="Name" />
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
                </div>
            </section>
        </main>
    )
}

export default Signup;