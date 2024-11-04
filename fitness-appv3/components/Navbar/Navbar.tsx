'use client';

import styles from './Navbar.module.css';
import { signOut, signIn, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const { data: session } = useSession();
    const [isAuth, setIsAuth] = useState(false);
    const [signInForm, setSignInForm] = useState(false);

    const defaultProfileImage = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';
    const [auth, setAuth] = useState({
        isAuth: false,
        name: null,
        email: null,
        image: defaultProfileImage,
    });

    useEffect(() => {
        if (session?.user) {
            setIsAuth(true);
            setAuth({
                isAuth: true,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image || defaultProfileImage,
            });
        } else {
            setIsAuth(false);
            setAuth({
                isAuth: false,
                name: null,
                email: null,
                image: defaultProfileImage,
            });
        }
    }, [session]);

    const handleSignIn = () => {
        setSignInForm(true);
    };

    const formRef = useRef(null);

    const handleClickOutside = (event) => {
        // Check if the clicked element is outside the form
        if (formRef.current && !formRef.current.contains(event.target)) {
            setSignInForm(false); // Close the form
        }
    };

    useEffect(() => {
        if (signInForm) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [signInForm]);

    return (
        <>
            <nav className={styles['nav']}>
                <ul>
                    <p>Training</p>
                    <li><Link href={`/current`} className={styles['nav-link']}>Current Workout</Link></li>
                    <li><Link href={`/create`} className={styles['nav-link']}>New Program</Link></li>
                </ul>
                <ul>
                    <p>User</p>
                    <li><Link href={`/profile`} className={styles['nav-link']}>Profile</Link></li>
                    <li><Link href={`/search`} className={styles['nav-link']}>Search</Link></li>
                    <li><Link href={`/profile`} className={styles['nav-link']}>Settings</Link></li>
                    {auth.isAuth ? (
                        <button className={styles['sign-in']} onClick={() => signOut()}>Sign Out</button>
                    ) : (
                        <button className={styles['sign-in']} onClick={handleSignIn}>Sign In</button>
                    )}
                </ul>
            </nav>

            {signInForm && (
                <>
                    <div className={styles['sign-in-form']} ref={formRef}>
                        <form>
                            <h3>Sign In</h3>
                            <input type="text" placeholder="email" />
                            <input type="password" placeholder="password" />
                            <button onClick={handleSignIn}>Sign In</button>
                        </form>
                        <div className={styles['seperator']}></div>
                        <button onClick={() => signIn('google')}>Sign in with Google</button>
                    </div>
                    <div
                        className={styles['overlay']}
                        onClick={() => setSignInForm(false)} // Close form when overlay is clicked
                    ></div>
                </>
            )}
        </>
    );
}