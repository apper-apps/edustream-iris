import { useState, useEffect } from "react";
import BlogCard from "@/components/molecules/BlogCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { blogService } from "@/services/api/blogService";

const BlogGrid = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAll();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPosts} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">인사이트</h1>
          <p className="mt-2 text-gray-600">
            교육과 학습에 대한 통찰을 공유합니다
          </p>
        </div>
        <div className="w-full sm:w-96">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="포스트를 검색해보세요..."
          />
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <Empty 
          title="검색 결과가 없습니다"
          description="다른 검색어를 시도해보세요"
          actionText="전체 보기"
          onAction={() => setSearchTerm("")}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.Id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogGrid;