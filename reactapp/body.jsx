const styleTimerBlock = { 
    fontFamily: 'Consolas',
    position: 'absolute',
    bottom: '25px',
    right: '15px',
    paddingRight: '25px'
};

const registerBlock = { 
    fontFamily: 'Consolas',
    position: 'absolute',
    bottom: '25px',
    left: '25px'
};

class UserForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            username: '',
            email:  '',
            password: '',
            activestate: false
        }
    }
    
    handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })

      let st = this.state.currentStep;
      switch (st) {
        case 1: {
            this.state.activestate = value.match(/^(\w+\s?\w+)$/) !== null;
            break;
        } //console.log(name, value, value.match(/^(\w+\s?\w+)$/)); break;
        case 2: {
            this.state.activestate = value.match(/^(\w+\@\w+\.\w+)$/) !== null;
            break;
        } //console.log(name, value, value.match(/^(\w+\@\w+\.\w+)$/)); break;
        case 3: {
            this.state.activestate = value.match(/^(\w+|\~+|\*+|\@+|\#+)$/) !== null;
            break;
        } //console.log(name, value, value.match(/^(\w+|\~+|\*+|\@+|\#+)$/)); break;
        default: break;
      }
    }
    
    methodReCheckData = () => {
        let st = this.state.currentStep;
        switch (st) {
        case 1: {
            this.state.activestate = this.state.username.match(/^(\w+\s?\w+)$/) !== null;
            break;
        }
        case 2: {
            this.state.activestate = this.state.email.match(/^(\w+\@\w+\.\w+)$/) !== null;
            break;
        }
        case 3: {
            this.state.activestate = this.state.password.match(/^(\w+|\~+|\*+|\@+|\#+)$/) !== null;
            break;
        }
        default: break;
      }

      return this.state.activestate;
    }

    handleSubmit = event => {
      event.preventDefault()
      const { email, username, password } = this.state;
      
      if (!this.methodReCheckData()) {
        alert(`Введенные данные: неверны!`);
      }
      else {
        alert(`Введенные данные: \nИмя: ${username} \nEmail: ${email} \nПароль: ${password}`);
        const requestOptions = {
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9',
            'My-Custom-Header': 'dastdY_0a'
            },
            body: JSON.stringify({
                uname: this.state.username, 
                umail: this.state.email,
                upass: this.state.password
            })
        };
        fetch('http://reactapp.moonsiber.org/postdata.php', requestOptions)
        .then(response => console.log(response));
      }
    }
    
    _next = () => {
      
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2 ? 3: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
      this.methodReCheckData();
    }
       
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
      this.methodReCheckData();
    }

    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            this.methodReCheckData();
            return (
                <button 
                    type="button" 
                    onClick={this._prev}
                    disabled={!this.state.activestate}
                >Назад</button>
            )
        }
        return null;
    }

    nextButton(){
        let currentStep = this.state.currentStep;
        if (currentStep < 3) {
            this.methodReCheckData();
            return (
            <button 
                type="button" 
                onClick={this._next} 
                disabled={!this.state.activestate}
            >Вперед</button>        
            )
        }
        return null;
    }
   
    sendButton(){
        let currentStep = this.state.currentStep;
        if (currentStep === 3) {
            this.methodReCheckData();
            return (
                <button
                    disabled={!this.state.activestate}
                >Отправить</button>
            )
        }
        return null;
    }

    checkData() {
        let st = this.state.currentStep;
        switch (st) {
        case 1: {
            this.state.activestate = value.match(/^(\w+\s?\w+)$/) === null;
            break;
        } //console.log(name, value, value.match(/^(\w+\s?\w+)$/)); break;
        case 2: {
            this.state.activestate = value.match(/^(\w+\@\w+\.\w+)$/) === null;
            break;
        } //console.log(name, value, value.match(/^(\w+\@\w+\.\w+)$/)); break;
        case 3: {
            this.state.activestate = value.match(/^(\w+|\~+|\*+|\@+|\#+)$/) === null;
            break;
        } //console.log(name, value, value.match(/^(\w+|\~+|\*+|\@+|\#+)$/)); break;
        default: break;
        }
        return this.state.activestate;
    }
 
    render() {    
    return (
        <div style={registerBlock}>
        <h1>Форма регистрации</h1>
        <p>Шаг {this.state.currentStep} </p> 

        <form onSubmit={this.handleSubmit}>
        <UserNameStep
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            username={this.state.username}
        />
        <EmailStep
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            email={this.state.email}
        />
        <PasswordStep
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            password={this.state.password}
        />
        
        {this.previousButton()}
        {this.nextButton()}
        {this.sendButton()}
        
        </form>
        </div>
    );
    }
}

class UserNameStep extends React.Component {

  render() {
    if (this.props.currentStep !== 1) {
      return null
    } 
    return (
      <div style={{display:'inline'}}>
        <label style={{width:'50px'}}>Имя</label>&nbsp;
        <input
          name="username"
          type="text"
          placeholder="Введите имя"
          value={this.props.username}
          onChange={this.props.handleChange}
          />&nbsp;
      </div>
    );
  }
}

class EmailStep extends React.Component {
  render() {
      if (this.props.currentStep !== 2) {
          return null;
      } 
      return (
          <div style={{display:'inline'}}>
            <label style={{width:'50px'}}>Email</label>&nbsp;
            <input
              name="email"
              type="text"
              placeholder="Введите email"
              value={this.props.email}
              onChange={this.props.handleChange}
              />&nbsp;
          </div>
      );
  }
}

class PasswordStep extends React.Component {
  render () {
    if (this.props.currentStep !== 3) {
      return null
    }
    return(
      <div style={{display:'inline'}}>
        <label style={{width:'50px'}}>Пароль</label>&nbsp;
        <input
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={this.props.password}
          onChange={this.props.handleChange}
          />&nbsp;
      </div>
    );
  }
}

ReactDOM.render(<UserForm />, document.getElementById('register'))