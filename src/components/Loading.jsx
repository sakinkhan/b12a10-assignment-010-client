import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-50">
      <p className="font-primary text-4xl font-extrabold text-[#108251] ml-7">
        L<span className="loading loading-spinner text-error"></span>
        ading
        <span className="loading loading-dots loading-xl mt-3"></span>
      </p>
    </div>
  );
};

export default Loading;
