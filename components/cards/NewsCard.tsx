"use client";

import { Validate } from "@/services/ValidationService";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { MdEdit } from "react-icons/md";
import { useTransfer } from "@/contexts/TransferCcontext";
import Link from "next/link";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { toast } from "sonner";
import DeleteBtn from "../DeleteBtn";
import Timestamps from "../Timestamps";
import { CardBody, CardScrollArea, CardTitle } from "../CardComponents";

export default function NewsCard({ news, refresh }: any) {
  const { setData } = useTransfer();
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [langEng, setLangEng] = useState(true);
  const [title, setTitle] = useState(langEng ? news.title : news.hindiTitle);
  const [body, setBody] = useState(langEng ? news.body : news.hindiBody);
  const [deleting, setDeleting] = useState(false);

  const deleteNews = useCallback(async () => {
    setDeleting(true);

    const result = await client.fetchAdmin("DELETE", `/news?newsId=${news.id}`);
    if (result.ok) {
      toast("News deleted", { description: result.json.message });
      refresh();
    } else {
      toast("News deletion failed", { description: result.json.message });
    }

    setDeleting(false);
  }, []);

  useEffect(() => {
    setTitle(langEng ? news.title : news.hindiTitle);
    setBody(langEng ? news.body : news.hindiBody);
  }, [langEng]);

  return (
    <div className="rounded-lg shadow-md sm:w-md w-full md:min-h-[540px] min-h-[440px] overflow-hidden flex flex-col gap-2 group">
      <NewsImage
        imageUrl={news.imageUrl}
        status={news.status}
        category={news.category}
      />
      <div className="flex flex-col gap-1 px-4 pb-2">
        <Timestamps timestamps={news} />
        <CardScrollArea>
          <CardTitle title={title} />
          <CardBody body={body} />
        </CardScrollArea>
      </div>
      <div className="mt-auto px-4 pb-3 flex items-center justify-between">
        <NewsLangSwitchBtn langEng={langEng} setLangEng={setLangEng} />
        <div className="flex gap-2 items-center *:cursor-pointer *:*:hover:bg-gray-600 transition-all opacity-0 group-hover:opacity-100">
          <Link
            href={"/news/create"}
            onClick={() => {
              setData({
                news: {
                  ...news,
                  newsUrl: ["", undefined, null].includes(news.newsUrl)
                    ? ""
                    : news.newsUrl,
                  category: news.categoryId === null ? "%none%" : news.category,
                  imageUrl: ["", undefined, null].includes(news.imageUrl)
                    ? null
                    : news.imageUrl,
                  title: news.title ?? "",
                  body: news.body ?? "",
                  hindiTitle: news.hindiTitle ?? "",
                  hindiBody: news.hindiBody ?? "",
                },
                editingNews: true,
              });
            }}
          >
            <MdEdit
              className="shadow rounded-full p-2 bg-black text-white"
              size={35}
            />
          </Link>
          <DeleteBtn deleting={deleting} func={deleteNews} />
        </div>
      </div>
    </div>
  );
}

function NewsImage({
  imageUrl,
  status,
  category,
}: {
  imageUrl: string | null | undefined;
  status: string;
  category: string | null;
}) {
  return (
    <figure className="w-full md:h-64 h-54 bg-black flex items-center justify-center select-none relative">
      {!Validate.goodStringValue(imageUrl) ? (
        <p className="text-gray-300 text-xl font-black font-urban">No Image</p>
      ) : (
        typeof imageUrl === "string" && (
          <img src={imageUrl} className="w-full h-full object-contain" />
        )
      )}
      <Badge className="absolute top-2 right-2 rounded-sm">{status}</Badge>
      <Badge className="absolute bottom-2 right-2 z-10">
        {Validate.goodStringValue(category) ? category : "Not categorised"}
      </Badge>
    </figure>
  );
}

function NewsLangSwitchBtn({
  langEng,
  setLangEng,
}: {
  langEng: boolean;
  setLangEng: Function;
}) {
  return (
    <div className="flex *:flex *:items-center *:justify-center *:p-2 *:w-10 *:h-8 *:select-none overflow-hidden rounded-md *:cursor-pointer *:transition-colors text-sm shadow w-fit">
      <button
        className={`${langEng ? "bg-gray-800 text-gray-100" : "bg-gray-100"}`}
        onClick={() => setLangEng(true)}
      >
        En
      </button>
      <button
        className={`${!langEng ? "bg-gray-800 text-gray-100" : "bg-gray-100"}`}
        onClick={() => setLangEng(false)}
      >
        हिं
      </button>
    </div>
  );
}
