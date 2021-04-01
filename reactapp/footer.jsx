const styleTimerBlock = { 
    fontFamily: 'Consolas',
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    paddingRight: '25px'
};

function tick() {
    ReactDOM.render(
      <div style={styleTimerBlock}>
        <h2>Текущее время {new Date().toLocaleTimeString()}</h2>
      </div>,
      document.getElementById("timer")
    );
  }

  tick(); setInterval(tick, 1000);