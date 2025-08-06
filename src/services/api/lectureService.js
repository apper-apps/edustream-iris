import { toast } from 'react-toastify';

export const lectureService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "courseId" } },
          { field: { Name: "title" } },
          { field: { Name: "videoUrl" } },
          { field: { Name: "duration" } },
          { field: { Name: "order" } }
        ]
      };

      const response = await apperClient.fetchRecords("lecture", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
// Initialize ApperClient for error context
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      if (error?.response?.data?.message) {
        console.error("Error fetching lectures:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("강의를 가져오는 중 오류가 발생했습니다");
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "courseId" } },
          { field: { Name: "title" } },
          { field: { Name: "videoUrl" } },
          { field: { Name: "duration" } },
          { field: { Name: "order" } }
        ]
      };

      const response = await apperClient.getRecordById("lecture", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
// Initialize ApperClient for error context
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      if (error?.response?.data?.message) {
        console.error(`Error fetching lecture with ID ${id}:`, error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("강의를 가져오는 중 오류가 발생했습니다");
      }
      return null;
    }
  },

  async getByCourseId(courseId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "courseId" } },
          { field: { Name: "title" } },
          { field: { Name: "videoUrl" } },
          { field: { Name: "duration" } },
          { field: { Name: "order" } }
        ],
        where: [
          {
            FieldName: "courseId",
            Operator: "EqualTo",
            Values: [parseInt(courseId)],
            Include: true
          }
        ],
        orderBy: [
          {
            fieldName: "order",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("lecture", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
} catch (error) {
      // Initialize ApperClient for error context
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      if (error?.response?.data?.message) {
        console.error("Error fetching lectures by course ID:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("강의를 가져오는 중 오류가 발생했습니다");
      }
      return [];
    }
  },

  async create(lectureData) {
    try {
      if (!lectureData.title || !lectureData.videoUrl) {
        toast.error("제목과 동영상 URL은 필수입니다");
        return null;
      }

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields, handle courseId as lookup field
      const filteredData = {
        Name: lectureData.title || lectureData.Name,
        courseId: parseInt(lectureData.courseId), // Lookup field as integer ID
        title: lectureData.title,
        videoUrl: lectureData.videoUrl,
        duration: parseInt(lectureData.duration) || 0,
        order: parseInt(lectureData.order) || 1
      };

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord("lecture", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create lectures ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("강의가 성공적으로 생성되었습니다");
          return successfulRecords[0].data;
        }
      }

      return null;
} catch (error) {
      // Initialize ApperClient for error context
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      if (error?.response?.data?.message) {
        console.error("Error creating lecture:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("강의 생성 중 오류가 발생했습니다");
      }
      return null;
    }
  },

  async update(id, lectureData) {
    try {
      if (typeof id !== 'number') {
        toast.error("유효하지 않은 강의 ID입니다");
        return null;
      }

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields plus Id, handle courseId as lookup field
      const filteredData = {
        Id: id,
        Name: lectureData.title || lectureData.Name,
        courseId: parseInt(lectureData.courseId), // Lookup field as integer ID
        title: lectureData.title,
        videoUrl: lectureData.videoUrl,
        duration: parseInt(lectureData.duration) || 0,
        order: parseInt(lectureData.order) || 1
      };

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord("lecture", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update lectures ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("강의가 성공적으로 업데이트되었습니다");
          return successfulUpdates[0].data;
        }
      }

      return null;
} catch (error) {
      // Initialize ApperClient for error context
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      if (error?.response?.data?.message) {
        console.error("Error updating lecture:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("강의 업데이트 중 오류가 발생했습니다");
      }
      return null;
    }
  },

  async delete(id) {
    try {
      if (typeof id !== 'number') {
        toast.error("유효하지 않은 강의 ID입니다");
        return false;
      }

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord("lecture", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete lectures ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("강의가 성공적으로 삭제되었습니다");
          return true;
        }
      }

      return false;
} catch (error) {
      // Initialize ApperClient for error context
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      if (error?.response?.data?.message) {
        console.error("Error deleting lecture:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        toast.error("강의 삭제 중 오류가 발생했습니다");
      }
      return false;
    }
  }
};