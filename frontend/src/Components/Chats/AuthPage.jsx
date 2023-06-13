import axios from "axios";

const AuthPage = (props) => {

  console.log("/ffds",props);
    const onSubmit = (e) => {
      e.preventDefault();
      const { value } = e.target[0];
      axios
      .post("http://localhost:3001/authenticate", { username: value })
      .then((r) => {
        console.log(r)
        props.onAuth({ ...r.data, secret: value })
      })
      .catch((e) => console.log("Auth Error", e));
   
    };
  
    return (
      <div  className="background">
        <form style={{width:"100%"}} onSubmit={onSubmit} className="form-card">
          <div style={{width:"100%"}} className="form-title">Welcome 👋</div>
  
          <div  style={{width:"100%"}}className="form-subtitle">Set a username to get started</div>
  
          <div style={{width:"100%"}} className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" />
            <button className="auth-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AuthPage;