import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Videos />} />
        <Route path='videos' element={<Videos />} />
        <Route path='videos/:keyword' element={<Videos />} />
        <Route path='videos/watch/:videoId' element={<VideoDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
