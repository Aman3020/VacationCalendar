import React, { useState } from "react";
import CalendarContainer from "./CalendarContainer";
import countries from "./countryCode";
import "./App.css";


const API_URL = "http://localhost:5000/api/holidays";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [viewType, setViewType] = useState("monthly");
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const fetchHolidays = async () => {
    setLoading(true);
    setError("");
    try {
      const isoCode = countries[selectedCountry];
      const year = new Date().getFullYear();
      // console.log(year);
      const res = await fetch(`${API_URL}?country=${isoCode}&year=${year}`);
      const data = await res.json();
      // console.log(data);

      if (data.meta.code === 200) {
        setHolidays(data.response.holidays || []);
      } else {
        setError("Failed to fetch holidays");
      }
    } catch (err) {
      setError("Error fetching holidays");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHolidays();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Vacation Calendar Dashboard</h1>
        <p>Select a country and view type to see public holidays.</p>
      </header>

      <main className="app-main">
        <form onSubmit={handleSubmit} className="controls">
          <div className="input-group">
            <label htmlFor="country">Select Country:</label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {Object.keys(countries).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="viewType">View Type:</label>
            <select
              id="viewType"
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Show Calendar"}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {holidays.length > 0 && (
          <CalendarContainer holidays={holidays} viewType={viewType} />
        )}
      </main>
    </div>
  );
}

export default App;
