import { useState, useEffect } from "react";
import HeroSection from "@/components/organisms/HeroSection";
import VideoCard from "@/components/molecules/VideoCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { courseService } from "@/services/api/courseService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [membershipCourses, setMembershipCourses] = useState([]);
  const [masterCourses, setMasterCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const allCourses = await courseService.getAll();
      
      // Get featured courses (first 6)
      setFeaturedCourses(allCourses.slice(0, 6));
      
      // Get membership courses
      setMembershipCourses(allCourses.filter(c => c.accessLevel === "membership").slice(0, 4));
      
      // Get master courses
      setMasterCourses(allCourses.filter(c => c.accessLevel === "master").slice(0, 4));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCourses} />;

  return (
    <div>
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Featured Courses */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">추천 강의</h2>
              <p className="mt-2 text-gray-600">인기 있는 강의를 만나보세요</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/membership")}
              className="hidden sm:flex"
            >
              전체 보기
              <ApperIcon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <VideoCard key={course.Id} course={course} />
            ))}
          </div>
        </section>

        {/* Membership Section */}
        {membershipCourses.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">멤버십 강의</h2>
                <p className="mt-2 text-gray-600">체계적인 학습 과정</p>
              </div>
              <Button 
                variant="primary" 
                onClick={() => navigate("/membership")}
                className="hidden sm:flex"
              >
                멤버십 보기
                <ApperIcon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {membershipCourses.map((course) => (
                <VideoCard key={course.Id} course={course} section="membership" />
              ))}
            </div>
          </section>
        )}

        {/* Master Section */}
        {masterCourses.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">마스터 클래스</h2>
                <p className="mt-2 text-gray-600">전문가의 고급 노하우</p>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => navigate("/master")}
                className="hidden sm:flex"
              >
                마스터 클래스 보기
                <ApperIcon name="Crown" size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {masterCourses.map((course) => (
                <VideoCard key={course.Id} course={course} section="master" />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              지금 바로 학습을 시작하세요
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              전문가가 제작한 고품질 강의와 함께 새로운 스킬을 배우고 성장해보세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/membership")}>
                <ApperIcon name="Play" size={20} className="mr-2" />
                무료 체험 시작
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/insights")}>
                <ApperIcon name="BookOpen" size={20} className="mr-2" />
                인사이트 보기
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;