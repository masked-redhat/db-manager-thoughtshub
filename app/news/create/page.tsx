"use client";

import PleaseWait from "@/components/PleaseWait";
import { Title } from "@/components/TitleWithRefreshBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useCallback, useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransfer } from "@/contexts/TransferCcontext";

export default function Page() {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [imageUrl, setImageUrl] = useState(null);
  const [values, setValues] = useState<{
    title: string;
    hindiTitle: string;
    body: string;
    hindiBody: string;
    status: string;
    category: string;
    imageUrl: string | null;
    newsUrl: string;
  }>({
    title: "",
    hindiTitle: "",
    body: "",
    hindiBody: "",
    status: "",
    category: "%none%",
    imageUrl: null,
    newsUrl: "",
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const { data } = useTransfer();

  const resetValues = () => {
    setEditing(false);
    setImageUrl(null);
    setValues({
      ...values,
      title: "",
      hindiTitle: "",
      hindiBody: "",
      body: "",
      category: "",
      newsUrl: "",
    });
  };

  const getCategories = useCallback(async () => {
    const result = await client.fetchAdmin("GET", "/categories");
    if (result.ok) setCategories(result.json.categories);
    else toast("Categories fetch failed", { description: result.json.message });
  }, []);

  const submitWithStatus = async (status: string) => {
    setSubmitting(true);

    const body = {
      ...values,
      status,
      category:
        values.category.length === 0 || values.category === "%none%"
          ? null
          : values.category,
      imageUrl: imageUrl,
    };

    const result = editing
      ? await client.fetchAdmin("PUT", "/news", {
          ...body,
          newsId: data.news.id,
        })
      : await client.fetchAdmin("POST", "/news", body);
    if (result.ok) {
      toast(editing ? "News updated" : "News created", {
        description: result.json.message,
      });
      resetValues();
    } else {
      toast(`News couldn't be ${editing ? "updated" : "created"}`, {
        description: result.json.message,
      });
    }

    setSubmitting(false);
  };

  useEffect(() => {
    getCategories();
    if (data !== null && data.editingNews === true) {
      setEditing(true);
      setValues({ ...data.news });
      setImageUrl(data.news.imageUrl);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3">
      <div className="flex flex-wrap gap-3">
        <Title title={(editing ? "Edit" : "Create") + " Insight"} />
        {submitting ? <PleaseWait /> : null}
        <div className="flex flex-wrap gap-3 mt-auto ml-auto *:cursor-pointer">
          <Button
            disabled={submitting}
            variant={"outline"}
            onClick={() => submitWithStatus("Draft")}
          >
            Save as Draft
          </Button>
          <Button
            disabled={submitting}
            variant={"outline"}
            onClick={() => submitWithStatus("On Review")}
          >
            Mark for review
          </Button>
          <Button
            disabled={submitting}
            onClick={() => submitWithStatus("Published")}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className={`tracking-wide w-full gap-3 flex flex-col h-full`}>
        <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <div>
          <p className="text-sm font-bold text-gray-500 mb-1 ml-2">Category</p>
          <Select
            onValueChange={(val) => setValues({ ...values, category: val })}
            value={values.category}
          >
            <SelectTrigger className="max-w-xl w-full">
              <SelectValue
                placeholder="Select a category"
                className="!text-lg"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="%none%">None</SelectItem>
                {categories.map((c) => (
                  <SelectItem value={c.name} key={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Input
          className="max-w-xl w-full !text-base py-2 px-4 mb-2"
          placeholder="News URL"
          value={values.newsUrl}
          onChange={(e) => setValues({ ...values, newsUrl: e.target.value })}
        />
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-col gap-3 w-xl">
            <Textarea
              className="!text-xl h-auto font-medium py-2 px-4 w-full"
              placeholder="Title"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
            <Textarea
              placeholder="Body"
              className="!text-lg h-44 w-full py-2 px-4"
              value={values.body}
              onChange={(e) => setValues({ ...values, body: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-3 w-xl h-full">
            <Textarea
              className="!text-xl h-auto font-medium py-2 px-4 w-full"
              placeholder="Hindi Title"
              value={values.hindiTitle}
              onChange={(e) =>
                setValues({ ...values, hindiTitle: e.target.value })
              }
            />
            <Textarea
              placeholder="Hindi Body"
              className="!text-lg h-44 w-full py-2 px-4"
              value={values.hindiBody}
              onChange={(e) =>
                setValues({ ...values, hindiBody: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const UploadImage = ({ imageUrl, setImageUrl }: any) => {
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const fileUpload = useRef<any>(null);

  const sendFile = async (file: any) => {
    if (file === null) return;

    setUploading(true);
    const result = await client.uploadFile(file);
    if (result.ok) setImageUrl(result.json.fileUrl);
    else {
      toast("Image uploading failed", { description: result.json.message });
      setFile(null);
      setImageUrl(null);
    }

    setUploading(false);
  };

  useEffect(() => {
    sendFile(file);

    return () => {};
  }, [file]);

  useEffect(() => {
    if (imageUrl === null) setFile(null);
  }, [imageUrl]);

  return (
    <div className="sm:w-96 w-full h-56">
      <Input
        type="file"
        ref={fileUpload}
        className="hidden"
        onChange={(val) => setFile(val?.target?.files?.[0])}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = "";
        }}
        accept=".jpg, .jpeg, .png, .webp, .avif, .svg, .tiff"
      />
      {[null, undefined, ""].includes(file) && imageUrl === null ? (
        <div
          className="w-full h-full border-2 border-gray-400 border-dashed rounded-md text-gray-400 flex items-center justify-center select-none bg-gray-100"
          onDrop={(ev) => {
            ev.stopPropagation();
            ev.preventDefault();

            let filesDropped: any[] = [];
            if (ev.dataTransfer.items) {
              // Use DataTransferItemList interface to access the file(s)
              [...ev.dataTransfer.items].forEach((item) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  filesDropped.push(file);
                }
              });
            } else {
              // Use DataTransfer interface to access the file(s)
              [...ev.dataTransfer.files].forEach((file) => {
                filesDropped.push(file);
              });
            }

            setFile(filesDropped[0]);
          }}
          onDragOver={(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
          }}
          onClick={() => fileUpload?.current?.click()}
        >
          Browse/Drop Files
        </div>
      ) : (
        <div
          className={`w-full h-full rounded-md relative flex items-center justify-center shadow ${
            !uploading && "bg-black group"
          } transition-all`}
        >
          {uploading ? (
            <PleaseWait />
          ) : (
            <>
              <img
                src={imageUrl ?? undefined}
                alt="Image"
                className="h-full w-full object-contain"
              />
              <TiDelete
                className="absolute top-2 right-2 text-white shadow cursor-pointer rounded-full text-3xl font-black z-20 opacity-0 group-hover:opacity-100 transition-all"
                onClick={() => {
                  setFile(null);
                  setUploading(false);
                  setImageUrl(null);
                }}
              />
              <div className="absolute top-0 right-0 z-10 bg-gradient-to-tr from-transparent from-56% to-black w-0 h-0 group-hover:w-32 group-hover:h-32 rounded-md opacity-0 group-hover:opacity-100 transition-all"></div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
