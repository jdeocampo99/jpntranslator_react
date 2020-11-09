import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SearchRenderer from './components/SearchRenderer';
import BodyRenderer from './components/BodyRenderer';




function App() {
  return (
    <div className="App">
      <Header />
      <SearchRenderer />
      <BodyRenderer />
    </div>
  );
}

export default App;
