import React from 'react';
import book from "../../../images/book.png";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const Dashboard = () => {
  const [text] = useTypewriter({
    words: ['Dream It', 'Believe It', 'Achieve It'],
    loop: {}
  });

  return (
    <main className="w-screen h-[91vh] flex bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-[60%] h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl italic font-bold">Welcome to Quick Note!!</h1>
        <br />
        <span className="text-2xl font-light tracking-wide">{text}</span>
        <Cursor />
      </div>
      <div className="w-[40%] h-full flex items-center justify-center">
        <img src={book} alt="Notebook Illustration" className="w-[70%] h-[65%] drop-shadow-lg" />
      </div>
    </main>
  );
};

export default Dashboard;
