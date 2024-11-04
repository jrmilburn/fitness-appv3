import { useState, useEffect } from 'react';
import Image from 'next/image';
import calendarIcon from '../../app/assets/edit-calendar.svg';
import Workouts from './Workouts';
import styles from './WorkoutHeader.module.css';

export default function WorkoutHeader({ weekId, name, setWorkout, week, setWeek }) {
    const [programWorkouts, setProgramWorkouts] = useState({});
    const [workoutSelect, setWorkoutSelect] = useState(false);

    useEffect(() => {
        if (weekId) {
            fetch(`http://localhost:3000/api/weeks/${weekId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                setWeek(data);
                console.log('Week data:', data);
            })
            .catch(err => console.error('Failed to fetch week data', err));
        }
    }, [weekId]);

    useEffect(() => {
        if (week?.programId) {
            fetch(`http://localhost:3000/api/program/${week.programId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                setProgramWorkouts(data);
                console.log('Program workouts:', data);
            })
            .catch(err => console.error('Failed to fetch program workouts', err));
        }
    }, [week]);

    const selectWorkout = (e) => {
        e.preventDefault();
        setWorkoutSelect(true);
    };

    const handleClose = () => {
        setWorkoutSelect(false);
    };

    console.log('PROGRAM WORKOUTS: ', programWorkouts);

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <div>
                    <p className={styles['subtitle']}>Whole Body</p>
                    <h2 className={styles['title']}>Week {week?.weekNo} {name}</h2>
                </div>
                <div className={styles['buttonContainer']}>
                    <button className={styles['calendarButton']} onClick={selectWorkout}>
                        <Image
                            priority
                            src={calendarIcon}
                            alt="Choose current workout"
                        />
                    </button>
                </div>
            </div>
            {workoutSelect && (
                <Workouts
                    shown={workoutSelect}
                    onClose={handleClose}
                    weeks={programWorkouts?.weeks}
                    setProgram={setProgramWorkouts}
                    setWorkout={setWorkout}
                />
            )}
        </div>
    );
}