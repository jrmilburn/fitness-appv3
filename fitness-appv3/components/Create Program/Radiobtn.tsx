import styles from './Radiobtn.module.css'

export default function RadioBtn({ id, name, text, onChange }) {
  return (
      <div className={styles['container']}>
          <div className={styles['relative']}>
              <input
                  type="radio"
                  id={id}
                  name={name}
                  value={text}
                  className={styles['input']}
                  onChange={onChange}
              />
              
              <label
                  htmlFor={id}
                  className={`${styles['label']} ${styles['checked']}`}
              >
                  {text}
              </label>
          </div>
      </div>
  );
}