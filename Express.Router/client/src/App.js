import logo from './logo.svg';
import './App.css';

function App() {
  let getLatestMovies = async ()=>{
    let reqOptions = {
      method: "GET"
    }
    let JSONData = await fetch("http://localhost:4567/movieNames",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  }
  return (
    <div className="App">
      <button onClick={()=>{
        getLatestMovies();
      }}>Get Latest Movies</button>
    </div>
  );
}

export default App;
