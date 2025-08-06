import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "내용이 없습니다",
  description = "표시할 항목이 없습니다",
  actionText = "새로 만들기",
  onAction,
  icon = "BookOpen"
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="text-center max-w-md mx-auto">
        {/* Empty State Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={36} className="text-gray-400" />
        </div>

        {/* Empty State Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        {/* Action Button */}
        {onAction && (
          <Button onClick={onAction} size="lg">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionText}
          </Button>
        )}

        {/* Decorative Elements */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Empty;