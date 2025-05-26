import { spaceGrotesk } from "@/constants/fonts";

// app/not-found.tsx
export default function NotFound() {
  return (
    <div
      className={
        "flex flex-col items-center justify-center h-full text-center text-slate-950 " +
        spaceGrotesk
      }
    >
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl">
        Sorry, the page you're looking for does not exist.
      </p>
    </div>
  );
}
