import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';

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
    };

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
    );
};

export default Login;




// import React, {useState} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from "../api/firebase";

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const onLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             navigate('/');
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <main>
//             <section>
//                 <div>
//                     <p>Only Hands</p>
//                     <img
//                     alt="logo"
//                     width="130px"
//                     height="130px"
//                     src={`../../assets/logo-wht-bg.png`}
//                     style={{ cursor: "pointer", borderRadius: "50%" }}
//                 />
//                     <form>
//                         <div>
//                             <label htmlFor="email">Email</label>
//                             <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" />
//                         </div>

//                         <div>
//                             <label htmlFor="password">Password</label>
//                             <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
//                         </div>

//                         <div>
//                             <button type="submit" onClick={onLogin}>Sign In</button>
//                         </div>
//                     </form>

//                     <p>
//                         Don't have an account?{' '}
//                         <NavLink to="/signup">
//                             Sign up
//                         </NavLink>
//                     </p>
//                 </div>
//             </section>
//         </main>
//     )
// }

// export default Login;