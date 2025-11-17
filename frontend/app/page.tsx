"use client";
import React from 'react';

type iProps = object
console.log("BACKEND_URL = ", process.env.NEXT_PUBLIC_BACKEND_DOC_URL);

const i: React.FC<iProps> = ({  }) => {
  return (
    <div className="">
      hello
    </div>
  );
};

export default i;
