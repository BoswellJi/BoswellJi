import React,{ useState } from 'react';

function App() {
  console.log(0);
  const [state, setState] = useState(0);

  const changeState = ()=>{
    setState(state + 1)
  }

  return (
    <div className="App">
      {state}
      <Test1></Test1>
      <Test2></Test2>
      <button onClick={changeState}>click0</button>
    </div>
  );
}

function Test1(){
  console.log(1);
  const [state, setState] = useState(0);

  const changeState = ()=>{
    setState(state + 1)
  }

  return (
    <div>
      test1{state}1
      <Test2></Test2>
      <button onClick={changeState}>click1</button>
    </div>
  );
}

class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    console.log(2);
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log(2,nextProps,nextState);
    return false;
  }

  render() {
    console.log('render2');
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click2
        </button>
      </div>
    );
  }
}

export default App;
