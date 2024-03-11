import {Component} from "react"
import "./index.css"
import { Link } from "react-router-dom"
import { Redirect } from 'react-router-dom';

class Login extends Component{

    state={
        username:"",
        password:"",
        redirectToFiles: false,
    }

    onusernameChange = (e)=>{
        this.setState({
            username:e.target.value
        })
    }

    onpasswordChange=(e)=>{
        this.setState({
            password:e.target.value
        })
    }

    onLogin=(e)=>{
        
        e.preventDefault()
        const {username,password}= this.state
        fetch("http://localhost:4000/login",{
            method:"POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body:JSON.stringify({
                username,
                password
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            const obj = [username,data["token"]]
            //     token:data["token"],
            //     user: username
            // }
            console.log(obj[0])
            localStorage.setItem("token",obj)
            this.setState({
                username:"",
                password:"",
                redirectToFiles: true,
            })
        })
    }

    render(){
        const {redirectToFiles}= this.state
        if (redirectToFiles) {
            return <Redirect to="/files" />;
          }
        const {username,password}= this.state
        return(
            <div className="registerLogin-body">
                <form className="register" onSubmit={this.onLogin}>
                    <h1>Login</h1>
                    <label className="label" htmlFor="username">Enter Username</label>
                    <input onChange={this.onusernameChange} id="username" value={username} placeholder="Username" className="input" type="email" required />
                    <label className="label" htmlFor="password">Enter Password</label>
                    <input id="password" onChange={this.onpasswordChange} className="input" value={password} type="password" placeholder="Password" required />
                    <p className="para">
                    New user? <Link to="/register">Register</Link>
                    </p>
                    <input type="submit" className="submit" id="submit" value="Login" />
                </form>
            </div>
        )
    }
}

export default Login