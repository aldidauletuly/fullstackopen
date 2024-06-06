const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name}: {exercises} exercises
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);

  return <p>Total number of exercises: {totalExercises}</p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;