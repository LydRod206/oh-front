import './gallery.css';
import { useState } from "react";
import axios from "axios";
import React from "react";



function App() { 
  const [images, SetImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);

  function handleRemoveImg(imgObj){
    setImageToRemove(imgObj.public_id);
    axios.delete(`http://localhost:3000/${imgObj.public_id}`)
    .then(() => {
        setImageToRemove(null);
        SetImages((prev) => prev.filter( (img) => img.public_id !== imgObj.public_id));
    }).catch((e) => console.log(e));

    }
  
  function handleOpenWidget() {  
    var myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: 'dzrylb67r',
            uploadPreset: 'ml_default'
        }, 
        (error, result) => {
            if (!error && result && result.event === "success") {
               SetImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id}])
            }
        }
    ); 
    // open widget
    myWidget.open();
   
  } 
    return (
      <div className="App">
        <button id="upload-widget" className="cloudinary-button" onClick={() => handleOpenWidget()}>Upload pictures</button>
          <div className="images-preview-container">
            {images.map((image)=> (
                <div className="image-preview">
                    <img alt= "" src={image.url}/>
                    {imageToRemove !== image.oublic_id && <i className="fa fa-times-circle close-icon" onclick={() => handleRemoveImg(image)}></i>}
                </div>
            ))}
          </div>
      </div>
    );
    }

    export default App;