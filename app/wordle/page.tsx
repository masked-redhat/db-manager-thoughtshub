"use client";

import WordleWordCard from "@/components/cards/WordleWordCard";
import PleaseWait from "@/components/PleaseWait";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);

  const getWords = useCallback(async (withLoading = false) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    const result = await client.fetchAdmin("GET", `/wordle/words`);
    if (result.ok) {
      setWords(result.json.words);
    } else toast("Words fetch failed", { description: result.json.message });

    if (withLoading) setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getWords(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <TitleWithRefreshBtn
        title="Wordle Words"
        refreshing={refreshing}
        func={() => getWords()}
      />

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : words.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">No words found</p>
        ) : (
          <div className="flex flex-wrap w-full md:gap-5 gap-3">
            {words.map((w) => {
              return <WordleWordCard key={w.id} word={w} refresh={getWords} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
