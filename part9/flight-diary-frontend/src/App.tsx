import Content from "./components/Content";
import { DiaryEntry, NewDiary, Visibility, Weather } from "./types";
import { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diaryService";
import Notification from "./components/Notification";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState("2023-02-02");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.None);
  const [weather, setWeather] = useState<Weather>(Weather.None);
  const [comment, setComment] = useState("A well typed flight!");

  const [message, setMessage] = useState({ content: null, type:'INFO' });

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryToAdd: NewDiary = {
      date, visibility, weather, comment
    }

    createDiary(diaryToAdd)
      .then(data =>{
        setDiaries(diaries.concat(data));

        setDate('');
        setVisibility(Visibility.None);
        setWeather(Weather.None);
        setComment('');
      })
      .catch(error => {
        setMessage({ content: error.response.data, type: 'ERROR' })
        setTimeout(() => {
          setMessage({ content: null, type: 'INFO' })
        }, 5000)
      });
  }
  
  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message = {message.content} type = {message.type} /><br/>
      <form onSubmit={diaryCreation}>
        <label>date: </label>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} /><br/>
        <div>
          <label>visibility: </label>
          <input type="radio" name="visibility_filter" onChange={() => setVisibility(Visibility.Great)}/>{Visibility.Great}
          <input type="radio" name="visibility_filter" onChange={() => setVisibility(Visibility.Good)}/>{Visibility.Good}
          <input type="radio" name="visibility_filter" onChange={() => setVisibility(Visibility.Ok)}/>{Visibility.Ok}
          <input type="radio" name="visibility_filter" onChange={() => setVisibility(Visibility.Poor)}/>{Visibility.Poor}
        </div>
        <div>
          <label>weather: </label>
          <input type="radio" name="weather_filter" onChange={() => setWeather(Weather.Cloudy)}/>{Weather.Cloudy}
          <input type="radio" name="weather_filter" onChange={() => setWeather(Weather.Rainy)}/>{Weather.Rainy}
          <input type="radio" name="weather_filter" onChange={() => setWeather(Weather.Stormy)}/>{Weather.Stormy}
          <input type="radio" name="weather_filter" onChange={() => setWeather(Weather.Sunny)}/>{Weather.Sunny}
          <input type="radio" name="weather_filter" onChange={() => setWeather(Weather.Windy)}/>{Weather.Windy}
        </div>
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
