import Radiobtn from './Radiobtn';
import { useState, useEffect } from 'react';
import styles from './Programlength.module.css';

export default function ProgramLength({ onNext, setProgram }) {
    const [programLength, setProgramLength] = useState(null);
    const [programDays, setProgramDays] = useState(null);
    const [programName, setProgramName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    function createProgram(programName, programLength, programDays) {
        const program = {
            name: programName,
            length: programLength,
            days: programDays,
            weeks: []
        };

        for (let i = 0; i < programLength; i++) {
            const week = { weekNumber: i + 1, workouts: [] };
            for (let j = 0; j < programDays; j++) {
                const workout = { name: `Day ${j + 1}`, excercises: [] };
                week.workouts.push(workout);
            }
            program.weeks.push(week);
        }

        setProgram(program);
    }

    useEffect(() => {
        setIsFormValid(programName !== '' && programLength !== null && programDays !== null);
    }, [programName, programLength, programDays]);

    const handleProgramNameChange = (e) => setProgramName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        createProgram(programName, programLength, programDays);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className={styles['form']}>
            <h2 className={styles['title']}>General Details</h2>

            <div className={styles['formContent']}>
                <input
                    type="text"
                    name="programName"
                    id="programName"
                    placeholder="Enter Program Name"
                    className={styles['input']}
                    value={programName}
                    onChange={handleProgramNameChange}
                />

                <div>
                    <h3 className={styles['subtitle']}>Program Length (weeks)</h3>
                    <div className={styles['radioGroup']}>
                        <Radiobtn id="length4" name="length" text="4" onChange={() => setProgramLength(4)} checked={programLength === 4} />
                        <Radiobtn id="length6" name="length" text="6" onChange={() => setProgramLength(6)} checked={programLength === 6} />
                        <Radiobtn id="length8" name="length" text="8" onChange={() => setProgramLength(8)} checked={programLength === 8} />
                    </div>
                </div>

                <div>
                    <h3 className={styles['subtitle']}>Days Per Week</h3>
                    <div className={styles['radioGroup']}>
                        <Radiobtn id="day2" name="days" text="2" onChange={() => setProgramDays(2)} checked={programDays === 2} />
                        <Radiobtn id="day3" name="days" text="3" onChange={() => setProgramDays(3)} checked={programDays === 3} />
                        <Radiobtn id="day4" name="days" text="4" onChange={() => setProgramDays(4)} checked={programDays === 4} />
                        <Radiobtn id="day5" name="days" text="5" onChange={() => setProgramDays(5)} checked={programDays === 5} />
                        <Radiobtn id="day6" name="days" text="6" onChange={() => setProgramDays(6)} checked={programDays === 6} />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`${styles['submitButton']} ${isFormValid ? styles['activeButton'] : styles['disabledButton']}`}
                    disabled={!isFormValid}
                >
                    Next
                </button>
            </div>
        </form>
    );
}