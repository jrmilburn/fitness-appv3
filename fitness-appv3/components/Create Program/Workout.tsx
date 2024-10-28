"use client";

import Musclegroups from './Musclegroups';
import Excercise from './Excercise';
import { useState } from 'react';
import styles from './Workout.module.css';

export default function Workout({ workout, setProgram, excercises }) {

    const [muscleGroupsShown, setMuscleGroupsShown] = useState(false);
    const [muscleGroups, setMuscleGroups] = useState([]);

    const addMuscleGroup = (muscleGroup) => {
        setMuscleGroups([...muscleGroups, muscleGroup]);
        console.log(muscleGroups);
        setMuscleGroupsShown(false);
    }

    const showMuscleGroups = (e) => {
        e.preventDefault();
        setMuscleGroupsShown(true);
    }

    return (
        <>
            <div className={styles['workoutContainer']}>
                <h2 className={styles['title']}>{workout}</h2>
                <div className={styles['muscleGroupsContainer']}>
                    {muscleGroups.map((muscleGroup, index) => (
                        <Excercise 
                            key={index} 
                            excerciseindex={index} 
                            muscleId={muscleGroup.id} 
                            muscleName={muscleGroup.name} 
                            excercise={excercises} 
                            setProgram={setProgram} 
                            workout={workout}
                        />
                    ))}
                </div>
                <button className={styles['addButton']} onClick={showMuscleGroups}>Add Muscle Group +</button>
            </div>
            <Musclegroups visible={muscleGroupsShown} onClose={() => setMuscleGroupsShown(false)} onAdd={addMuscleGroup} />
        </>
    );
}