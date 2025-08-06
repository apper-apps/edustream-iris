import blogsMockData from "@/services/mockData/blogs.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const blogService = {
  async getAll() {
    await delay(300);
    return [...blogsMockData].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  },

  async getById(id) {
    await delay(200);
    const post = blogsMockData.find(post => post.Id === id);
    if (!post) {
      throw new Error("포스트를 찾을 수 없습니다");
    }
    return { ...post };
  },

  async create(postData) {
    await delay(400);
    const maxId = Math.max(...blogsMockData.map(p => p.Id), 0);
    const newPost = {
      Id: maxId + 1,
      publishDate: new Date().toISOString(),
      ...postData,
    };
    blogsMockData.push(newPost);
    return { ...newPost };
  },

  async update(id, postData) {
    await delay(400);
    const index = blogsMockData.findIndex(post => post.Id === id);
    if (index === -1) {
      throw new Error("포스트를 찾을 수 없습니다");
    }
    blogsMockData[index] = { ...blogsMockData[index], ...postData };
    return { ...blogsMockData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = blogsMockData.findIndex(post => post.Id === id);
    if (index === -1) {
      throw new Error("포스트를 찾을 수 없습니다");
    }
    const deletedPost = { ...blogsMockData[index] };
    blogsMockData.splice(index, 1);
    return deletedPost;
  }
};