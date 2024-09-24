import "./Navbar.css";
export const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <button href="./home.html" className="navButton">
          Logo
        </button>
        <button className="navButton">Workouts</button>
        <button className="navButton">Exercises</button>
        <button className="navButton">Log</button>
        <button className="navButton">Sleep Tracker</button>
        <button className="navButton">Diet Tracker</button>
        <button className="navButton">Biometrics</button>
        <button className="navButton">Settings</button>
      </div>
    </div>
  );
};
