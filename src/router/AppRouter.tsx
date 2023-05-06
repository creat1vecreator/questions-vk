import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Booking } from '@/pages/Booking';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
};
