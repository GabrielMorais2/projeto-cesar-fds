// utils/mockApi.js
const mockApi = {
  getDisciplines: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [{ id: "1", name: "Mathematics", semester: "2024.2" }],
        });
      }, 500);
    });
  },

  getGroups: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: "1", name: "Group A", disciplineId: "1" },
            { id: "2", name: "Group B", disciplineId: "1" },
            { id: "3", name: "Group C", disciplineId: "1" },
          ],
        });
      }, 500);
    });
  },
};

export default mockApi;
