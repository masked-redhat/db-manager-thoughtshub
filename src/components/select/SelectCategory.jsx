import React, { useEffect, useState } from "react";
import { getCategoriesUrl } from "../../../constants/server";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCategory = ({ category, setCategory, className = "" }) => {
  const [categories, setCategories] = useState([]);
  const fetchCategoriesAndSet = async () => {
    const response = await fetch(getCategoriesUrl);

    const result = await response.json();
    if (response.ok)
      setCategories([{ name: "All", value: "all" }, ...result.categories]);
  };

  useEffect(() => {
    fetchCategoriesAndSet();
    return () => {};
  }, []);

  return (
    <Select value={category} onValueChange={setCategory} className={className}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((c) => {
          return (
            <SelectItem key={c.name} value={c.name}>
              {c.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
