const quizData = require("../data/questions.json");

exports.handler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(quizData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};