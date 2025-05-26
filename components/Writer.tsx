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
      <figure className="w-9 h-9 bg-black flex items-center justify-center select-none rounded-full overflow-hidden">
        {!Validate.goodStringValue(writer.profileImageUrl) ? (
          <p className="text-gray-300 text-sm font-black font-urban">
            {writer.username[0]}
          </p>
        ) : (
          typeof writer.profileImageUrl === "string" && (
            <img
              src={writer.profileImageUrl}
              className="w-full h-full object-contain"
            />
          )
        )}
      </figure>
      <div className="text-sm">
        <p>{writer.fullName}</p>
        <p className="font-urban font-bold">@ {writer.username}</p>
      </div>
    </div>
  );
}
