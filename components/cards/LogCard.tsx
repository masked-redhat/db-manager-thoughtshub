"use client";

import { useState } from "react";
import Timestamps from "../Timestamps";
import { Badge } from "../ui/badge";

export default function LogCard({ log }: { log: any }) {
  return <div>{log.type === "Response" && <ResponseLog log={log} />}</div>;
}

function ResponseLog({
  log,
}: {
  log: {
    responseTitle: string;
    responseDescription: string | null;
    responseCode: number | null;
    responseType: string;
    responseValues: any;
    createDate: string;
    updateDate: string;
  };
}) {
  const type = log.responseType;
  const code = log.responseCode;
  const [valuesShowing, setValuesShowing] = useState(false);

  return (
    <div className="w-full border-b flex flex-col gap-2 px-2 py-2">
      <Timestamps timestamps={log} />
      <div className="flex gap-2 items-center">
        <Badge>
          {code} {type}
        </Badge>
        <p className="text-lg font-semibold">{log.responseTitle}</p>
      </div>
      <p className="text-gray-600">{log.responseDescription}</p>
      <div
        onClick={() => setValuesShowing(!valuesShowing)}
        className="bg-gray-200 px-4 py-1 w-fit rounded-full flex items-center gap-2 text-sm cursor-pointer"
      >
        <p>{valuesShowing ? "Hide" : "Show"} Values</p>
      </div>
      {valuesShowing && (
        <div className="p-4 text-sm rounded-md bg-gray-50">
          <JsonViewer data={log.responseValues} />
        </div>
      )}
    </div>
  );
}

const JsonViewer = ({ data, level = 0 }: { data: any; level?: number }) => {
  if (typeof data !== "object" || data === null) {
    return <span>{String(data)}</span>;
  }

  const indent = { paddingLeft: `${level * 2}rem` };

  return (
    <div style={level === 0 ? {} : indent}>
      <p>{"{"}</p>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className={`mb-1 pl-4`}>
          <span className="text-slate-900 font-semibold">{key}</span>
          <span className="text-gray-500">: </span>
          {typeof value === "object" && value !== null ? (
            <JsonViewer data={value} level={level + 1} />
          ) : (
            <span className="text-gray-700 tracking-wider">
              {JSON.stringify(value)}
            </span>
          )}
        </div>
      ))}
      <p>{"}"}</p>
    </div>
  );
};
