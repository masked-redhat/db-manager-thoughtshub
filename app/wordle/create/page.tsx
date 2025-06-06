"use client";

import PleaseWait from "@/components/PleaseWait";
import { Title } from "@/components/TitleWithRefreshBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTransfer } from "@/contexts/TransferCcontext";

export default function Page() {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [values, setValues] = useState<{
    day: string;
    word: string;
    hindiTranslation: string;
    englishMeaning: string;
    hindiMeaning: string;
    englishSentenceUse: string;
    hindiSentenceUse: string;
  }>({
    day: "",
    word: "",
    hindiTranslation: "",
    englishMeaning: "",
    hindiMeaning: "",
    englishSentenceUse: "",
    hindiSentenceUse: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const { data } = useTransfer();

  const resetValues = () => {
    setEditing(false);
    setValues({
      ...values,
      day: "",
      word: "",
      hindiTranslation: "",
      englishMeaning: "",
      hindiMeaning: "",
      englishSentenceUse: "",
      hindiSentenceUse: "",
    });
  };

  const submitWithStatus = async (status: string) => {
    setSubmitting(true);

    const body = { ...values, status };

    const result = editing
      ? await client.fetchAdmin("PUT", "/wordle", {
          ...body,
          wordId: data.word.id,
        })
      : await client.fetchAdmin("POST", "/wordle", body);
    if (result.ok) {
      toast(editing ? "Word updated" : "Word created", {
        description: result.json.message,
      });
      resetValues();
    } else {
      toast(`Word couldn't be ${editing ? "updated" : "created"}`, {
        description: result.json.message,
      });
    }

    setSubmitting(false);
  };

  useEffect(() => {
    if (data !== null && data.editingWord === true) {
      setEditing(true);
      setValues({ ...data.word });
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3">
      <div className="flex flex-wrap gap-3">
        <Title title={(editing ? "Edit" : "Create") + " Word"} />
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
            onClick={() => submitWithStatus("Published")}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className={`tracking-wide w-full gap-3 flex flex-col h-full`}>
        <Input
          placeholder="Day [format: dd-mm-yyyy]"
          className="w-full max-w-xl font-bold font-urban"
          value={values.day}
          onChange={(e) =>
            setValues({ ...values, day: e.target.value.toLowerCase() })
          }
        />
        <div className="flex gap-3 w-xl">
          <Textarea
            className="!text-2xl font-medium w-xl"
            placeholder="Word"
            value={values.word}
            onChange={(e) =>
              setValues({ ...values, word: e.target.value.toLowerCase() })
            }
          />
          <Textarea
            placeholder="Word (hindi)"
            className="!text-2xl font-medium w-xl"
            value={values.hindiTranslation}
            onChange={(e) =>
              setValues({ ...values, hindiTranslation: e.target.value })
            }
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-col gap-3 w-xl h-full">
            <Textarea
              className="!text-xl h-auto font-medium py-2 px-4 w-full"
              placeholder="English meaning"
              value={values.englishMeaning}
              onChange={(e) =>
                setValues({ ...values, englishMeaning: e.target.value })
              }
            />
            <Textarea
              className="!text-lg h-44 w-full py-2 px-4"
              placeholder="English sentence use"
              value={values.englishSentenceUse}
              onChange={(e) =>
                setValues({ ...values, englishSentenceUse: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-3 w-xl h-full">
            <Textarea
              placeholder="Hindi meaning"
              className="!text-xl h-auto font-medium py-2 px-4 w-full"
              value={values.hindiMeaning}
              onChange={(e) =>
                setValues({ ...values, hindiMeaning: e.target.value })
              }
            />
            <Textarea
              placeholder="Hindi sentence use"
              className="!text-lg h-44 w-full py-2 px-4"
              value={values.hindiSentenceUse}
              onChange={(e) =>
                setValues({ ...values, hindiSentenceUse: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
