import { CoursePart } from "../interfaces/CoursePart";

interface PartProp {
  part: CoursePart;
}

const Part = (prop: PartProp): JSX.Element => {
  const course: CoursePart = prop.part;

  switch(course.kind) {
    case "basic":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
        </div>
      )
    case "background":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
          <p>submit to {course.backgroundMaterial}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p>project excercises {course.groupProjectCount}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p>required skill: {course.requirements.toString()}</p>
        </div>
      )
  }
};

export default Part;