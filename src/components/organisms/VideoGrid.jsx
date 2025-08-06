import { useState, useEffect } from "react";
import VideoCard from "@/components/molecules/VideoCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { courseService } from "@/services/api/courseService";

const VideoGrid = ({ section = "home", accessLevel = null, title = "전체 강의" }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseService.getAll();
      
      // Filter by access level if specified
      const filtered = accessLevel 
        ? data.filter(course => course.accessLevel === accessLevel)
        : data;
      
      setCourses(filtered);
      setFilteredCourses(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [accessLevel]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courses]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCourses} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">
            {filteredCourses.length}개의 강의가 있습니다
          </p>
        </div>
        <div className="w-full sm:w-96">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="강의를 검색해보세요..."
          />
        </div>
      </div>

      {/* Grid */}
      {filteredCourses.length === 0 ? (
        <Empty 
          title="검색 결과가 없습니다"
          description="다른 검색어를 시도해보세요"
          actionText="전체 보기"
          onAction={() => setSearchTerm("")}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <VideoCard 
              key={course.Id} 
              course={course} 
              section={section}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;