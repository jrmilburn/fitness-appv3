"use client";

import { useState } from 'react';
import Excercises from './Excercises';
import styles from './Excercise.module.css';

export default function Excercise({ muscleId, muscleName, excercise, setProgram, workout, excerciseindex }) {
    const [showExcercises, setShowExcercises] = useState(false);
    const [selectedExcercise, setSelectedExcercise] = useState(null);

    const handleSelectExcercise = (e, excercise) => {
        e.preventDefault();
        setSelectedExcercise(excercise);

        setProgram((prev) => {
            const newProgram = { ...prev };
            newProgram.weeks.forEach((week) => {
                week.workouts.forEach((session) => {
                    if (session.name === workout) {
                        if (session.excercises.length <= excerciseindex) {
                            session.excercises.push({
                                muscle: muscleName,
                                excercise: excercise,
                            });
                        } else {
                            session.excercises[excerciseindex] = {
                                muscle: muscleName,
                                excercise: excercise,
                            };
                        }
                    }
                });
            });
            return newProgram;
        });

        setShowExcercises(false);
    };

    const handleShowExcercises = (e) => {
        e.preventDefault();
        setShowExcercises(true);
    };

    return (
        <>
            <div className={styles['container']}>
                <h2 className={styles['muscleName']}>{muscleName}</h2>
                <button
                    onClick={handleShowExcercises}
                    className={styles['selectButton']}
                >
                    {selectedExcercise ? selectedExcercise : 'Select Exercise'}
                </button>
            </div>
            {showExcercises && (
                <Excercises
                    muscle={muscleId}
                    visible={showExcercises}
                    onClose={() => setShowExcercises(false)}
                    selectExcercise={handleSelectExcercise}
                />
            )}
        </>
    );
}