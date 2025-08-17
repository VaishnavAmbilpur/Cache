import React, { useEffect } from 'react';

interface TweetEmbedProps {
  tweetId: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ tweetId }) => {
  useEffect(() => {
    // Load Twitter widgets script if not already loaded
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    } else {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    }
  }, [tweetId]);

  return (
    <> <div className='hidden md:block h-32'>
         <blockquote className="twitter-tweet">
         <a href={`https://twitter.com/anyuser/status/${tweetId}`}></a>
      
       </blockquote>
    </div> 
      <div className="block md:hidden">
        <a
          href={`https://twitter.com/i/web/status/${tweetId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-xs break-all"
        >
          View Tweet
        </a>
      </div>
    </>  
  );
};

export default TweetEmbed;