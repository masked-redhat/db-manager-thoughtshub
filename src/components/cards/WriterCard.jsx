import React from "react";

const WriterCard = ({ data }) => {
  return (
    <div className="flex gap-2 items-center">
      {typeof data.profileImageUrl === "string" &&
      data.profileImageUrl.length !== 0 ? (
        <img
          src={data.profileImageUrl}
          alt="Error"
          className="w-11 h-11 rounded-full"
        />
      ) : (
        <div className="flex items-center justify-center bg-black text-white w-11 h-11 rounded-full capitalize select-none">
          {data.fullName[0]}
        </div>
      )}

      <div className="flex flex-col w-fit">
        <p className="font-bold text-lg -mb-1 align-middle -mt-1.5">
          {data.fullName}
        </p>
        <p className="text-xs font-inter flex items-center gap-1">
          <span className="font-bold">@</span> {data.username}
        </p>
      </div>
    </div>
  );
};

export default WriterCard;
