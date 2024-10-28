"use client";

import Workout from './Workout';
import { useState } from 'react';
import styles from './Programexcercises.module.css';

export default function ProgramExcercises({ program, setProgram }) {
    const handleCreate = async () => {
        /*const response = await fetch('http://localhost:3000/api/program', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(program),
        });*/
    };

    return (
        <>
            <form className={styles['form']}>
                <h2 className={styles['title']}>Exercises</h2>

                <div className={styles['workoutsContainer']}>
                    {program.weeks[0].workouts.map((workout, index) => (
                        <Workout
                            key={index}
                            workout={workout.name}
                            setProgram={setProgram}
                            exercises={workout.exercises}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className={styles['createButton']}
                >
                    Create Meso
                </button>
            </form>
        </>
    );
}