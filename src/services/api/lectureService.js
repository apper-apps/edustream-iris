import lecturesMockData from "@/services/mockData/lectures.json";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const lectureService = {
  async getAll() {
    await delay(300);
    return [...lecturesMockData];
  },

  async getById(id) {
    await delay(200);
    const lecture = lecturesMockData.find(lecture => lecture.Id === id);
    if (!lecture) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    return { ...lecture };
  },

  async getByCourseId(courseId) {
    await delay(300);
    return lecturesMockData
      .filter(lecture => lecture.courseId === courseId)
      .sort((a, b) => a.order - b.order)
      .map(lecture => ({ ...lecture }));
  },
async create(lectureData) {
    await delay(400);
    if (!lectureData.title || !lectureData.videoUrl) {
      throw new Error("제목과 동영상 URL은 필수입니다");
    }
    const maxId = Math.max(...lecturesMockData.map(l => l.Id), 0);
    const newLecture = {
      Id: maxId + 1,
      ...lectureData,
    };
    lecturesMockData.push(newLecture);
    return { ...newLecture };
  },
async update(id, lectureData) {
    await delay(400);
    if (typeof id !== 'number') {
      throw new Error("유효하지 않은 강의 ID입니다");
    }
    
    const index = lecturesMockData.findIndex(lecture => lecture.Id === id);
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    
    lecturesMockData[index] = { 
      ...lecturesMockData[index], 
      ...lectureData,
      Id: id // ID는 변경되지 않도록 보장
    };
    return { ...lecturesMockData[index] };
  },

  async delete(id) {
    await delay(300);
    
    if (typeof id !== 'number') {
      throw new Error("유효하지 않은 강의 ID입니다");
    }
    
    const index = lecturesMockData.findIndex(lecture => lecture.Id === id);
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    
    const deletedLecture = { ...lecturesMockData[index] };
    lecturesMockData.splice(index, 1);
    return deletedLecture;
}
};