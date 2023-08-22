import { DiaryEntry } from "../types";

interface PartProp {
  part: DiaryEntry;
}

const Part = (prop: PartProp): JSX.Element => {
  const diary: DiaryEntry = prop.part;

    return (
      <div>
        <p><b>{diary.date}</b></p>
        <p>weather: {diary.weather}</p>
        <p>visibility: {diary.visibility}</p>
        {
          diary.comment && 
          <p>comment: {diary.comment}</p>
        }
      </div>
    )
};

export default Part;