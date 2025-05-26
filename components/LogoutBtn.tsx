import { useAuthToken } from "@/contexts/AuthTokenContext";
import { Button } from "./ui/button";
import { useState } from "react";
import PleaseWait from "./PleaseWait";
import { APIClient } from "@/services/BackendService";
import { toast } from "sonner";

export default function LogoutBtn() {
  const { reset, authToken } = useAuthToken();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);

    const client = new APIClient(authToken);
    const result = await client.fetch("GET", "/logout");
    if (result.ok) {
      toast("Logout success", { description: result.json.message });
      reset();
    } else toast("Logout failed", { description: result.json.message });

    setLoading(false);
  };

  return (
    <Button disabled={loading} onClick={onClick}>
      {loading ? <PleaseWait /> : <p>Logout</p>}
    </Button>
  );
}
