import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex space-x-3">
        
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s] shadow-lg shadow-blue-400"></div>
        
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s] shadow-lg shadow-blue-400"></div>
        
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce shadow-lg shadow-blue-400"></div>
      
      </div>
    </div>
  );
}

export default Loader;