import { CoursePart } from "../interfaces/CoursePart";
import Part from "./Part";

interface ContentProp {
  courses: CoursePart[];
}

const Content = (props: ContentProp): JSX.Element => {
  return (
    <div>
      {props.courses.map((course) => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  )
}

export default Content;