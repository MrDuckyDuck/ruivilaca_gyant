import './App.css';
const axios = require("axios");

const URL = process.env.URL || "localhost:3000/api";

const login = async () => {
  const token = await axios.post(`${URL}/users/login`, { email: document.getElementById("email_entry").value, password: document.getElementById("pwd_entry").value })
  console.log(token)
}


function App() {
  return (
    <form>
      <div >
        <p> GYANT Test case </p>
        <label>Email: <input type="text" name="email_entry" id="email_entry" /> </label>
        <label> Password: <input type="text" name="pwd_entry" id="pwd_entry"/> </label>
        <button type="button" onClick={login}> Login </button>
      </div>
    </form>
  );
}

export default App;
