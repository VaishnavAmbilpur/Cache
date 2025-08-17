import { useEffect, useState } from "react";
import axios from "axios";
import TweetEmbed from "./Tweet";
// Extend the Window interface to include 'twttr'
declare global {
  interface Window {
    twttr?: any;
  }
}

interface Content {
  link: string;
  title: string;
  type: string;
  tags: string[];
}

// Helper to detect link type
const getLinkType = (url: string): "youtube" | "twitter" | "documents" | null => {
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  // Support both twitter.com and x.com for Twitter/X links
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

  // Load Twitter widgets.js once
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Re-render Twitter embeds when contents change
  useEffect(() => {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [contents]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api.v1/content", {
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

    if (loading) return <div>Loading...</div>;
  if (!Array.isArray(contents) || contents.length === 0) return <div className="ml-6 mt-12">No content found.</div>;

  // Filtering logic based on titleFilter
  let filteredContents = contents;
  if (titleFilter === "Notes" || !titleFilter) {
    // Show all
    filteredContents = contents;
  } else if (titleFilter === "Twitter") {
    filteredContents = contents.filter(item => item.type === "Tweet");
  } else if (titleFilter === "Videos") {
    filteredContents = contents.filter(item => item.type === "video");
  } else if (titleFilter === "Links") {
    filteredContents = contents.filter(item => item.type === "documents");
  }

  return (
    <div className="ml-3 grid grid-flow-row-dense grid-cols-1 md:grid-cols-4 gap-x-1 gap-y-1 justify-start overflow-hidden min-h-screen min-w-screen md:min-h-screen md:min-w-full mt-12">
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
              bg-flush-orange-200
              border border-flush-orange-200
              rounded-3xl
              p-3
              w-56 text-sm sm:w-64 md:w-72
              flex flex-col justify-between
              transition-all duration-300 ease-in-out
              hover:border-flush-orange-400
              hover:from-flush-orange-200 hover:to-flush-orange-400
              cursor-pointer
              relative
              overflow-hidden
              animate-gradient-move
              bg-[length:200%_200%]
              ${cardHeight}
            `}
            style={{ backgroundSize: '200% 200%' }}
          >
            {/* Decorative blurred circle */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-flush-orange-400 opacity-20 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="font-bold text-base mb-2 group-hover:text-flush-orange-900 text-flush-orange-950 transition-colors duration-200 tracking-tight">
                {item.title}
              </div>
              {/* YouTube Embed */}
              {linkType === "youtube" && (
                <iframe
                  className="w-full h-20 sm:h-24 md:h-28 mb-2 rounded-lg border border-flush-orange-300 group-hover:border-flush-orange-400 transition-all"
                  src={getYoutubeEmbedUrl(item.link)}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* Twitter Embed */}
              {linkType === "twitter" && tl && setweet && (
                <div className="animate-fade-in">
                  <TweetEmbed tweetId={setweet} />
                </div>
              )}
              {linkType === "twitter" && !tl && (
                <div className="animate-pulse flex items-center justify-center h-24 text-xs text-flush-orange-700">
                  Loading
                </div>
              )}

              {/* Documents Button */}
              {linkType === "documents" && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-1 rounded-lg bg-flush-orange-300 text-flush-orange-900 font-semibold hover:bg-flush-orange-400 transition-colors text-xs shadow"
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
                    className="bg-flush-orange-300 group-hover:bg-flush-orange-400 text-flush-orange-900 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors shadow"
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
