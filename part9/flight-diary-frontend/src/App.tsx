import Content from "./components/Content";
import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaryService";

function App() {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [])
  
  return (
    <div>
      <h2>Diary Entries</h2>
      <Content diaries={diaries}/>
    </div>
  );
}

export default App;
