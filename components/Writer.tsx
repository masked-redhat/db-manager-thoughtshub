import { Validate } from "@/services/ValidationService";

export default function Writer({
  writer,
}: {
  writer: {
    profileImageUrl: string | null;
    username: string;
    fullName: string;
  };
}) {
  return (
    <div className="pt-3 px-4 flex items-center gap-2">
      <figure className="w-9 h-9 bg-black flex items-center justify-center select-none rounded-sm overflow-hidden">
        {!Validate.goodStringValue(writer.profileImageUrl) ? (
          <p className="text-gray-300 text-sm font-black font-urban">
            {writer?.username?.[0] ?? "A"}
          </p>
        ) : (
          typeof writer.profileImageUrl === "string" && (
            <img
              src={writer.profileImageUrl}
              className="w-full h-full object-cover"
            />
          )
        )}
      </figure>
      <div className="text-sm">
        <p>{writer.fullName ?? "Anonymous"}</p>
        <p className="font-urban font-bold">@ {writer.username ?? "unknown"}</p>
      </div>
    </div>
  );
}
