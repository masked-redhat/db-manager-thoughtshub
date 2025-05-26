"use client";

import { Validate } from "@/services/ValidationService";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { TbError404 } from "react-icons/tb";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTransfer } from "@/contexts/TransferCcontext";
import Link from "next/link";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { toast } from "sonner";
import PleaseWait from "../PleaseWait";

export default function NewsCard({ news, refresh }: any) {
  const { setData } = useTransfer();
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [langEng, setLangEng] = useState(true);
  const [title, setTitle] = useState(langEng ? news.title : news.hindiTitle);
  const [body, setBody] = useState(langEng ? news.body : news.hindiBody);
  const [deleting, setDeleting] = useState(false);

  const deleteNews = async () => {
    setDeleting(true);

    const result = await client.fetchAdmin("DELETE", `/news?newsId=${news.id}`);
    if (result.ok) {
      toast("News deleted", { description: result.json.message });
      refresh();
    } else {
      toast("News deletion failed", { description: result.json.message });
    }

    setDeleting(false);
  };

  useEffect(() => {
    setTitle(langEng ? news.title : news.hindiTitle);
    setBody(langEng ? news.body : news.hindiBody);

    return () => {};
  }, [langEng]);

  return (
    <div className="rounded-lg shadow-md sm:w-md w-full md:min-h-[540px] min-h-[440px] overflow-hidden flex flex-col gap-2 group">
      <figure className="w-full md:h-64 h-54 bg-black flex items-center justify-center select-none relative">
        {!Validate.goodStringValue(news.imageUrl) ? (
          <p className="text-gray-300 text-xl font-black font-urban">
            No Image
          </p>
        ) : (
          <img src={news.imageUrl} className="w-full h-full object-contain" />
        )}
        <Badge
          className="absolute top-2 right-2 rounded-sm"
          variant={"secondary"}
        >
          {news.status}
        </Badge>
        <Badge className="absolute bottom-2 right-2 z-10">
          {Validate.goodStringValue(news.category)
            ? news.category
            : "Not categorised"}
        </Badge>
      </figure>
      <div className="flex flex-col gap-1 px-4 pb-2">
        <div className="md:flex hidden justify-between gap-2 items-center w-full">
          <p className="text-xs text-gray-500">
            {new Date(Number(news.updateDate))
              .toISOString()
              .replace("T", " | ")
              .slice(0, -8)}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(Number(news.createDate))
              .toISOString()
              .replace("T", " | ")
              .slice(0, -8)}
          </p>
        </div>
        <div className="w-full">
          {Validate.goodStringValue(title) ? (
            <h2 className="md:text-2xl text-lg font-black">{title}</h2>
          ) : (
            <div className="flex items-center gap-2 text-2xl font-black">
              <p>-</p>
              <TbError404 />
            </div>
          )}
        </div>
        <div className="w-full">
          {Validate.goodStringValue(body) ? (
            <h2 className="text-gray-600 md:text-base text-sm">{body}</h2>
          ) : (
            <div className="flex items-center gap-2 text-gray-600 text-2xl font-black">
              <p>-</p>
              <TbError404 />
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto px-4 pb-3 flex items-center justify-between">
        <div className="flex *:flex *:items-center *:justify-center *:p-2 *:w-10 *:h-8 *:select-none overflow-hidden rounded-md *:cursor-pointer *:transition-colors text-sm shadow w-fit">
          <button
            className={`${
              langEng ? "bg-gray-800 text-gray-100" : "bg-gray-100"
            }`}
            onClick={() => setLangEng(true)}
          >
            En
          </button>
          <button
            className={`${
              !langEng ? "bg-gray-800 text-gray-100" : "bg-gray-100"
            }`}
            onClick={() => setLangEng(false)}
          >
            हिं
          </button>
        </div>
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
          <button onClick={deleteNews} disabled={deleting}>
            {deleting ? (
              <PleaseWait text={false} />
            ) : (
              <MdDelete
                className="shadow rounded-full p-2 bg-black text-white"
                size={35}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
