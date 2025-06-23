import { ReactElement } from "react";

export default function NotFound(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-950 font-spacegr">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl">
        Sorry, the page you&apos;re looking for does not exist.
      </p>
    </div>
  );
}
