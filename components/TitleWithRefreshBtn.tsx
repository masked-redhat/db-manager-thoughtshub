import { MouseEventHandler } from "react";
import PleaseWait from "./PleaseWait";
import { Button } from "./ui/button";

export default function TitleWithRefreshBtn({
  refreshing,
  func,
  title,
}: {
  refreshing: boolean;
  func: MouseEventHandler<HTMLButtonElement>;
  title: string;
}) {
  return (
    <div className="flex gap-4 items-center w-fit select-none">
      <h1 className="font-semibold font-urban md:text-3xl text-xl">{title}</h1>
      <Button
        size={"sm"}
        className="cursor-pointer select-none"
        disabled={refreshing}
        onClick={func}
      >
        {refreshing ? <PleaseWait /> : <p>Refresh</p>}
      </Button>
    </div>
  );
}

export function Title({ title }: { title: string }) {
  return (
    <div className="flex gap-4 items-center w-fit select-none">
      <h1 className="font-semibold font-urban md:text-3xl text-xl">{title}</h1>
    </div>
  );
}
