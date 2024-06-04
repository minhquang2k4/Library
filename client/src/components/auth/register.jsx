import styles from "./register.module.css";

const Register = () => {
  return (
    <div>
      <h1 className={styles.register}>Register</h1>
      <div className={styles.container}>
        <form className={styles.form} method="POST" action="http://localhost:8000/register" >
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button className={styles.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
