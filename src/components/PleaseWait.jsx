import { Loader2 } from "lucide-react";
import React from "react";

const PleaseWait = ({ text = true }) => {
  return (
    <div className="flex items-center gap-2">
      <Loader2 className="animate-spin" />
      <span>{text ? "Please Wait..." : ""}</span>
    </div>
  );
};

export default PleaseWait;
