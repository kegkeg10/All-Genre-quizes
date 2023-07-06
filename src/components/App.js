import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const quizData = {
  "questions": [
    {
      "question": "What movie won best picture in 1995",
      "options": ["Toy Story", "BraveHeart", "Apollo 13", "12 Monkeys"],
      "correctOption": 1,
      "points": 10
    },
    {
      "question": "How Many killers are in the scream franchise?",
      "options": ["11", "9", "13", "12"],
      "correctOption": 3,
      "points": 10
    },
    {
      "question": "What actor won best performance in a leading role in 2021?",
      "options": ["Anthony Hopkins-The Father", "Riz Ahmed-Sound of metal", "Steven Yeun-Minari", "Chadwick Boseman-Ma Raineys black bottom"],
      "correctOption": 0,
      "points": 10
    },
    {
      "question": "What Movie is not apart of the Cornetto Trilogy?",
      "options": [
        "Worlds End",
        "Hot Fuzz",
        "Shaun of the dead",
        "Paul"
      ],
      "correctOption": 3,
      "points": 30
    },
    {
      "question": "What Anime Movie Famously won best animated Film?",
      "options": [
        "Your Name",
        "Princess Mononoke",
        "Spirited Away",
        "Akira"
      ],
      "correctOption": 2,
      "points": 20
    },
    {
      "question": "Whats the name of Quint Boat in Jaws.",
      "options": [
        "Orca",
        "The Eater",
        "hunter",
        "The Killer"
      ],
      "correctOption": 0,
      "points": 30
    }
  ]
};

const initialState = {
  questions: quizData.questions,
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    dispatch({ type: "start" });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              maxPossiblePoints={maxPossiblePoints}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}