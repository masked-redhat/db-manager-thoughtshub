import { ReactElement, useCallback, useState } from "react";
import { toast } from "sonner";

import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { Button } from "./ui/button";
import PleaseWait from "./PleaseWait";

export default function LogoutBtn(): ReactElement {
  const { reset, authToken } = useAuthToken();
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = useCallback(async (): Promise<void> => {
    setLoading(true);

    const client = new APIClient(authToken);
    const result = await client.fetch("GET", "/logout");

    if (result.ok) {
      toast("Logout success", { description: result.json.message });
      reset();
    } else {
      toast("Logout failed", { description: result.json.message });
    }

    setLoading(false);
  }, [authToken, reset]);

  return (
    <Button disabled={loading} onClick={onClick} aria-busy={loading}>
      {loading ? <PleaseWait /> : <span>Logout</span>}
    </Button>
  );
}
