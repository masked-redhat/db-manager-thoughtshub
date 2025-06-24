import { Loader2 } from "lucide-react";
import React, { ReactElement } from "react";

interface PleaseWaitProps {
  text?: boolean;
}

export default function PleaseWait({
  text = true,
}: PleaseWaitProps): ReactElement {
  return (
    <div className="flex gap-2 items-center">
      <Loader2 className="animate-spin" />
      {text && <span>Please wait</span>}
    </div>
  );
}
