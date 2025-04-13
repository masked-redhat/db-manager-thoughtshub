import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestAuth } from "../../../utils/request";
import { getNewsUrl, newsUploadUrl } from "../../../constants/server";
import { Button } from "@/components/ui/button";
import { useToken } from "../../providers/AdminTokenProvider";
import { toast, Toaster } from "sonner";
import SelectCategory from "../select/SelectCategory";
import { useNavigate, useParams } from "react-router";
import { productionPath } from "../../../constants/path";
import ImageUploader from "../ImageUploader";
import PleaseWait from "../PleaseWait";
import SubmitRight from "../SubmitRight";

const PanelEditNews = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const { token } = useToken();

  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleHindi, setTitleHindi] = useState("");
  const [bodyHindi, setBodyHindi] = useState("");
  const [newsUrl, setNewsUrl] = useState("");

  const [newsUploading, setNewsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewsUploading(true);

    const data = { title, body, imageUrl, category, newsUrl, newsId };

    const response = await requestAuth(newsUploadUrl, "PUT", token, data);

    const result = await response.json();
    if (response.ok) {
      toast("News updated", {
        description: `News updated with title ${title}`,
        action: {
          label: "Log",
          onClick: () => console.log(result),
        },
      });
      navigate(`${productionPath}/news`);
    }

    setNewsUploading(false);
  };

  const getNewsInfo = async () => {
    const response = await requestAuth(getNewsUrl + `/${newsId}`, "GET", token);

    if (response.ok) {
      const result = await response.json();
      setTitle(result.news.title);
      setBody(result.news.body);
      setTitleHindi(result.news.titleHindi);
      setBodyHindi(result.news.bodyHindi);
      setCategory(result.news.category);
      setImageUrl(result.news.imageUrl);
      setNewsUrl(result.news.newsUrl);
    }
  };

  useEffect(() => {
    getNewsInfo();
  }, []);

  return (
    <section className="w-full flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-extrabold mb-1">Edit News</h1>
        <hr />
      </header>
      <form onSubmit={handleSubmit} className="w-full px-2 flex flex-col gap-3">
        <ImageUploader setImageUrl={setImageUrl} imageUrl={imageUrl} />
        <div className="flex flex-col gap-3 *:max-w-[540px]">
          <div className="flex gap-3 flex-wrap w-full! *:max-w-[540px]">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Title (Hindi)"
              value={titleHindi}
              onChange={(e) => setTitleHindi(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3 flex-wrap w-full! *:max-w-[540px]">
            <Textarea
              placeholder="Body"
              className="max-h-56"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
            <Textarea
              placeholder="Body (Hindi)"
              className="max-h-56"
              value={bodyHindi}
              onChange={(e) => setBodyHindi(e.target.value)}
              required
            />
          </div>
          <SelectCategory category={category} setCategory={setCategory} />
          <Input
            type="text"
            placeholder="News Url"
            value={newsUrl}
            onChange={(e) => setNewsUrl(e.target.value)}
            required
          />
          <Button className="w-fit" disabled={newsUploading}>
            {newsUploading ? <PleaseWait /> : <SubmitRight />}
          </Button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default PanelEditNews;
