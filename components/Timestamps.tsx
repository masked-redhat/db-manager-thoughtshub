import React from "react";

export default function Timestamps({
  timestamps,
}: {
  timestamps: { updateDate: string; createDate: string };
}) {
  return (
    <div className="md:flex hidden justify-between gap-2 items-center w-full">
      <p className="text-xs text-gray-500">
        {new Date(Number(timestamps.updateDate))
          .toISOString()
          .replace("T", " | ")
          .slice(0, -8)}
      </p>
      <p className="text-xs text-gray-500">
        {new Date(Number(timestamps.createDate))
          .toISOString()
          .replace("T", " | ")
          .slice(0, -8)}
      </p>
    </div>
  );
}
