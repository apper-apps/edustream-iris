import { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const VideoPlayer = ({ videoUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
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
      <Card className="aspect-video flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-500">
          <ApperIcon name="VideoOff" size={48} className="mx-auto mb-2" />
          <p>동영상을 선택해주세요</p>
        </div>
      </Card>
    );
  }

  return (
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
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>
    </Card>
  );
};

export default VideoPlayer;