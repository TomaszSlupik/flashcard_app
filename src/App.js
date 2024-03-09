import './App.css';
import FirstLesson from './components/FirstLesson/FirstLesson'

function App() {
  return (
    <div className="App">
      <h1>First Lesson</h1>
      
      <FirstLesson text="Hello, world!" lang="en-US" rate={1} />
    </div>
  );
}

export default App;
