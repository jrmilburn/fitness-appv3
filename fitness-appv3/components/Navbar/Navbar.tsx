'use client'

import styles from './Navbar.module.css'
import { signOut, signIn, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Navbar() {

    const {data: session } = useSession();

    let auth = {
        isAuth: false,
        name: null,
        email: null,
        image: null
    }

    if (session?.user) {
        auth = {
            isAuth: true,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image
        }
    }

    return (
        <>
        
                <nav className={styles['nav']}>
                    <h2>{auth.name}</h2>
                    <Image src={auth.image} alt='profile' width={64} height={64}/>
                    <ul>
                        <p>Training</p>
                        <li>Current Workout</li>
                        <li>Current Program</li>
                        <li>New Program</li>
                    </ul>
                    <ul>
                        <p>User</p>
                        <li>
                            Profile
                        </li>
                        <li>
                            Search
                        </li>
                        <li>
                            Settings
                        </li>
                        <button className='sign-in' onClick={() => signIn()}>Sign In</button>
                    </ul>
                </nav>


        </>
    )

}