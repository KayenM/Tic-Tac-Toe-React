import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/* replace normal component with a function component as it doesnt need state

class Square extends React.Component {  

    render() {
      return (
        <button 
            className="square" 
            onClick={() => this.props.onClick()}
        >
          {this.props.value}    
        </button>
      );
    }
  }
  */

  function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
  }
  
  class Board extends React.Component {
    
    constructor(props){ //needed whenever your component has states
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }
    handleClick(i){
       
        const squares = this.state.squares.slice();  //creates a copy of squares array so we dont chage existing array

        if(calculateWinner(squares) || squares[i]){  //don't let people keep clicking if the game was won or the current square is filled
            return
        }

        squares[i]=this.state.xIsNext ? 'X':'O';  //changes local copy of array cell to X is our bool flag is true and O is not
        this.setState({
            squares: squares, //to update the state array with our copied array 
            xIsNext: !this.state.xIsNext,
    }) 
    }

    renderSquare(i) {
      //props that we pass down to each square
      //value prop passes the prop indexed element with X, O, or null values down to each square
      //pass this function to each square so if clicked it will call this function in board component
      return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}   
      />
      );  
    }
  
    render() {
      
      const winner = calculateWinner(this.state.squares); //each time board renders check if theres a winner
      let status;   //what is displayed above the game
      if(winner){
        status = 'Winner is ' + winner;
      }
      else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  //function which calculates if someone won
  function calculateWinner(squares) {
    //all posible winning lines in array of 9 squares
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {    //iterate through each winning combination
      const [a, b, c] = lines[i];

      //check if all three spaces in winning line option is filled with the same value (x,o) in the squares array
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];  //return content inside the square (ex. X or O)
      }
    }
    return null; //no winning line exists
  }

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  