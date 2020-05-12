import React from 'react';

const FormatSelect = ({ name, value, handleChange }) => (
  <select name={name} value={value} onChange={handleChange}>
    <option value="BMP">BMP</option>
    <option value="PNG">PNG</option>
    <option value="JPG">JPG</option>
  </select>
)

class UploadDemo extends React.Component {
	constructor() {
		super()
		this.state = {
			color:"black",
			format: "BMP",
			image: null,
			imageURL: null,
			newimageURL: null
		}
		this.inputOpenFileRef = React.createRef()
	}

	//Brings up File Navigator
	showOpenFileDlg = () => {
    	this.inputOpenFileRef.current.click()
	}

	//Handlers ----------

	handleSelect = (event) => {
    	this.setState({ [event.target.name]: event.target.value });
  	}

  	handleImage = (event) => {
	    this.setState({
	      imageURL: URL.createObjectURL(event.target.files[0]),
	      image: event.target.files[0]
	    })
  	}

	handleSubmit = e => {
  		var formData = new FormData();
  		formData.append("image", this.state.image)
  		formData.append("oldformat", this.state.image.name.split('.').pop())
  		formData.append('format', this.state.format)
		fetch("http://127.0.0.1:8000/image/convert", {
		    method: "POST",
		    body: formData}).then(response => response.blob()).then(res => {this.setState({
		    	newimageURL: URL.createObjectURL(res)
		    })})
		 };

  	/// ----------------

     render() {
        return (
        	<div className="App">
                <input onChange={this.handleImage} ref={this.inputOpenFileRef} type="file" style={{display:"none"}}/>
	            <button onClick={this.showOpenFileDlg}>Open</button>
      			<FormatSelect name="format" value={this.state.format} handleChange={this.handleSelect} />
            	<header className="App-upload">	
            	    <img src={this.state.imageURL}/>
            	</header>
            	<header className="App-upload">	
	            	<button onClick={this.handleSubmit}>Upload</button>
	        	</header>
	       		<header className="App-upload">	
	       			New Image
	       		</header>
	        	<header className="App-upload">	
            	    <img src={this.state.newimageURL}/>
            	</header>
	        </div>
	    )
     }
}

export default UploadDemo