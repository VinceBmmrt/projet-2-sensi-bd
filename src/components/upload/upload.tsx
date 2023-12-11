import { useState } from 'react';
import axios from 'axios';

async function postImage({ image, description }) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
  }
  formData.append('description', description);

  if (image) {
    const result = await axios.post('http://localhost:3000/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
  }
  return null;
}

function Upload() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await postImage({ image: file, description });
      const imageUrl = result.location; // Assurez-vous que 'location' est la clé retournée par votre serveur avec l'URL de l'image
      setImages([imageUrl, ...images]);
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image", error);
      // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
    }
  };

  const fileSelected = (event) => {
    const newfile = event.target.files[0];
    setFile(newfile);
  };

  return (
    <div className="upload">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*" />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>

      {/* {images.map((image) => (
        <div key={image}>
          <img src={image} alt="test" />
        </div>
      ))}

      <img src="/images/3cb55d781958f28139506906392ec289" alt="lalala" /> */}
    </div>
  );
}

export default Upload;
