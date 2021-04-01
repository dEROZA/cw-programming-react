const styleAnnouncmentBlock = { 
    fontFamily: 'Consolas',
    position: 'absolute',
    top: '15px',
    left: '25px'
};

class Announcment extends React.Component {
    render() {
        return (
            <h1 style={styleAnnouncmentBlock}>Привет, Гость!</h1>
        );
    }
}

ReactDOM.render(
    <Announcment />,
    document.getElementById("announcment")
)
