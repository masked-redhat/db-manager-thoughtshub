import { ReactElement, ReactNode } from "react";

interface DivProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

/* Div.tsx – remove overflow-hidden */
export const Div = ({ children, className, title }: DivProps): ReactElement => (
  <div className={`${className} border border-gray-50 shadow rounded-md`}>
    <div className="flex flex-col md:p-5 p-2 md:gap-3 gap-2 w-full h-full">
      {typeof title === "string" && (
        <header>
          <p className="px-3 font-semibold lg:text-2xl md:text-lg">{title}</p>
        </header>
      )}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  </div>
);
