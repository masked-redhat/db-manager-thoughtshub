"use client";

import NewsCard from "@/components/cards/NewsCard";
import PleaseWait from "@/components/PleaseWait";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { TbFilter, TbFilterX } from "react-icons/tb";
import { useCallback, useEffect, useState } from "react";
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
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NewsFilter from "@/components/NewsFilter";

export default function Page() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [sheetKey, setSheetKey] = useState<string>(Date.now().toString());
  const [order, setOrder] = useState<any>([["updateDate", "desc"]]);
  const { authToken } = useAuthToken();
  const [offset, setOffset] = useState<number>(0);
  const [offsetOver, setOffsetOver] = useState(false);
  const client = new APIClient(authToken);

  const getNews = useCallback(
    async (
      withLoading: boolean = false,
      values: any = {},
      offsetManual: any = null
    ) => {
      if (withLoading) setLoading(true);
      setRefreshing(true);

      let valuesForQuery = "";
      for (const key in values) {
        valuesForQuery += `&${key}=${values[key]}`;
      }
      if (valuesForQuery.length > 0) valuesForQuery += "&all=false";

      const result = await client.fetchAdmin(
        "GET",
        `/news?order=${JSON.stringify(order)}${valuesForQuery}&offset=${
          offsetManual ?? offset
        }`
      );
      if (result.ok) {
        setNews(result.json.news);
      } else toast("News fetch failed", { description: result.json.message });

      if (withLoading) setLoading(false);
      setRefreshing(false);
    },
    [offset, order]
  );

  useEffect(() => {
    getNews(true, filters);
  }, []);

  useEffect(() => {
    getNews(false, filters);
  }, [filters, order]);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-3 items-center select-none">
          <TitleWithRefreshBtn
            title="News"
            refreshing={refreshing}
            func={() => getNews(false, filters)}
          />
          <Sheet key={sheetKey}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <TbFilter /> Filters
              </Button>
            </SheetTrigger>
            <NewsFilter setValues={setFilters} />
          </Sheet>
          <button
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => {
              setSheetKey(Date.now().toString());
              setFilters({});
            }}
          >
            <TbFilterX />
          </button>
        </div>
        <div className="flex gap-2 items-center select-none">
          <p className="text-sm font-bold font-urban tracking-wide whitespace-nowrap">
            Order by :
          </p>
          <Select
            defaultValue="updateDate"
            onValueChange={(val) => setOrder([[val, order[0][1]]])}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a field to order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Timestamp Fields</SelectLabel>
                <SelectItem value="updateDate">updatedAt</SelectItem>
                <SelectItem value="createDate">createdAt</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            defaultValue="desc"
            onValueChange={(val) => setOrder([[order[0][0], val]])}
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Select a field to order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order</SelectLabel>
                <SelectItem value="asc">ASC</SelectItem>
                <SelectItem value="desc">DESC</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : news.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">No News found</p>
        ) : (
          <div className="flex md:gap-5 gap-3 flex-wrap f">
            {news.map((n) => {
              return (
                <NewsCard
                  news={n}
                  key={n.id}
                  refresh={() => getNews(false, filters)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
