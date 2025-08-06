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
    const index = lecturesMockData.findIndex(lecture => lecture.Id === id);
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    lecturesMockData[index] = { ...lecturesMockData[index], ...lectureData };
    return { ...lecturesMockData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = lecturesMockData.findIndex(lecture => lecture.Id === id);
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    const deletedLecture = { ...lecturesMockData[index] };
    lecturesMockData.splice(index, 1);
    return deletedLecture;
  }
};