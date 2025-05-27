"use client";

import PleaseWait from "@/components/PleaseWait";
import TitleWithRefreshBtn from "@/components/TitleWithRefreshBtn";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import CategoryCard from "@/components/cards/CategoryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Page() {
  const [categories, setCategories] = useState<{ name: string; id: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [creating, setCreating] = useState(false);
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [newCat, setNewCat] = useState("");

  const getCategories = useCallback(async (withLoading = false) => {
    if (withLoading) setLoading(true);
    setRefreshing(true);

    const result = await client.fetchAdmin("GET", "/categories");
    if (result.ok) {
      setCategories(result.json.categories);
    } else
      toast("Categories fetch failed", { description: result.json.message });

    if (withLoading) setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getCategories(true);
  }, []);

  const createNewCategory = useCallback(async () => {
    setCreating(true);

    const result = await client.fetchAdmin("POST", "/category", {
      name: newCat.trim(),
    });
    if (result.ok) {
      toast("Category created", { description: result.json.message });
      getCategories();
      setNewCat("");
    } else
      toast("Categories creation failed", { description: result.json.message });

    setCreating(false);
  }, [newCat]);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3 !pb-0 relative">
      <div className="flex gap-3 flex-wrap items-center">
        <TitleWithRefreshBtn
          title="Categories"
          refreshing={refreshing}
          func={() => getCategories()}
        />
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Create new</Button>
          </DrawerTrigger>
          <DrawerContent className="h-[50vh] min-h-96">
            <div className="mx-auto w-full max-w-sm h-full flex flex-col">
              <DrawerHeader>
                <DrawerTitle>Create New Category</DrawerTitle>
                <DrawerDescription>
                  Set a unique name for the category.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <Input
                  placeholder="category name"
                  className="!text-lg !p-2.5 h-auto"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                />
              </div>
              <DrawerFooter className="mt-auto">
                <Button onClick={createNewCategory} disabled={creating}>
                  {creating ? <PleaseWait /> : <p>Submit</p>}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-wrap md:gap-5 gap-3">
        {loading ? (
          <PleaseWait text={false} />
        ) : categories.length === 0 ? (
          <p className="font-medium text-lg text-gray-700">
            No categories found
          </p>
        ) : (
          <div className="flex flex-wrap w-full">
            {categories.map((c) => {
              return (
                <CategoryCard category={c} key={c.id} refresh={getCategories} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
