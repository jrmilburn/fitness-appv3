import Set from './Set';
import { useEffect, useState } from 'react';
import styles from './Exercise.module.css';

export default function Exercise({ exercise, weekRir, workout, setWorkout }) {
    const [muscle, setMuscle] = useState({});
    const [setsCompleted, setSetsComplete] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/api/musclegroups/${exercise.muscleGroupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setMuscle(data))
        .catch(error => console.error('Error:', error));
    }, [exercise.muscleGroupId]);

    useEffect(() => {
        if (exercise.sets && exercise.sets.length > 0) {
            const allSetsCompleted = exercise.sets.every(set => set.completed === true);
            setSetsComplete(allSetsCompleted);
        }
    }, [exercise.sets]);

    useEffect(() => {
        setWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(e => (
                e.id === exercise.id ? { ...e, completed: setsCompleted } : e
            ))
        }));
    }, [setsCompleted, exercise.id, setWorkout]);

    return (
        <div className={`${styles['exerciseContainer']} ${setsCompleted ? styles['completed'] : styles['notCompleted']}`}>
            <p className={styles['muscleName']}>{muscle.name}</p>
            <h2 className={styles['exerciseTitle']}>{exercise.name}</h2>
            <div className={styles['setHeader']}>
                <h2>Weight</h2>
                <h2>Reps</h2>
            </div>
            {exercise.sets.map((set, index) => (
                <Set key={index} setId={set.id} Rir={weekRir} workout={workout} setWorkout={setWorkout} />
            ))}
            {setsCompleted && <p className={styles['completedMessage']}>All sets completed!</p>}
        </div>
    );
}