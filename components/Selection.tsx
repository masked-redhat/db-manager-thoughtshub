import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Selection({
  className,
  placeholder,
  label,
  items,
  value,
  defaultValue,
  onChange,
}: {
  className?: string;
  placeholder: string;
  label?: string;
  items: string[][];
  value: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select value={value} defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger className={className ?? "w-[180px]"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items.map((i) => {
            let value = i[0],
              text = i[0];
            if (typeof i?.[1] === "string") value = i[1];
            return (
              <SelectItem key={value} value={value}>
                {text}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
