import AlertButton from './AlertButton';

function StudentCard({ name, grade }) {
  const message = `Student: ${name} — Grade: ${grade}`;
    //  const AlertM1 = "Excellent Student";
    //   const AlertM2 = "Needs Improvement";
    //    const AlertM3 = "Excellent Student";
    //     if(grade >= 85){}
       
  return (
    <div className="studentCard">
      <h3>{name}</h3>
      <p>Grade: {grade}</p>
      <p>
     
        {grade >= 85 ? (
          <span className="badge exc">Excellent Student</span>
        ) : (
          <span className="badge NI">Needs Improvement</span>
        )}
      </p>
      <AlertButton message={message} />
    </div>
  );
}

export default StudentCard;