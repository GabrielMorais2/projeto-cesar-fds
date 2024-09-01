import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from '../Sidebar'
import Breadcrumbs from './Breadcrumbs'
import GroupList from './GroupList'
import DisciplineList from './DisciplineList'


export default function DisciplineGroupManagement() {
  const [disciplines, setDisciplines] = useState([
    { id: 1, name: 'Engenharia de Software', class: 'A', semester: '2024.1', groups: [
      { id: 1, name: 'Grupo A', students: ['Alice', 'Bob', 'Charlie'] },
      { id: 2, name: 'Grupo B', students: ['David', 'Eve', 'Frank'] },
    ]},
    { id: 2, name: 'Banco de Dados', class: 'B', semester: '2024.1', groups: [
      { id: 3, name: 'Grupo X', students: ['Grace', 'Henry', 'Ivy'] },
    ]},
    { id: 3, name: 'Projetos - CC', class: 'C', semester: '2024.1', groups: [
        { id: 4, name: 'Grupo A', students: ['John', 'Kate', 'Liam'] },
        { id: 5, name: 'Grupo B', students: ['Mike', 'Nina', 'Oscar'] },
    ]},
  ])
  const [newDiscipline, setNewDiscipline] = useState({ name: '', class: '', semester: '' })
  const [isAddingDiscipline, setIsAddingDiscipline] = useState(false)
  const [newGroup, setNewGroup] = useState({ discipline: '', students: [{ name: '', registration: '', email: '' }] })
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [csvFile, setCsvFile] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [filteredGroups, setFilteredGroups] = useState([])

  useEffect(() => {
    const allGroups = disciplines.flatMap(discipline => 
      discipline.groups.map(group => ({
        ...group,
        disciplineName: discipline.name
      }))
    )
    setFilteredGroups(allGroups)
  }, [disciplines])

  const handleAddDiscipline = () => {
    if (newDiscipline.name && newDiscipline.class && newDiscipline.semester) {
      setDisciplines([...disciplines, { ...newDiscipline, id: Date.now(), groups: [] }])
      setNewDiscipline({ name: '', class: '', semester: '' })
      setIsAddingDiscipline(false)
    }
  }

  const handleAddGroup = () => {
    if (newGroup.discipline && newGroup.students.length > 0) {
      const updatedDisciplines = disciplines.map(discipline => {
        if (discipline.name === newGroup.discipline) {
          return {
            ...discipline,
            groups: [...discipline.groups, { id: Date.now(), name: `Grupo ${discipline.groups.length + 1}`, students: newGroup.students.map(s => s.name) }]
          }
        }
        return discipline
      })
      setDisciplines(updatedDisciplines)
      setNewGroup({ discipline: '', students: [{ name: '', registration: '', email: '' }] })
      setIsAddingGroup(false)
    }
  }

  const handleAddStudent = () => {
    setNewGroup({
      ...newGroup,
      students: [...newGroup.students, { name: '', registration: '', email: '' }]
    })
  }

  const handleRemoveStudent = (index) => {
    const updatedStudents = newGroup.students.filter((_, i) => i !== index)
    setNewGroup({ ...newGroup, students: updatedStudents })
  }

  const handleCsvUpload = (event) => {
    const file = event.target.files[0]
    setCsvFile(file)
    console.log('CSV file uploaded:', file.name)
  }

  const handleDisciplineFilter = (value) => {
    setSelectedDiscipline(value)
    if (value === 'all') {
      setFilteredGroups(disciplines.flatMap(discipline => 
        discipline.groups.map(group => ({
          ...group,
          disciplineName: discipline.name
        }))
      ))
    } else {
      const discipline = disciplines.find(d => d.name === value)
      if (discipline) {
        setFilteredGroups(discipline.groups.map(group => ({
          ...group,
          disciplineName: discipline.name
        })))
      }
    }
  }

  const handleDeleteGroup = (groupId) => {
    const updatedDisciplines = disciplines.map(discipline => {
      if (discipline.id === selectedDiscipline.id) {
        return {
          ...discipline,
          groups: discipline.groups.filter(group => group.id !== groupId)
        }
      }
      return discipline
    })
    setDisciplines(updatedDisciplines)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="flex-1 overflow-auto p-8">
        <Breadcrumbs items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Gerenciamento de Disciplinas e Grupos', href: '#' },
        ]} />
        
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Gerenciamento de Disciplinas e Grupos</h1>

        <Tabs defaultValue="disciplines" className="w-full">
          <TabsList>
            <TabsTrigger value="disciplines">Disciplinas</TabsTrigger>
            <TabsTrigger value="groups">Grupos</TabsTrigger>
          </TabsList>

          <TabsContent value="disciplines">
            <DisciplineList
              disciplines={disciplines}
              isAddingDiscipline={isAddingDiscipline}
              setIsAddingDiscipline={setIsAddingDiscipline}
              newDiscipline={newDiscipline}
              setNewDiscipline={setNewDiscipline}
              handleAddDiscipline={handleAddDiscipline}
            />
          </TabsContent>

          <TabsContent value="groups">
            <GroupList
              disciplines={disciplines}
              selectedDiscipline={selectedDiscipline}
              filteredGroups={filteredGroups}
              handleDisciplineFilter={handleDisciplineFilter}
              isAddingGroup={isAddingGroup}
              setIsAddingGroup={setIsAddingGroup}
              newGroup={newGroup}
              setNewGroup={setNewGroup}
              handleAddGroup={handleAddGroup}
              handleAddStudent={handleAddStudent}
              handleRemoveStudent={handleRemoveStudent}
              handleCsvUpload={handleCsvUpload}
              handleDeleteGroup={handleDeleteGroup}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}