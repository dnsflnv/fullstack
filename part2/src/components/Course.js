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

export default Course;