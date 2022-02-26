import './App.css';
const axios = require("axios");

const URL = process.env.URL || "http://localhost:3001/api";

const login = async () => {
  const loginData = await axios.post(`${URL}/users/login`, { email: document.getElementById("email_entry").value, password: document.getElementById("pwd_entry").value });
  if(loginData.status === 200) {
    const ehrCase = await axios.get(`${URL}/ehrs/unreviewed`, { headers: {"Authorization": loginData.data.token} });
    if(ehrCase.status === 200) {
      <p> Please review this case </p>
        document.getElementById("case_box").innerHTML = ehrCase.data.case.description;
      // const conditions = await axios.get(`${URL}/ehrs/unreviewed`, { headers: {"Authorization": loginData.data.token} });
    }
    

  }
}


function App() {
  return (
    <form>
      <div >
        <p> GYANT Test case </p>
        <label>Email: <input type="text" name="email_entry" id="email_entry" /> </label>
        <label> Password: <input type="text" name="pwd_entry" id="pwd_entry"/> </label>
        <button type="button" onClick={login}> Login </button>
  
        <div id="case_box"> </div>
      </div>
    </form>
  );
}

export default App;
