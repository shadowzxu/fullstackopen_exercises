import Content from "./components/Content";
import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diaryService";

function App() {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState("2023-02-02");
  const [visibility, setVisibility] = useState("great");
  const [weather, setWeather] = useState("sunny");
  const [comment, setComment] = useState("nice flight but a shaky landing.");

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary({ date, visibility, weather, comment }).then(data =>{
      setDiaries(diaries.concat(data))
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  }
  
  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <label>date: </label>
        <input value={date} onChange={(event) => setDate(event.target.value)} /><br/><br/>
        <label>visibility: </label>
        <input value={visibility} onChange={(event) => setVisibility(event.target.value)} /><br/><br/>
        <label>weather: </label>
        <input value={weather} onChange={(event) => setWeather(event.target.value)} /><br/><br/>
        <label>comment: </label>
        <input value={comment} onChange={(event) => setComment(event.target.value)} /><br/><br/>
        <button type='submit'>add</button>
      </form>

      <h2>Diary Entries</h2>
      <Content diaries={diaries}/>
    </div>
  );
}

export default App;
