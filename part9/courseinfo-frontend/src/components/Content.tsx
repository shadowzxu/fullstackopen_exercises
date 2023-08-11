import { Course } from "../App";

interface ContentProp {
  courses: Course[];
}

const Content = (props: ContentProp): JSX.Element => {
  return (
    <div>
      {props.courses.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content;