"use client";

import PleaseWait from "@/components/PleaseWait";
import { Title } from "@/components/TitleWithRefreshBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Writer from "@/components/Writer";
import { useAuthToken } from "@/contexts/AuthTokenContext";
import { APIClient } from "@/services/BackendService";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { authToken } = useAuthToken();
  const client = new APIClient(authToken);
  const [values, setValues] = useState<{
    title: string;
    body: string;
    toExclude: boolean;
  }>({ title: "", body: "", toExclude: false });
  const [submitting, setSubmitting] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  const resetValues = () => {
    setValues({
      ...values,
      title: "",
      body: "",
    });
    setSelectedIndex([]);
  };

  const send = async () => {
    setSubmitting(true);

    const body = {
      title: values.title,
      body: values.body,
      tokens: selectedIndex.map((i) => users[i].fcmToken),
      toExclude: values.toExclude,
    };

    const result = await client.fetchAdmin("POST", "/notify", body);
    if (result.ok) {
      toast("Notification sent", {
        description: result.json.message,
      });
      resetValues();
    } else {
      toast("Notification couldn't be send", {
        description: result.json.message,
      });
    }

    setSubmitting(false);
  };

  const getUsers = async () => {
    setLoadingUsers(true);

    const result = await client.fetchAdmin("GET", `/users?offset=${offset}`);
    if (result.ok) {
      setUsers([...users, ...result.json.users]);
      resetValues();
      setOffset(offset + result.json.users.length);
    } else {
      toast("Users fetch failed", {
        description: result.json.message,
      });
    }

    setLoadingUsers(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 md:p-5 p-3">
      <div className="flex flex-wrap gap-3">
        <Title title="Send Notification" />
        {submitting ? <PleaseWait /> : null}
        <div className="flex flex-wrap gap-3 mt-auto ml-auto *:cursor-pointer">
          <Button disabled={submitting} onClick={() => send()}>
            Send {selectedIndex.length === 0 && "To All"}
          </Button>
        </div>
      </div>

      <div className={`tracking-wide w-full gap-3 flex flex-col h-full`}>
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
        </div>

        <div className="select-none">
          <p className="font-medium">
            Currently {selectedIndex.length !== 0 && values.toExclude && "NOT"}{" "}
            Sending To :{" "}
            <span className="text-sm text-gray-600 font-manrope tracking-wide font-normal">
              {selectedIndex.length !== 0 &&
                selectedIndex.map((i) => "@" + users[i].username).join(", ")}
              {selectedIndex.length === 0 && "All users"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <Title
              title="Select users to send"
              className="text-lg md:text-xl"
            />
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                className="!w-4"
                checked={values.toExclude}
                onChange={(e) =>
                  setValues({ ...values, toExclude: !values.toExclude })
                }
              />
              <p>Exclude these</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {users.map((u, i) => (
              <UserCard
                user={u}
                key={u.userId}
                index={i}
                users={selectedIndex}
                setUsers={setSelectedIndex}
              />
            ))}
          </div>
          <Button
            variant={"secondary"}
            className="w-28"
            disabled={loadingUsers}
            onClick={getUsers}
          >
            {loadingUsers ? <PleaseWait /> : "More"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const UserCard = ({
  user,
  index,
  setUsers,
  users,
}: {
  user: any;
  index: number;
  users: number[];
  setUsers: Function;
}) => {
  return (
    <div className="flex gap-1 items-center md:w-[20%] w-full ">
      <Input
        type="checkbox"
        className="!w-6 border"
        checked={users.includes(index)}
        onChange={(e) => {
          if (!users.includes(index)) setUsers([...users, index]);
          else setUsers(users.filter((u) => u !== index));
        }}
      />
      <Writer writer={user} padTop={false} />
    </div>
  );
};
