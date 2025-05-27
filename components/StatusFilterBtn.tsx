import { Button } from "./ui/button";

export default function StatusFilterBtn({
  func,
  status,
  name,
}: {
  func: Function;
  status: string | null;
  name: string;
}) {
  return (
    <Button
      onClick={() => func(name)}
      variant={status === name ? "secondary" : "outline"}
    >
      {name}
    </Button>
  );
}
