import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../api/firebase";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <section>
                <div>
                    <p>Only Hands</p>
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
                            <button type="submit" onClick={onLogin}>Sign In</button>
                        </div>
                    </form>

                    <p>
                        Don't have an account?{' '}
                        <NavLink to="/signup">
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Login;