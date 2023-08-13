import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDetail extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDetail {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDetail {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDetail {
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}/>
    </div>
  );
};

export default App;