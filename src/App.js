import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppCalendar from "./calendar/calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  return (
    <div className="App">
      <AppCalendar />
    </div>
  );
}

export default App;
