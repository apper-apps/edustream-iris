import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { courseService } from "@/services/api/courseService";
import { lectureService } from "@/services/api/lectureService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const CourseSidebar = ({ onLectureSelect, selectedLectureId }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState(new Set([0]));

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [courseId]);

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      // Close all other sections and open this one
      newExpanded.clear();
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  // Group lectures by section
  const sections = [
    {
      title: "기본 과정",
      lectures: lectures.filter(l => l.order <= 5)
    },
    {
      title: "심화 과정",
      lectures: lectures.filter(l => l.order > 5 && l.order <= 10)
    },
    {
      title: "실습 과정",
      lectures: lectures.filter(l => l.order > 10)
    }
  ].filter(section => section.lectures.length > 0);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="w-80 h-full bg-surface border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {course?.title}
          </h2>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{lectures.length}개 강의</span>
            <span>총 {formatDuration(lectures.reduce((sum, l) => sum + l.duration, 0))}</span>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="overflow-hidden">
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <Badge variant="default">{section.lectures.length}강의</Badge>
                </div>
                <ApperIcon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transform transition-transform duration-200 ${
                    expandedSections.has(sectionIndex) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections.has(sectionIndex) && (
                <div className="divide-y divide-gray-100">
                  {section.lectures.map((lecture) => (
                    <button
                      key={lecture.Id}
                      onClick={() => onLectureSelect(lecture)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                        selectedLectureId === lecture.Id ? 'bg-primary-50 border-r-2 border-primary-600' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium mb-1 ${
                            selectedLectureId === lecture.Id ? 'text-primary-600' : 'text-gray-900'
                          }`}>
                            {lecture.title}
                          </h4>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <ApperIcon name="Clock" size={14} />
                              <span>{formatDuration(lecture.duration)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ApperIcon name="Play" size={14} />
                              <span>{lecture.order}강</span>
                            </div>
                          </div>
                        </div>
                        {selectedLectureId === lecture.Id && (
                          <ApperIcon name="PlayCircle" size={20} className="text-primary-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;