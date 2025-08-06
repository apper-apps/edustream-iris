import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const VideoCard = ({ course, section = "home" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (section) {
      case "membership":
        navigate(`/membership/${course.Id}`);
        break;
      case "master":
        navigate(`/master/${course.Id}`);
        break;
      default:
        navigate(`/membership/${course.Id}`);
    }
  };

  const getBadgeVariant = (accessLevel) => {
    switch (accessLevel) {
      case "membership": return "primary";
      case "master": return "secondary";
      case "premium": return "warning";
      default: return "default";
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  return (
    <Card hover onClick={handleClick} className="group overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <ApperIcon name="Play" className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant={getBadgeVariant(course.accessLevel)}>
            {course.accessLevel === "membership" ? "멤버십" : 
             course.accessLevel === "master" ? "마스터" : "프리미엄"}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-white text-sm font-medium">
              {formatDuration(course.duration)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {course.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <ApperIcon name="Clock" size={16} />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <ApperIcon name="BookOpen" size={16} />
            <span>{course.lectureCount || 12}강의</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;