import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/insights/${post.Id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card hover onClick={handleClick} className="group overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute top-3 left-3">
          <Badge variant="default" className="bg-white/90 text-gray-800">
            인사이트
          </Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <ApperIcon name="User" size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Calendar" size={16} />
            <span>{formatDate(post.publishDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;