import "styles/App.css";
import logoCalendar from "assets/logos/calendar.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoCalendar} className="App-logo" alt="logo" />
        <p>Company Vacation Calendar</p>
        <p>Coming soon</p>
      </header>
    </div>
  );
}

export default App;
