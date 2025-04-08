import React from "react";

const WriterCard = ({ data }) => {
  return (
    <div className="flex gap-2 items-center">
      {typeof data.profileImageUrl === "string" &&
      data.profileImageUrl.length !== 0 ? (
        <img
          src={data.profileImageUrl}
          alt="Error"
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <div className="flex items-center justify-center bg-black text-white w-12 h-12 rounded-full capitalize select-none">
          {data.fullName[0]}
        </div>
      )}

      <div className="flex flex-col gap-0">
        <p className="font-bold text-lg">{data.fullName}</p>
        <p className="text-xs font-inter">@{data.username}</p>
      </div>
    </div>
  );
};

export default WriterCard;
