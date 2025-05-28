import Timestamps from "../Timestamps";

export default function ActivityCard({
  activity,
}: {
  activity: {
    title: string;
    description: string | null;
    createDate: string;
    updateDate: string;
  };
}) {
  return (
    <div className="w-full border-b px-4 py-2">
      <Timestamps timestamps={activity} />
      <div className="w-full flex flex-col">
        <p className="text-lg">{activity.title}</p>
        {activity.description && <p className="mt-1">{activity.description}</p>}
      </div>
    </div>
  );
}
