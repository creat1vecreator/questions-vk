import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Booking } from '@/pages/Booking';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/question1" element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
