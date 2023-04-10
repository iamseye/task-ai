import React from 'react';

interface TextCardPropsType {
  text: string;
  title?: string;
}
const TextCard = ({ text, title }: TextCardPropsType) => {
  return (
    <div className="full p-6 mt-4 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      {title && (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </h5>
      )}

      <p className="font-normal text-black">{text}</p>
    </div>
  );
};

export default TextCard;
