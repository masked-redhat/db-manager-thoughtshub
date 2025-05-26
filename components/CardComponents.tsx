import { Validate } from "@/services/ValidationService";
import { ReactNode } from "react";
import { TbError404 } from "react-icons/tb";
import { ScrollArea } from "./ui/scroll-area";

export function CardTitle({
  title,
}: {
  title: string | null | undefined | number;
}) {
  return (
    <div className="w-full">
      {Validate.goodStringValue(title) ? (
        <h2 className="md:text-2xl text-lg font-black whitespace-pre-line">
          {title}
        </h2>
      ) : (
        <div className="flex items-center gap-2 text-2xl font-black">
          <p>-</p>
          <TbError404 />
        </div>
      )}
    </div>
  );
}

export function CardBody({
  body,
}: {
  body: string | null | undefined | number;
}) {
  return (
    <div className="w-full">
      {Validate.goodStringValue(body) ? (
        <h2 className="text-gray-600 md:text-base text-sm whitespace-pre-line">
          {body}
        </h2>
      ) : (
        <div className="flex items-center gap-2 text-gray-600 text-2xl font-black">
          <p>-</p>
          <TbError404 />
        </div>
      )}
    </div>
  );
}

export function CardScrollArea({
  className,
  children,
  minimum = false,
}: {
  className?: string;
  minimum?: boolean;
  children?: ReactNode;
}) {
  return (
    <ScrollArea
      className={className ? className : minimum ? "max-h-80" : "h-80"}
    >
      {children}
    </ScrollArea>
  );
}
