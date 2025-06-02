import './App.css'
// import Header from "./Header"
import Footer from "./Footer"
// import TableData from './TableData';
import StudentList from './StudentList';



function App() {
 
//      <>
//   <Header />
//   <Footer />
// </>

// const col = [
//     { key: "id", lable: "Id" },
//     { key: "name", lable: "Name" },
//     { key: "email", lable: "Email" },
//     { key: "provider", lable: "Provider" },
//   ];
 
//   const users = [
//     {
//       id: 1,
//       name: "Hussam",
//       email: "test@test.com",
//       provider: "Google",
//     },
//     {
//       id: 2,
//       name: "Ali",
//       email: "Ali@test.com",
//       provider: "Google",
//     },
//   ];
//   const col2 = [
//     { key: "id", lable: "Id" },
//     { key: "name", lable: "Name" },
//   ];
//   const courses = [
//     { id: 1, name: "HTML" },
//     { id: 1, name: "CSS" },
//   ];
//   return (
//     <>
//       <TableData col={col} data={users} />
 
//       <TableData col={col2} data={courses} />
//     </>
//   );



  const students = [
    { id: 1, name: "Ayham Aiady", grade: 100 },
    { id: 2, name: "Omar Tarek", grade: 82 },
    { id: 3, name: "Lina Haddad", grade: 76 }
  ];

  return (
    <div className="app">
      <h1>Student Grades</h1>
      <StudentList students={students} />
      <Footer count={students.length} />
    </div>
  );



}
 

export default App;
