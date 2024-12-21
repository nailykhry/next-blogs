'use client';

import React from 'react';

const DateFormatter = ({ date }) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = formattedDate.toLocaleString('en-GB', { month: 'long' });
  const year = formattedDate.getFullYear();

  return <span>{`${day} ${month} ${year}`}</span>;
};

export default DateFormatter;
