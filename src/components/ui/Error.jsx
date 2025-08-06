import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "문제가 발생했습니다", 
  onRetry,
  title = "오류가 발생했습니다"
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertCircle" size={32} className="text-white" />
        </div>

        {/* Error Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              <ApperIcon name="RotateCcw" size={16} className="mr-2" />
              다시 시도
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/"}
          >
            <ApperIcon name="Home" size={16} className="mr-2" />
            홈으로 돌아가기
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-6">
          문제가 계속 발생하면 고객지원팀에 문의해주세요
        </p>
      </div>
    </div>
  );
};

export default Error;