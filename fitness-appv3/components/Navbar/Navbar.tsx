'use client'

import styles from './Navbar.module.css'
import { signOut, signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function Navbar() {

    const { data: session } = useSession();
    const [isAuth, setIsAuth] = useState(false);
    const [signInForm, setSignInForm] = useState(false);

    const defaultProfileImage = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';
    const [auth, setAuth] = useState({
        isAuth: false,
        name: null,
        email: null,
        image: defaultProfileImage
    });

    useEffect(() => {
        if (session?.user) {
            setIsAuth(true);
            setAuth({
                isAuth: true,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image || defaultProfileImage
            });
        } else {
            setIsAuth(false);
            setAuth({
                isAuth: false,
                name: null,
                email: null,
                image: defaultProfileImage
            });
        }
    }, [session]);

    const handleSignIn = () => {

        setSignInForm(true);

    }

    return (
        <>
            <nav className={styles['nav']}>
                <ul>
                    <p>Training</p>
                    <li>Current Workout</li>
                    <li>Current Program</li>
                    <li>New Program</li>
                </ul>
                <ul>
                    <p>User</p>
                    <li>Profile</li>
                    <li>Search</li>
                    <li>Settings</li>
                    {auth.isAuth ? (
                        <button className={styles['sign-in']} onClick={() => signOut()}>Sign Out</button>
                    ) : (
                        <button className={styles['sign-in']} onClick={handleSignIn}>Sign In</button>
                    )}
                </ul>
            </nav>

            {signInForm && (
                    <div className={styles['sign-in-form']}>

                            <form>
        
                                <h3>Sign In</h3>
                                <input type="text" placeholder='email' />
                                <input type="text" placeholder='password' />
                                <button onClick={handleSignIn}>Sign In</button>
        
                            </form>
        
                            <div className={styles['seperator']}></div>
        
                            <button onClick={() => signIn('google')}>Sign in with Google</button>
        
                    </div>
            )}


        </>
    );
}