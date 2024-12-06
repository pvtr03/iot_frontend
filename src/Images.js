import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Images.css';

function Images() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://iot-project-n2ue.onrender.com/image/display')
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the images!', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="images-container">
      {loading ? (
        <div className="loader"></div>
      ) : (
        images.map(image => (
          <img key={image._id} src={`data:image/jpeg;base64,${image.image_data}`} alt="Fetched from server" className="image-item" />
        ))
      )}
    </div>
  );
}

export default Images;