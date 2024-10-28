import { useState, useEffect } from 'react';
import styles from './Excercises.module.css';

export default function Excercises({ muscle, visible, onClose, selectExcercise }) {
    const [excercises, setExcercises] = useState([]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3000/api/excercises/${muscle}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setExcercises(data || []);
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
                        <h2 className={styles['title']}>Exercises</h2>
                        {excercises?.map((excercise) => (
                            <div key={excercise.id} className={styles['excerciseItem']}>
                                <button onClick={(e) => selectExcercise(e, excercise.name)}>
                                    {excercise.name}
                                </button>
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