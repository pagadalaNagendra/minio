import {Component} from "react"
import "./index.css"
import { Link } from "react-router-dom"

class Register extends Component{

    state={
        username:"",
        password:"",
        cpassword:"",
        error:"",
        registration_successs:false,
        message:""

    }

    onRegister=(e)=>{
        e.preventDefault()
        const {username,password,cpassword}= this.state
        if(password!==cpassword){
            this.setState({
                error:"Password and Confirm password should be same"
            })
        }

        fetch("http://localhost:4000/register",{
            method:"POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body:JSON.stringify({
                username,
                password
            })
        })
        .then(response=>response.text())
        .then(data=>{
            console.log(data)
            this.setState({
                username:"",
                password:"",
                cpassword:"",
                message: data
            })
        })
        .catch(e=>console.log(e))

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

    oncpasswordChange=(e)=>{
        this.setState({
            cpassword:e.target.value
        })
    }

    render(){

        const {username,password,cpassword,error,message}= this.state
        return(
            <div className="registerLogin-body">
                <form onSubmit={this.onRegister} className="register">
                    <h1>Register</h1>
                    <label className="label" htmlFor="username">Enter Username</label>
                    <input onChange={this.onusernameChange} id="username" value={username} placeholder="Username" className="input" type="email" required />
                    <label className="label" htmlFor="password">Enter Password</label>
                    <input id="password" onChange={this.onpasswordChange} className="input" value={password} type="password" placeholder="Password" required />
                    <label className="label" htmlFor="cpassword">Confirm Password</label>
                    <input id="cpassword" onChange={this.oncpasswordChange} className="input" value={cpassword} type="password" placeholder="Confirm Password" required />
                    <p className="error">{error}</p>
                    <p className="para">
                    Already an user? <Link to="/login">Login</Link>
                    </p>
                    <input type="submit" className="submit" id="submit" value="Register" />
                    <p className="para">{message}</p>
                </form>
            </div>
        )
    }
}

export default Register