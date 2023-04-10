import React from 'react';

const Quote = ({ text }: { text: string }) => {
  return (
    <blockquote className="text-xl mt-6 mb-6 italic font-semibold text-gray-900">
      <p>{`"${text}"`}</p>
    </blockquote>
  );
};

export default Quote;
