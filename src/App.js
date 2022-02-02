import './App.css';
import { useEffect, useState } from 'react';
import { imageDesc, imageAsc } from './services/images';
import ImageCard from './components/ImageCard';
import Filter from './components/Filter';

function App() {
  const [pictures, setPictures] = useState([]);
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (order === 'desc') {
        const data = await imageDesc();
        setPictures(data);
        setLoading(false);
      } else {
        const data = await imageAsc();
        setPictures(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [order]);

  if (loading) {
    return <p className="loader">Loading...</p>;
  }

  return (
    <div className="App">
      <h1 className="title">NASA Photo of the Day</h1>
      <Filter order={order} setOrder={setOrder} />
      <div className="image-list">
        {pictures.map((picture) => {
          return (
            <ImageCard
              key={picture.title}
              image={picture.url}
              title={picture.title}
              text={picture.explanation}
              date={picture.date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
