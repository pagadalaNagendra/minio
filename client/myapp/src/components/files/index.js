import React, { Component } from 'react';
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class FileList extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
      const parts = token.split(',');
      const extractedPart= parts[0];
      const username = extractedPart.split('@')[0];
      console.log(username)
    fetch(`http://localhost:4000/files/${username}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch files');
        }
      })
      .then((data) => {
        this.setState({ files: data });
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }

  downloadFile = (filename) => {
    const token = localStorage.getItem("token")
      const parts = token.split(',');
      const extractedPart= parts[0];
      const username = extractedPart.split('@')[0];
      console.log(username)
    window.open(`http://localhost:4000/download/${username}/${filename}`);
  };

  onLogout=()=>{
    localStorage.removeItem("token")
  }

  render() {
    const { files } = this.state;

    return (
      <div>
        <div className='content-container'>
          <h1>Files List</h1>
          <div>
            <Link to="/image" ><button className="link">upload Files</button></Link>
            <Link to="/login"><button className='link' onClick={this.onLogout}>logout</button></Link>
          </div>
        </div>
        <ul className='files'>
          {files.map((file, index) => (
            <li key={index} className='thumbnail'>
              <div>
                <img
                  src={`http://localhost:4000/thumbnail/${file}`}
                  alt={file}
                />
              </div>
              <div className='name_download'>
              <span>{file}</span>
              <button onClick={() => this.downloadFile(file)}>
              <FontAwesomeIcon icon={faDownload} />
              </button>
              </div>
            </li>
          
          ))}
        </ul>
        
      </div>
    );
  }
}

export default FileList;




