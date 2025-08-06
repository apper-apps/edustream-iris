import coursesMockData from "@/services/mockData/courses.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const courseService = {
  async getAll() {
    await delay(300);
    return [...coursesMockData];
  },

  async getById(id) {
    await delay(200);
    const course = coursesMockData.find(course => course.Id === id);
    if (!course) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    return { ...course };
  },

  async getByAccessLevel(accessLevel) {
    await delay(300);
    return coursesMockData.filter(course => course.accessLevel === accessLevel).map(course => ({ ...course }));
  },

  async create(courseData) {
    await delay(400);
    const maxId = Math.max(...coursesMockData.map(c => c.Id), 0);
    const newCourse = {
      Id: maxId + 1,
      ...courseData,
    };
    coursesMockData.push(newCourse);
    return { ...newCourse };
  },

  async update(id, courseData) {
    await delay(400);
    const index = coursesMockData.findIndex(course => course.Id === id);
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    coursesMockData[index] = { ...coursesMockData[index], ...courseData };
    return { ...coursesMockData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = coursesMockData.findIndex(course => course.Id === id);
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다");
    }
    const deletedCourse = { ...coursesMockData[index] };
    coursesMockData.splice(index, 1);
    return deletedCourse;
  }
};