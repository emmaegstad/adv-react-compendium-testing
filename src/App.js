import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=YunY96dmRe6pkaOAen1SKJJPUFEd2a7TbMPGntRj&count=10'
      );
      const data = await rawData.json();
      setPictures(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {pictures.map((picture) => {
        return <img key={picture.id} src={picture.url} className="image" />;
      })}
    </div>
  );
}

export default App;
