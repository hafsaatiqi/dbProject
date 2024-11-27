import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/bookList';
import MemberList from './components/memberList';
import LibrarianList from './components/librarianList';
import BorrowingList from './components/borrowingList';
import ReservationList from './components/reservationList';
import FineList from './components/fineList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/librarians" element={<LibrarianList />} />
        <Route path="/borrowings" element={<BorrowingList />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/fines" element={<FineList />} />
      </Routes>
    </Router>
  );
};

export default App;
