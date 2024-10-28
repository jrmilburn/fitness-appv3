'use client'

import styles from './Header.module.css'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header({ children }) {

    const { data:session } = useSession();

    return (
        <>
            <div className={styles["header"]}>
                <div className={styles['header-item']}>

                </div>
                <div className={styles['header-item']}>
                    <h4>{session?.user.name}</h4>
                    <Image src={session?.user.image || 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'} width={64} height={64} alt='profile'/>
                </div>
            </div>
            <div className='header-outlet'>
                {children}
            </div>
        </>
    )

}