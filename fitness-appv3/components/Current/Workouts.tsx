import Loader from "../Loader";
import styles from './Workouts.module.css';

export default function Workouts({ shown, onClose, weeks, setProgram, setWorkout }) {
    console.log('WEEKS: ', weeks);

    const handleSetProgram = (weekId, workoutId) => {
        setProgram((prev) => {
            const updatedWeeks = prev.weeks.map((week) =>
                week.id === weekId ? { ...week, currentWorkoutId: workoutId } : week
            );

            const currentWeek = updatedWeeks.find((week) => week.id === weekId);
            const currentWorkout = currentWeek.workouts.find((workout) => workout.id === workoutId);

            setWorkout(currentWorkout);

            return {
                ...prev,
                currentWeekId: weekId,
                weeks: updatedWeeks
            };
        });
        onClose();
    };

    return (
        <>
            {shown && (
                <div className={styles['overlay']}>
                    <div className={styles['modal']}>
                        {weeks
                            ?.sort((a, b) => a.weekNo - b.weekNo)
                            .map((week) => (
                                <div key={week.id} className={styles['weekContainer']}>
                                    <h2 className={styles['weekTitle']}>Week {week.weekNo}</h2>
                                    {week.workouts?.map((workout) => (
                                        <div key={workout.id} className={styles['workoutButtonContainer']}>
                                            <button
                                                className={styles['workoutButton']}
                                                onClick={() => handleSetProgram(week.id, workout.id)}
                                            >
                                                {workout.name}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                    <button onClick={onClose} className={styles['closeButton']}>
                        Close
                    </button>
                </div>
            )}
        </>
    );
}