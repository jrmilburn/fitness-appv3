import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './CompleteWorkout.module.css';

export default function CompleteWorkout({ completed, workout, setWorkout }) {
    const [isFinished, setIsFinished] = useState(false);

    const handleFinish = async () => {
        setIsFinished(true);
        setWorkout({ ...workout, completed: true });

        const response = await fetch(`http://localhost:3000/api/workouts/finish/${workout.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                weekId: workout.weekId
            })
        });
        console.log(response);

        const newWorkout = await fetch(`http://localhost:3000/api/workouts/current`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const workoutToUpdate = await newWorkout.json();

        console.log('WORKOUT TO UPDATE: ', workoutToUpdate);

        setWorkout(workoutToUpdate);
    };

    useEffect(() => {
        if (isFinished && workout.completed) {
            setIsFinished(false);  // Reset to allow finishing other workouts if needed
        }
    }, [workout.completed, isFinished]);

    if (workout.completed) {
        return (
            <>
                <h2>Workout Completed</h2>
                <button className={styles['completeButton']} onClick={handleFinish}>
                    <Link href={`/workouts/current`}>
                        View Current Workout
                    </Link>
                </button>
            </>
        );
    }

    return (
        <>
            {completed && (
                <button 
                    onClick={handleFinish} 
                    className={styles['completeButton']}
                >
                    Finish Workout
                </button> 
            )}
        </>
    );
}