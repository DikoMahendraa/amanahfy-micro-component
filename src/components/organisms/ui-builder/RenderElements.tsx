import {
  UIBuilderElementProperties,
  UIBuilderElementType,
  UIBuilderElementVideoPlatformType,
} from "types/ui-builder";
import sanitizeHtml from "sanitize-html";
import { memo } from "react";

const getYoutubeEmbedURL = (url: string) => {
  // Regular expression to match YouTube video ID
  const youtubeIdRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

  // Regular expression to match embedded YouTube URL
  const embedUrlRegex =
    /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([^"&?/\s]{11})$/;

  // Check if the URL is already an embedded YouTube URL
  if (embedUrlRegex.test(url)) {
    return url; // If it's already an embedded URL, return the input URL
  }

  // Extract video ID from the URL
  const match = url.match(youtubeIdRegex);
  if (match && match[1]) {
    // Construct and return the embedded URL
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  // Return null if the URL is not a valid YouTube URL
  return null;
};

type RenderElementsProps = {
  elements?: UIBuilderElementProperties[];
};

const RenderElements: React.FC<RenderElementsProps> = ({ elements }) => {
  return (
    <div className="w-full space-y-6">
      {elements?.map((el) => (
        <div key={el.id} className="w-full space-y-3">
          {el.name && <div className="text-xl font-semibold">{el.name}</div>}
          {el.type === UIBuilderElementType.TEXT && (
            <div
              className="w-full text-sm text-gray-500 text-justify"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(el?.content || ""),
              }}
            />
          )}
          {el.type === UIBuilderElementType.VIDEO && (
            <div className="w-full">
              {el.videoPlatform ===
                UIBuilderElementVideoPlatformType.YOUTUBE && (
                <iframe
                  allowFullScreen
                  frameBorder={0}
                  src={getYoutubeEmbedURL(el?.videoUrl || "") || ""}
                  className="w-full aspect-video rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              )}
              {el.videoPlatform ===
                UIBuilderElementVideoPlatformType.INSTAGRAM && (
                <div className="w-full flex justify-center">
                  <iframe
                    allowFullScreen
                    frameBorder={0}
                    src={el.videoUrl}
                    className="w-full lg:w-1/2 aspect-[9/16] rounded-lg overflow-y-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
              )}
              {el.videoPlatform ===
                UIBuilderElementVideoPlatformType.FACEBOOK && (
                <div className="w-full flex justify-center">
                  <iframe
                    allowFullScreen
                    frameBorder={0}
                    src={el.videoUrl}
                    className="w-full lg:w-1/2 aspect-[9/12] rounded-lg overflow-y-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
              )}
            </div>
          )}
          {el.type === UIBuilderElementType.IMAGE &&
            (el?.images || []).map((url, index) => (
              <img
                alt=""
                key={index}
                src={url}
                draggable="false"
                className="w-full rounded-lg"
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default memo(RenderElements);
