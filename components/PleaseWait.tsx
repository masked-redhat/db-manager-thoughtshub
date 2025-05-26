import { Loader2 } from "lucide-react";
import React from "react";

export default function PleaseWait({ text = true }: { text?: boolean }) {
  return (
    <div className="flex gap-2 items-center">
      <Loader2 className="animate-spin" />
      {text ? <span>Please wait</span> : null}
    </div>
  );
}
