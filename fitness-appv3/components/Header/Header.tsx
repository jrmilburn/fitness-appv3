'use client'

import styles from './Header.module.css'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header({ children }) {

    const { data:session } = useSession();

    return (
        <>
            <div className={styles["header"]}>
                {session?.user.name}
                <Image src={session?.user.image} width={64} height={64} alt='profile'/>
            </div>
        </>
    )

}