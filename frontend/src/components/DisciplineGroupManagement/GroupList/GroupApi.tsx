import axios from "axios";

const API_URL = "http://localhost:8080/v1/groups";

interface Group {
    id?: string;  // O id pode ser opcional se o grupo ainda não existir
    name: string;
    disciplineName: string;
    students: string[];  // Array de strings representando os nomes dos alunos
  }

// criar um grupo
export const createGroup = async (group: Group) =>{
    try {
        const response = await axios.post(API_URL, group);
        return response.data;
    } catch(error) {
        console.error("Erro ao criar o grupo: ", error);
        throw error;
    }

};

// atualizar um grupo
export const updateGroup = async (group: Group) => {
    try {
      const response = await axios.put(`${API_URL}/${group.id}`, group);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar grupo:', error);
      throw error;
    }
  };
  
  // deletar um grupo
  export const deleteGroup = async (groupId: string) => {
    try {
      await axios.delete(`${API_URL}/${groupId}`);
    } catch (error) {
      console.error('Erro ao deletar grupo:', error);
      throw error;
    }
  };
  
  // obter todos os grupos
  export const getGroups = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter grupos:', error);
      throw error;
    }
  };

  // Obter um grupo por ID
export const getGroupById = async (groupId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter grupo por ID:', error);
        throw error;
    }
};
