import { useState } from "react";
import VideoGrid from "@/components/organisms/VideoGrid";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { lectureService } from "@/services/api/lectureService";
import { courseService } from "@/services/api/courseService";
import { toast } from "react-toastify";
const MembershipPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    courseId: null,
    duration: 30,
    order: 1,
    accessLevel: "membership"
  });
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Convert YouTube/Vimeo URLs to embed format
  const convertToEmbedUrl = (url) => {
    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo URL patterns
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // If already embed URL or other format, return as is
    return url;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.videoUrl.trim()) {
      toast.error("제목과 동영상 URL을 입력해주세요");
      return;
    }

    try {
      setLoading(true);
      
      // Get or create a membership course
      let membershipCourses = await courseService.getByAccessLevel("membership");
      let courseId;
      
      if (membershipCourses.length === 0) {
        // Create default membership course
        const newCourse = await courseService.create({
          title: "멤버십 강의",
          description: "멤버십 전용 강의 모음",
          instructor: "관리자",
          accessLevel: "membership",
          category: "membership",
          thumbnail: "/api/placeholder/400/225",
          price: 0,
          rating: 5.0,
          students: 0
        });
        courseId = newCourse.Id;
      } else {
        courseId = membershipCourses[0].Id;
      }

      const embedUrl = convertToEmbedUrl(formData.videoUrl);
      
      await lectureService.create({
        ...formData,
        courseId: courseId,
        videoUrl: embedUrl,
        thumbnail: "/api/placeholder/400/225"
      });

      toast.success("강의가 성공적으로 등록되었습니다!");
      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        videoUrl: "",
        courseId: null,
        duration: 30,
        order: 1,
        accessLevel: "membership"
      });
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast.error("강의 등록에 실패했습니다: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Register Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">멤버십 강의</h1>
          <p className="text-gray-600">멤버십 전용 프리미엄 강의를 만나보세요</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700"
        >
          <ApperIcon name="Plus" size={16} />
          <span>강의 등록</span>
        </Button>
      </div>
<VideoGrid 
        key={refreshKey}
        section="membership" 
        accessLevel="membership"
        showTitle={false}
      />

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">새 강의 등록</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    강의 제목 *
                  </label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="강의 제목을 입력하세요"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    강의 설명
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="강의에 대한 설명을 입력하세요"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    동영상 URL * 
                  </label>
                  <Input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                    placeholder="YouTube 또는 Vimeo URL을 입력하세요"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    YouTube, Vimeo URL을 입력하면 자동으로 embed 형식으로 변환됩니다
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      강의 시간 (분)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 30)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      강의 순서
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.order}
                      onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 1)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1"
                    disabled={loading}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>등록중...</span>
                      </div>
                    ) : (
                      "등록하기"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;