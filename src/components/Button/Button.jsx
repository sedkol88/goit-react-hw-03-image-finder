import styles from './button.module.css';

const Button = ({ onClick, type = 'submit', children }) => {
  return (
    <button onClick={onClick} type={type} className={styles.Button}>
      {children}
    </button>
  );
};

export default Button;
