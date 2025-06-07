"use client";

import { useCallback, useState } from "react";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { toast } from "sonner";
import DeleteBtn from "../DeleteBtn";
import { PiDotsThreeBold } from "react-icons/pi";
import { CardBody, CardTitle } from "../CardComponents";
import { ScrollArea } from "../ui/scroll-area";
import { useTransfer } from "@/contexts/TransferCcontext";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function WordleWordCard({ word, refresh }: any) {
  const { setData } = useTransfer();
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [deleting, setDeleting] = useState(false);
  const [hidden, setHidden] = useState(true);

  const deleteWord = useCallback(async () => {
    setDeleting(true);

    const result = await client.fetchAdmin(
      "DELETE",
      `/wordle?wordId=${word.id}`
    );
    if (result.ok) {
      toast("Word deleted", { description: result.json.message });
      refresh();
    } else {
      toast("Word deletion failed", { description: result.json.message });
    }

    setDeleting(false);
  }, []);

  return (
    <div className="flex gap-2 p-3 flex-col group max-w-[29rem] w-full rounded-md shadow">
      <div className="flex justify-between items-center gap-2">
        <p className="text-sm text-black font-urban tracking-wide font-bold">{word.day}</p>
        <Badge>{word.status}</Badge>
      </div>
      <div className="capitalize flex gap-2 h-10 justify-between items-center select-none">
        {hidden ? (
          <PiDotsThreeBold
            size={40}
            className="bg-gray-200 w-12 h-6 rounded-full"
          />
        ) : (
          <CardTitle title={word.word} />
        )}
        <div
          className="px-4 py-1 text-xs bg-gray-300 rounded-full cursor-pointer font-bold select-none"
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? "Show" : "Hide"}
        </div>
      </div>
      <ScrollArea className="flex flex-col gap-2 h-72">
        <WordBlock
          title="Hindi Translation"
          value={word.hindiTranslation}
          isTitle={true}
        />
        <WordBlock title="English Meaning" value={word.englishMeaning} />
        <WordBlock title="Hindi Meaning" value={word.hindiMeaning} />
        <WordBlock
          title="English Sentence Use"
          value={word.englishSentenceUse}
        />
        <WordBlock title="Hindi Sentence Use" value={word.hindiSentenceUse} />
      </ScrollArea>
      <div className="flex justify-end gap-2">
        <Link
          className="opacity-0 group-hover:opacity-100"
          href={"/wordle/create"}
          onClick={() => {
            setData({
              word: {
                ...word,
                word: word.word ?? "",
                hindiTranslation: word.hindiTranslation ?? "",
                englishMeaning: word.englishMeaning ?? "",
                hindiMeaning: word.hindiMeaning ?? "",
                englishSentenceUse: word.englishSentenceUse ?? "",
                hindiSentenceUse: word.hindiSentenceUse ?? "",
              },
              editingWord: true,
            });
          }}
        >
          <MdEdit
            className="shadow rounded-full p-2 bg-black text-white"
            size={35}
          />
        </Link>
        <DeleteBtn deleting={deleting} func={deleteWord} />
      </div>
    </div>
  );
}

function WordBlock({
  title,
  isTitle = false,
  value,
}: {
  title: string;
  value: any;
  isTitle?: boolean;
}) {
  return (
    <div className="flex gap-1 flex-col">
      <p className="text-xs text-gray-500 text-right bg-gray-100/40 px-3 py-0.5 rounded-sm font-urban font-semibold tracking-wide select-none">
        {title}
      </p>
      {isTitle ? <CardTitle title={value} /> : <CardBody body={value} />}
    </div>
  );
}
