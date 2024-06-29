import React from 'react';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>START YOUR SPORTS JOURNEY</h1>
      <p>Excited for something great? Dive into the world of sports!</p>
    </div>
  );
}

export default HeroSection;
