import style from "./register.module.css"


const Register = () => {
  return (
    <>
    <h1 className={style.register} >Register</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Register;
