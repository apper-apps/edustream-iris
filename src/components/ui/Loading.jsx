import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "로딩 중..." }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="text-center">
        {/* Animated Loading Icon */}
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full flex items-center justify-center animate-pulse">
            <ApperIcon name="BookOpen" size={28} className="text-white" />
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
        <p className="text-gray-500">잠시만 기다려주세요</p>

        {/* Skeleton Elements */}
        <div className="mt-8 space-y-3 max-w-md mx-auto">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;