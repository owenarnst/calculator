import { useState, useEffect } from 'react'
import './styles/App.css'
import Numbers from './components/Numbers'
import Operations from './components/Operations'
import Display from './components/Display'
import { Equals, AllClear, Decimal } from './components/Misc'
import { infix_to_postfix, postfix_to_answer } from './Algorithms/postFix'



let equationArray = [];

function App() {

  //Keep track of display state
  const [equation, setEquation] = useState("");
  const [answer, setAnswer] = useState("");
  const [placeholder, setPlaceholder] = useState(0);

  //Handle events
  const [equalsPressed, setEqualsPressed] = useState(false);
  const [isNegative, setIsNegative] = useState(false);

  //Reset Calculator
  const clear = () => {
      equationArray = [];
      setEquation("");
      setAnswer("");
      setPlaceholder(0);
      setEqualsPressed(false);
  }

  //Perform Calculation and Rerender Page
  useEffect(() => {
    //If the equals button is pressed, apply postFix algs to equation array
    if (equalsPressed) {
      const post = infix_to_postfix(equationArray);
      const ans = postfix_to_answer(post);
      setAnswer(ans);
      setPlaceholder(ans)
    }
  }, [equalsPressed]);

  //Clean up equation array and call use effect with equalsPressed dependency
  const calc = () => {
    //Push current number to equation array
    if(answer.length > 0) {
      //Create a new, mutable variable to be pushed into equationArray
      let pushedNumber = answer;
      //If the number is negative, change answer to be negative and pop the minus operator from the equation array
      if(isNegative) {
        pushedNumber = equationArray.pop() + answer;
        //If the minus is used as an operator, replace it with a "+" so that the negative number gets evaluated properly
        if ("+/*-".indexOf(equationArray[equationArray.length - 1]) == -1) {
          equationArray.push("+");
        }
        setIsNegative(false);
      }
      equationArray.push(pushedNumber);
    }

    //Do nothing if no input
    if (equationArray.length === 0) {return}

    //Clean up equation array
    if("+/*".indexOf(equationArray[0]) > -1) {
      equationArray.shift();
    }
    if("+-/*".indexOf(equationArray[equationArray.length - 1]) > -1) {
      equationArray.pop();
    }

    //Solve
    setEqualsPressed(true);
  }

  //Add value to equation accordingly
  const addToEquation = (char) => {
    //Checks for Number
    if ("0123456789".indexOf(char) > -1) {
      //If the equal button was pressed before hand, the calculator clears and proceeds as normal
      if(equalsPressed) {
          equationArray = [];
          setAnswer(char);
          setEqualsPressed(false);
          if (char == "0") {
            setEquation("");
          }
          else {
            setEquation(char);
          }
          return;
      }
      //If a minus sign was typed before hand, indicate that the current number is negative
      if (equation[equation.length-1] == "-") {
          setIsNegative(true);
      }
      //If previous input was 0, no change
      if(answer[answer.length-1] == "0") {}
      //Else add char to current answer and equation
      else {
        setAnswer(answer + char);
        setEquation(equation + char);
      }
    }
    //Checks for operator
    else if ("+-/*".indexOf(char) > -1) {

      //If equals button was pressed before hand, continue calculation and reset equation with prev answer
      if(equalsPressed) {
        console.log(answer);
        equationArray = [answer, char];
        setEquation(answer + char);
        setEqualsPressed(false);
        setAnswer("");
        return;
      }

      //If two operators are typed consecutively at the start, just set equation to the fresh input
      if(equation.length == 1 && "+-/*".indexOf(equation[0]) > -1) {
        setEquation(char);
        setAnswer(char);
        equationArray[0] = char;
        return;
      }

      //If the answer holds a number, push it onto equation array
      if(answer.length > 0) {
          //Create a new, mutable variable to be pushed into equationArray
          let pushedNumber = answer;
          //If the number is negative, change answer to be negative and pop the minus operator from the equation array
          if(isNegative) {
            pushedNumber = equationArray.pop() + answer;
            //If the minus is used as an operator, replace it with a "+" so that the negative number gets evaluated properly
            if ("+/*-".indexOf(equationArray[equationArray.length - 1]) == -1) {
              equationArray.push("+");
            }
            setIsNegative(false);
          }
          equationArray.push(pushedNumber);
      }

      //Reset current answer and show operator 
      setAnswer("");
      setPlaceholder(char);

      //If a number has been inputted or the equation starts with an operator, push operator to equation array and update display
      if (equation.length == 0 || "0123456789.".indexOf(equation[equation.length-1]) > -1) {
        equationArray.push(char);
        setEquation(equation + char);
      }
      //Else if the previous input was an operator, only allow "-" to be added
      else if (char == "-") {
        equationArray.push(char);
        setEquation(equation + char);
      }
      //If minus was used as a negative and another operation already exists, use new operation
      else if (equation.length > 2 && "+-*/".indexOf(equation[equation.length-1]) > -1 && "+-*/".indexOf(equation[equation.length-2]) > -1) {
        equationArray.pop();
        equationArray[equationArray.length - 1] = char;
        setEquation(equation.slice(0, equation.length-2) + char);
      }
      //Else replace last input with current operator
      else {
        equationArray[equationArray.length - 1] = char;
        setEquation(equation.slice(0, equation.length-1) + char);
      }
      
    }
    //handle decimal button
    else {
      //do nothing if current number already has a decimal
      if (answer.indexOf(".") > -1) {}
      //if decimal is not the start of current number, add it to answer and current equation
      else if("0123456789".indexOf(equation[equation.length-1]) > -1) {
        setAnswer(answer + char);
        setEquation(equation + char);
      }
      //else indicate the beginning of a new number with a 0 at the front
      else {
        setAnswer(answer + "0.");
        setEquation(equation + "0.")
      }
    }
  }

  //When a button is clicked, clear, calculate, or add to equation
  const handleClick = (event) => {
    let val = event.target.textContent;
    if(val == "AC") {
      clear();
    }
    else if(val == "=" && answer !== undefined) {
      calc();
    }
    else if (answer !== undefined || "0123456789.".indexOf(val) > -1) {
      //If the times operator is clicked, use * in the following steps
      if(val == "x") {
        val = "*";
      }
      addToEquation(val);
    }
  }

  return (
    <main className='container p-1 custom-container'>
      <div id="output" className="row gx-0 border border-light">
        <div className="col p-0">
          <Display equation={equalsPressed ? (answer != undefined ? `${equation} = ${answer}` : "undefined") : equation} answer={answer ? answer : placeholder} />
        </div>
      </div>
      <div className="row gx-2 my-2">
        <div className="col-6">
          <AllClear Clear={handleClick} />
        </div>
        <div className="col">
          <Operations applyOp={handleClick} symbol="/" />
        </div>
        <div className="col">
          <Operations applyOp={handleClick} symbol="x" />
        </div>
      </div>
      <div className="row gx-2 my-2">
        <div className="col">
          <Numbers applyNum={handleClick} num={"seven"} val={7} />
        </div>
        <div className="col">
          <Numbers applyNum={handleClick} num={"eight"} val={8} />
        </div>
        <div className="col">
          <Numbers applyNum={handleClick} num={"nine"} val={9} />
        </div>
        <div className="col">
          <Operations applyOp={handleClick} symbol={"-"} />
        </div>
      </div>
      <div className="row gx-2 my-2">
        <div className="col">
            <Numbers applyNum={handleClick} num={"four"} val={4} />
          </div>
          <div className="col">
            <Numbers applyNum={handleClick} num={"five"} val={5} />
          </div>
          <div className="col">
            <Numbers applyNum={handleClick} num={"six"} val={6} />
          </div>
          <div className="col">
            <Operations applyOp={handleClick} symbol={"+"} />
          </div>
      </div>
      <div className="row gx-2">
        <div className="col-9">
          <div className="row gx-2">
            <div className="col">
              <Numbers applyNum={handleClick} num={"one"} val={1} />
            </div>
            <div className="col">
              <Numbers applyNum={handleClick} num={"two"} val={2} />
            </div>
            <div className="col">
              <Numbers applyNum={handleClick} num={"three"} val={3} />
            </div>
          </div>
          <div className="row my-2 gx-2">
            <div className="col-8">
              <Numbers applyNum={handleClick} num={"zero"} val={0} />
            </div>
            <div className="col">
              <Decimal applyDec={handleClick} />
            </div>
          </div>
        </div>
        <div className="col">
          <Equals Calculate={handleClick} />
        </div>
      </div>
    </main>
  )
}

export default App
