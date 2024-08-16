import React, { Component } from 'react'
import "./App.css";
import Box from "./component/Box"

// 1. 박스 2개 (타이틀, 사진, 결과)
// 2. 가위 바위 보 버튼
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3, 4 번의 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패 결과에 따라 테두리 색이 바뀐다. (이기면 초록, 지면 빨강, 비기면 검정)

const choice = {
  rock:{
    name:"Rock",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0iRqU33nTGLszyNGvLn39CRDpmWjk9iHbKQ&s"
  },
  scissors:{
    name:"Scissors",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCn2leEIpH_ZiItC5OYvzuovtDOwEJjJpGbn9bxuGy5CL0J4m3wT_VGs0YPZPfI0uWUHc&usqp=CAU"
  },
  paper:{
    name:"Paper",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTByxl21CEOgZgxly6ILu-ZE39e6RrAGFSQGw&s" 
  },
};
export default class AppClass extends Component {
  constructor() {
    super();
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: "",
    };
  }

  play = (userChoice) => {
    let computerChoice = this.randomChoice();
    this.setState({
      userSelect: choice[userChoice],
      computerSelect: computerChoice,
      result: this.judgement(choice[userChoice], computerChoice),
    });
  };
  randomChoice = () => {
    let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };
  judgement = (user, computer) => {

    
    // user === computer 비김(tie)
    // user === rock, computer === scissors user 이김
    // user === rock, computer === paper user 짐
    // user === scissors, computer === paper user 이김
    // user === scissors, computer === rock user 짐
    // user === paper, computer === rock user 이김
    // user === paper, computer == scissors user 짐


    if(user.name === computer.name) {
      return "tie";
    } else if(user.name === "Rock") {
        return computer.name === "Scissors" ? "win" : "lose"
      }
      else if(user.name === "Scissors") {
        return computer.name === "Paper" ? "win" : "lose"
      }
      else if(user.name === "Paper") {
        return computer.name === "Rock" ? "win" : "lose"
      };
  };

  render() {
    return (
      <div>
        <div className="main">
          <Box
            title="You"
            item={this.state.userSelect}
            result={this.state.result}
          />
          <Box
            title="Computer"
            item={this.state.computerSelect}
            result={this.state.result}
          />
        </div>
        <div className="main">
          <button onClick={() => this.play("scissors")}>가위</button>
          <button onClick={() => this.play("rock")}>바위</button>
          <button onClick={() => this.play("paper")}>보</button>
        </div>
      </div>
    );
  }
}