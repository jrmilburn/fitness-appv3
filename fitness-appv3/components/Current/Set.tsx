import { useState, useEffect } from 'react';
import styles from './Set.module.css';

export default function Set({ setId, Rir, workout, setWorkout }) {
  const [isChecked, setIsChecked] = useState(false);
  const [focusedInput, setFocusedInput] = useState(''); // State to track which input is focused
  const [weight, setWeight] = useState(null);
  const [reps, setReps] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/set/${setId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.reps === 0) {
        setReps(null)
      } else {
        setWeight(data.weight);
        setReps(data.reps);
        setIsChecked(data.completed);
      }
    })
    .catch(error => console.error('Error:', error));
  }, [setId]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/set/${setId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ weight, reps, completed: isChecked })
    });
  }, [isChecked]);

  const handleSubmit = async (e, setId) => {
    e.preventDefault();
    const newCheckedValue = !isChecked;

    setIsChecked(newCheckedValue);

    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise => ({
        ...exercise,
        sets: exercise.sets.map(set => 
          set.id === setId ? { ...set, completed: newCheckedValue } : set
        )
      }))
    }));
  };

  return (
    <>
      <div className={styles['setContainer']}>
        <input
          type="number"
          placeholder="Weight"
          className={`${styles['input']} ${focusedInput === 'weight' ? styles['focused'] : ''}`}
          onFocus={() => setFocusedInput('weight')}
          onBlur={() => setFocusedInput('')}
          value={weight || ''}
          onChange={(e) => setWeight(+e.target.value)}
          disabled={workout.completed}
        />

        <input
          type="number"
          placeholder={`${Rir} RIR`}
          className={`${styles['input']} ${focusedInput === 'reps' ? styles['focused'] : ''}`}
          onFocus={() => setFocusedInput('reps')}
          onBlur={() => setFocusedInput('')}
          value={reps || ''}
          onChange={(e) => setReps(+e.target.value)}
          disabled={workout.completed}
        />

        <button
          onClick={(e) => handleSubmit(e, setId)}
          className={`${styles['checkbox']} ${isChecked ? styles['checked'] : ''}`}
          disabled={workout.completed}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles['checkIcon']}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`${styles['recommendationsContainer']} ${
          focusedInput ? styles['expanded'] : styles['collapsed']
        }`}
      >
        <div className={styles['recommendationsText']}>
          <div className={`${styles['text']} ${focusedInput === 'weight' ? styles['show'] : ''}`}>
            Recommended weight: 100kg
          </div>
          <div className={`${styles['text']} ${focusedInput === 'reps' ? styles['show'] : ''}`}>
            Recommended reps: 10
          </div>
        </div>
      </div>
    </>
  );
}