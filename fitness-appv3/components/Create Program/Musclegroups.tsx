"use client";

import { useState, useEffect } from "react";
import styles from './Musclegroups.module.css';

export default function Musclegroups({ visible, onClose, onAdd }) {
    const [muscleGroups, setMuscleGroups] = useState([]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/musclegroups", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setMuscleGroups(data || []);
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <>
            {visible && (
                <div className={styles['overlay']} onClick={handleOverlayClick}>
                    <div className={styles['background']} />
                    <div className={styles['modal']}>
                        <h2 className={styles['title']}>Muscle Groups</h2>
                        {muscleGroups?.map((muscleGroup) => (
                            <div key={muscleGroup.id} className={styles['muscleGroupItem']}>
                                <button onClick={() => onAdd(muscleGroup)}>{muscleGroup.name}</button>
                            </div>
                        ))}
                        <button onClick={onClose} className={styles['closeButton']}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}