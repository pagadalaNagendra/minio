// import './App.css';
// import Register from './components/register';
// import Login from './components/login';
// import ImageUpload from './components/upload';
// import FileList from './components/files';
// import {BrowserRouter,Route,Switch,} from "react-router-dom"
// import { Component } from 'react';

// class App extends Component { 

//   state={
//     user:""
//   }

//   updateUser = (newUser) => {
//     this.setState({ user: newUser });
//   };

//   render(){

//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" render={(props) => <Register {...props} updateUser={this.updateUser} />} />
//           <Route path="/register" render={(props) => <Register {...props} updateUser={this.updateUser} />} />
//           <Route path="/login" render={(props) => <Login {...props} updateUser={this.updateUser} />} />
//           <Route path="/image" component={ImageUpload} />
//           <Route path="/files" render={(props) => <FileList {...props} user={this.state.user} />} />
//       </Switch>
//     </BrowserRouter>
//   );
// }
// }

// export default App;


import React, { Component } from 'react';
import Register from './components/register';
import Login from './components/login';
import ImageUpload from './components/upload';
import FileList from './components/files';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    // Check for a token in local storage
    const token = localStorage.getItem('token');

    if (token) {
      
      this.setState({ user: token[0] });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={user ? '/files' : '/register'} />} />
          <Route path="/register" render={(props) => <Register {...props} updateUser={this.updateUser} />} />
          <Route path="/login" render={(props) => <Login {...props} updateUser={this.updateUser} />} />
          <Route path="/image" component={ImageUpload} />
          <Route path="/files" component={ FileList} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
