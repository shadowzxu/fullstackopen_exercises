import { DiaryEntry } from "../types";
import Part from "./Part";

interface ContentProp {
  diaries: DiaryEntry[];
}

const Content = (props: ContentProp): JSX.Element => {
  return (
    <div>
      {props.diaries.map((diary) => (
        <Part key={diary.id} part={diary} />
      ))}
    </div>
  )
}

export default Content;