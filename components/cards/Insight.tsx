import { Insight } from "@/interfaces/Insights";
import Image from "next/image";
import { ReactElement } from "react";

interface InsightCardProps {
  data: Insight;
}

export const InsightCard = ({ data }: InsightCardProps): ReactElement => {
  return (
    <div className="max-w-full rounded-md overflow-hidden shadow">
      <div className="w-full h-72 flex items-center justify-center bg-black">
        {typeof data.imageUrl === "string" && data.imageUrl.length >= 3 ? (
          <Image
            src={data.imageUrl}
            alt={data.title ?? "Insight Image"}
            className="object-contain object-center w-full h-full"
            width={300}
            height={150}
            loading={"lazy"}
          />
        ) : (
          <p className="text-lg font-medium text-gray-400">No Image</p>
        )}
      </div>

      <div className=""></div>
    </div>
  );
};
