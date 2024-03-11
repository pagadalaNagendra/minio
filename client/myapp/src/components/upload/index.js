import { Component } from 'react';
import "./index.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
    };
  }

  onFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  onFileUpload = () => {
    // const userDetails= localStorage.getItem("token")
    // console.log(userDetails["user"])
    const { selectedFile } = this.state;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const token = localStorage.getItem("token")
      const parts = token.split(',');
      const extractedPart= parts[0];
      const username = extractedPart.split('@')[0];

      formData.append("username",username)
      console.log("this is username", username)

      fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Failed to upload the file');
          }
        })
        .then((data) => {
          console.log(data);
          // Handle success (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error uploading the file:', error);
          // Handle error (e.g., show an error message)
        });
    } else {
      console.error('No file selected.');
      // Handle the case where no file is selected
    }
  };

  onLogout=()=>{
    localStorage.removeItem("token")
  }

  render() {
    return (
      <div className='upload-container'>
        <div className='upload'>
        <h1>File Upload</h1>
        <label htmlFor='file'>Upload File </label>
        <input
          id='file'
          type="file"
          onChange={this.onFileChange}
        /> 
        
        <button onClick={this.onFileUpload}>Upload</button>
        <Link to="/files"><button className='links'>Files</button></Link>
          <button onClick={this.onLogout}>logout</button>
        </div>
      </div>
    );
  }
}

export default FileUpload;
