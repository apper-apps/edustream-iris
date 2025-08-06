import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { blogService } from "@/services/api/blogService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = await blogService.getById(parseInt(postId));
      setPost(postData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPost} />;
  if (!post) return <Error message="포스트를 찾을 수 없습니다" onRetry={loadPost} />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/insights">
          <Button variant="outline" size="sm">
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            인사이트로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Badge variant="default">인사이트</Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <ApperIcon name="User" size={18} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Calendar" size={18} />
            <span>{formatDate(post.publishDate)}</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.thumbnail && (
        <div className="mb-8">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none">
        <div className="text-xl text-gray-600 mb-6 italic border-l-4 border-primary-500 pl-6">
          {post.excerpt}
        </div>
        
        <div className="text-gray-800 leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-lg leading-8">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-gray-600">
            <p>이 포스트가 도움이 되었나요?</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <ApperIcon name="Heart" size={16} className="mr-2" />
              좋아요
            </Button>
            <Button variant="outline" size="sm">
              <ApperIcon name="Share2" size={16} className="mr-2" />
              공유하기
            </Button>
          </div>
        </div>
      </footer>

      {/* Related Posts CTA */}
      <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            더 많은 인사이트를 만나보세요
          </h3>
          <p className="text-gray-600 mb-6">
            교육과 학습에 대한 다양한 관점과 노하우를 확인해보세요
          </p>
          <Link to="/insights">
            <Button size="lg">
              <ApperIcon name="BookOpen" size={20} className="mr-2" />
              인사이트 더 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;