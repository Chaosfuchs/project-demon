import logo from "./logo.svg";
import Homepage from "./components/homepage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
        <Homepage />
      </body>
    </div>
  );
}

export default App;
