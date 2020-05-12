import React from 'react';
import './App.css';
import UploadDemo from './upload'

function App() {
  return (
    <div className="App">
      <header className="App-bighead">
      	Image formatting application	
      </header>
      <header className="App-header">
      	Please select an image and a requested output format
      	<UploadDemo/>
      </header>
    </div>
  );
}

export default App;
