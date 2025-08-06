import React, { useEffect, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const VideoPlayer = ({ videoUrl, title, description }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoInfo, setVideoInfo] = useState({ embedUrl: '', platform: '', videoId: '' });

  // Function to detect video platform and extract video ID
  const detectVideoInfo = (url) => {
    if (!url) return { embedUrl: '', platform: '', videoId: '' };

// YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
        platform: 'youtube',
        videoId
      };
}
// Vimeo URL patterns
    const vimeoRegex = /(?:vimeo\.com\/)(?:.*#|.*\/)?([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      return {
        embedUrl: `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`,
        platform: 'vimeo',
        videoId
      };
    }

    // If already an embed URL, use as is
    if (url.includes('youtube.com/embed') || url.includes('player.vimeo.com')) {
      const platform = url.includes('youtube') ? 'youtube' : 'vimeo';
      return { embedUrl: url, platform, videoId: '' };
    }

    // Fallback for other URLs
    return { embedUrl: url, platform: 'other', videoId: '' };
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    const info = detectVideoInfo(videoUrl);
    setVideoInfo(info);
  }, [videoUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!videoUrl) {
    return (
      <div className="space-y-4">
        <Card className="aspect-video flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <ApperIcon name="VideoOff" size={48} className="mx-auto mb-2" />
            <p>동영상을 선택해주세요</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="aspect-video relative bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <div className="animate-spin mb-4">
                  <ApperIcon name="Loader2" size={32} />
                </div>
                <p>동영상 로딩 중...</p>
              </div>
            </div>
          )}
          
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-500">
                <ApperIcon name="AlertCircle" size={48} className="mx-auto mb-2 text-red-500" />
                <p>동영상을 불러올 수 없습니다</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-primary-600 hover:text-primary-700"
                >
                  새로고침
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src={videoInfo.embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
      </Card>
      
      {/* Video Information */}
      {(title || description) && (
        <Card className="p-4 space-y-3">
          {title && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
              {videoInfo.platform && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ApperIcon 
                    name={videoInfo.platform === 'youtube' ? 'Youtube' : videoInfo.platform === 'vimeo' ? 'Video' : 'Play'} 
                    size={16} 
                  />
                  <span className="capitalize">{videoInfo.platform}</span>
                  {videoInfo.platform !== 'other' && <span>동영상</span>}
                </div>
              )}
            </div>
          )}
          
          {description && (
            <div className="border-t pt-3">
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default VideoPlayer;