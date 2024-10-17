 // code for overlay that I realized I don't need
  // const [workoutIdOverlay, setWorkoutIdOverlay] = useState();
  // const open = (id) => {
  //   setWorkoutIdOverlay(id);
  //   document.getElementById("overlay").style.width = "85vw";
  //   document.getElementById("overlay").style.height = "100vh";
  // };

  // const close = () => {
  //   document.getElementById("overlay").style.width = "0vw";
  //   document.getElementById("secondaryOverlay").style.width = "0vw";
  // };

  // const openSecondary = () => {
  //   document.getElementById("secondaryOverlay").style.width = "85vw";
  //   document.getElementById("secondaryOverlay").style.height = "40vh";
  // };
  /* <div className="overlay" id="overlay">
        <div className="xButton">
          <X size={30} onClick={close} />
        </div>
        <div className="overlay-content">
          Would you like to use recommendations?
          <div>
            <button className="exerciseButton" onClick={openSecondary}>
              Yes
            </button>
            <button
              className="exerciseButton"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`inprogress/${workoutIdOverlay}`);
              }}
            >
              No
            </button>
          </div>
        </div>
        <div className="overlay" id="secondaryOverlay">
          <div className="secondary-overlay-content">secondary</div>
        </div>
      </div> */