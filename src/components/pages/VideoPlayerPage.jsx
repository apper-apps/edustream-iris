import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "@/components/molecules/VideoPlayer";
import CourseSidebar from "@/components/organisms/CourseSidebar";
import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { courseService } from "@/services/api/courseService";
import { lectureService } from "@/services/api/lectureService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const VideoPlayerPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [courseData, lecturesData] = await Promise.all([
        courseService.getById(parseInt(courseId)),
        lectureService.getByCourseId(parseInt(courseId))
      ]);

      setCourse(courseData);
      setLectures(lecturesData);
      
      // Set first lecture as current
      if (lecturesData.length > 0) {
        setCurrentLecture(lecturesData[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [courseId]);

  const handleLectureSelect = (lecture) => {
    setCurrentLecture(lecture);
    // Calculate progress based on current lecture
    const currentIndex = lectures.findIndex(l => l.Id === lecture.Id);
    const newProgress = ((currentIndex + 1) / lectures.length) * 100;
    setProgress(newProgress);
  };

  const handleNextLecture = () => {
    if (!currentLecture) return;
    
    const currentIndex = lectures.findIndex(l => l.Id === currentLecture.Id);
    if (currentIndex < lectures.length - 1) {
      handleLectureSelect(lectures[currentIndex + 1]);
    }
  };

  const handlePrevLecture = () => {
    if (!currentLecture) return;
    
    const currentIndex = lectures.findIndex(l => l.Id === currentLecture.Id);
    if (currentIndex > 0) {
      handleLectureSelect(lectures[currentIndex - 1]);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Course Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course?.title}
              </h1>
              <p className="text-gray-600">{course?.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <ProgressBar value={progress} className="mb-4" />
            </div>

            {/* Video Player */}
            <div className="mb-8">
              <VideoPlayer 
                videoUrl={currentLecture?.videoUrl}
                title={currentLecture?.title}
              />
            </div>

            {/* Lecture Info & Controls */}
            {currentLecture && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {currentLecture.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Clock" size={16} />
                        <span>{currentLecture.duration}분</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Play" size={16} />
                        <span>{currentLecture.order}강</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevLecture}
                      disabled={lectures.findIndex(l => l.Id === currentLecture.Id) === 0}
                    >
                      <ApperIcon name="ChevronLeft" size={16} className="mr-1" />
                      이전
                    </Button>
                    <Button 
                      onClick={handleNextLecture}
                      disabled={lectures.findIndex(l => l.Id === currentLecture.Id) === lectures.length - 1}
                    >
                      다음
                      <ApperIcon name="ChevronRight" size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <CourseSidebar 
          onLectureSelect={handleLectureSelect}
          selectedLectureId={currentLecture?.Id}
        />
      </div>
    </div>
  );
};

export default VideoPlayerPage;