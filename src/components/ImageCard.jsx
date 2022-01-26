import React from 'react';

export default function ImageCard({ image, title, text, date }) {
  return (
    <div className="ImageCard">
      <h3 className="card-title">{title}</h3>
      <p className="card-date">Date: {date}</p>
      <img src={image} className="card-image" />
      <p className="card-text">{text}</p>
    </div>
  );
}
