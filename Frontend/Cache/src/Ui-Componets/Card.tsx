import { useEffect, useState } from "react";
import axios from "axios";
import TweetEmbed from "./Tweet";
declare global {
  interface Window {
    twttr?: any;
  }
}

interface Content {
  _id: string;
  link: string;
  title: string;
  type: string;
  tags: string[];
}

const getLinkType = (url: string): "youtube" | "twitter" | "documents" | null => {
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/twitter\.com|x\.com/.test(url)) return "twitter";
  if (/^https?:\/\//.test(url)) return "documents";
  return null;
};

const getYoutubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const ContentCard = ({ titleFilter }: { titleFilter?: string }) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [tl, settl] = useState(false);

  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [contents]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://cache-14.onrender.com/api.v1/content", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContents(res.data.Contents);
      } catch (error) {
        setContents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
    setTimeout(() => { settl(true) }, 2000);
  }, []);

  const handleDelete = async (contentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://cache-14.onrender.com/api.v1/content", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { contentId }
      });
      setContents(contents.filter(c => c._id !== contentId));
    } catch (error) {
      alert("Error deleting content");
    }
  };

    if (loading) return <div className="flex justify-center items-center ml-4 mt-20 text-xl">Loading...</div>;

  let filteredContents = contents;
  let contentType = "tweets, YouTube, and doc links";
  if (titleFilter === "Notes" || !titleFilter) {
    filteredContents = contents;
  } else if (titleFilter === "Twitter") {
    filteredContents = contents.filter(item => item.type === "Tweet");
    contentType = "tweets";
  } else if (titleFilter === "Videos") {
    filteredContents = contents.filter(item => item.type === "video");
    contentType = "videos";
  } else if (titleFilter === "Links") {
    filteredContents = contents.filter(item => item.type === "documents");
    contentType = "documents";
  }

  if (filteredContents.length === 0) return (
    <div className="flex justify-center items-center ml-4 mt-20 text-sm">
      <div className="bg-gray-800 rounded-2xl text-xs shadow-xl md:text-md w-80 p-5 md:p-10 flex flex-col items-center md:w-96 text-center border-2 border-gray-600 font-roboto">
        <h2 className="md:text-3xl text-xl font-extrabold font-Static text-white mb-4 tracking-tight">
          Get Started!
        </h2>
        <p className="mb-6 text-gray-300 md:text-sm">
          You can create and store links of {contentType}. To do this, click on <span className="font-bold text-white">create</span>.
        </p>
      </div>
    </div>
  );

  return (
    <div className="ml-3 grid grid-flow-row-dense grid-cols-1 md:grid-cols-4 gap-x-1 gap-y-1 justify-start overflow-hidden min-w-screen md:min-w-full mt-12">
      {filteredContents.map((item, idx) => {
        const linkType = getLinkType(item.link);
        let setweet = "";
        if (linkType === "twitter") {
          const total = item.link.split('/');
          setweet = total[total.length - 1] || "";
        }
        const cardHeight =
          linkType === "youtube"
            ? "h-40 sm:h-48 md:h-60"
            : linkType === "documents"
              ? "h-24 sm:h-28 md:h-32"
              : "h-32 sm:h-72 md:h-60";

        return (
          <div
            key={idx}
            className={`
              bg-gray-800
              border border-gray-600
              rounded-3xl
              p-3
              w-56 text-sm sm:w-64 md:w-72
              flex flex-col justify-between
              transition-all duration-300 ease-in-out
              hover:border-gray-500
              hover:from-gray-800 hover:to-gray-700
              cursor-pointer
              relative
              overflow-hidden
              animate-gradient-move
              bg-[length:200%_200%]
              ${cardHeight}
            `}
            style={{ backgroundSize: '200% 200%' }}
          >
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-gray-600 opacity-20 rounded-full blur-2xl pointer-events-none" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item._id);
              }}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
              title="Delete"
            >
              🗑️
            </button>
            <div>
              <div className="font-bold text-base mb-2 group-hover:text-white text-gray-100 transition-colors duration-200 tracking-tight">
                {item.title}
              </div>
              {linkType === "youtube" && (
                <iframe
                  className="w-full h-20 sm:h-24 md:h-28 mb-2 rounded-lg border border-gray-600 group-hover:border-gray-500 transition-all"
                  src={getYoutubeEmbedUrl(item.link)}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {linkType === "twitter" && tl && setweet && (
                <div className="animate-fade-in">
                  <TweetEmbed tweetId={setweet} />
                </div>
              )}
              {linkType === "twitter" && !tl && (
                <div className="animate-pulse flex items-center justify-center h-24 text-xs text-gray-400">
                  Loading
                </div>
              )}

              {linkType === "documents" && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-1 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors text-xs shadow"
                >
                  Link
                </a>
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-1">
                {item.tags && item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-600 group-hover:bg-gray-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors shadow"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default ContentCard;
