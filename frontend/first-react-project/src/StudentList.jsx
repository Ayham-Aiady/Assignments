import StudentCard from './StudentCard';

function StudentList({ students }) {
  return (
    <div className="studentList">
      {students.map(student => (
        <StudentCard 
          key={student.id}
          name={student.name} 
          grade={student.grade} 
        />
      ))}
    </div>
  );
}

export default StudentList;