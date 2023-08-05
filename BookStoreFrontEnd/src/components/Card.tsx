import React from 'react';

interface CardProps {
  id: number;
  image?: string;
  title: string;
  writer: string;
  point: number;
  discount?: number;
}

const Card: React.FC<CardProps> = ({ image, title, point, discount }) => {
  return (
    <div className="h-257 w-full">
      <img
        src={image}
        alt={'img'}
        style={{ maxWidth: '100%', maxHeight: '187px', width: '100%' }}
      />
      <div className="h-70 mx-5 flex flex-col justify-evenly">
        <div className="h-14 flex items-center">
          <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span
              style={{ fontSize: '14px', lineHeight: '14px' }}
              className=" font-noto-sans-cjk-kr font-medium tracking-tighter text-gray-800 ">
              {title}
            </span>
          </div>
        </div>
        <div className=" h-16 flex justify-between items-center">
          <span
            style={{ fontSize: '14px', lineHeight: '14px' }}
            className="w-27 h-14 font-roboto font-bold text-red-600">
            {discount}%
          </span>
          <div>
            <span
              style={{ fontSize: '16px', lineHeight: '16px' }}
              className="w-50 h-16 font-roboto font-bold  text-gray-800">
              {point}
            </span>
            <span
              style={{ fontSize: '14px', lineHeight: '14px' }}
              className="w-13 h-14 font-noto-sans-cjk-kr font-medium  tracking-tighter">
              {'$'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
