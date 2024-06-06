import styles from "./register.module.css";

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const username = event.target.username.value;
      const email = event.target.email.value;
      const password = event.target.password.value;

      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (data.message) {
        window.location.href = "/login";
      } else {
        alert("An error occurred while trying to register.");
      }
    } catch (error) {
      alert("An error occurred while trying to register.");
    }
  };
  return (
    <div>
      <h1 className={styles.register}>Register</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
