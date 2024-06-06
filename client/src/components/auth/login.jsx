import styles from "./login.module.css";

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.user) {
        localStorage.setItem('username', data.user.username); 
        window.location.href = "/";
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      alert("An error occurred while trying to log in.");
    }
  };

  return (
    <div>
      <h1 className={styles.login}>Login</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
