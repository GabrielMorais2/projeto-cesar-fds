import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
        <p className="mt-4 text-xl text-gray-800">
          Algo está errado...
        </p>
        <p className="mt-2 text-gray-500">
          {error.status} - {error.statusText || error.message}
        </p>
        <a href="/dashboard" className="mt-5 inline-block text-blue-500">
          Go back!
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;