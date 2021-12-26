import React from 'react';

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  );
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name}: {part.exercises}
    </p>
  );
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  );
}

const Total = ({ parts }) => {
  // let totalEx = 0;
  // parts.forEach(element => {
  //   totalEx = totalEx + element.exercises;
  // });
  let initialVal = 0;
  let totalEx = parts.reduce((s, p) => {
    return s + p.exercises;
  }, initialVal);
  return (
    <p><strong>Total of {totalEx} exercises</strong></p>
  );
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>

  );
}

export default App;