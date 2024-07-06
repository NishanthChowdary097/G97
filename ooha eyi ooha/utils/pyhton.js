const jwt_decode = require('jwt-decode');
const User = require('../models/userModel.js')

async function fetchUserData(req) {
    try {
        const user_token = req;
        const decodedToken = jwt_decode.jwtDecode(user_token);
        if (!decodedToken)
            throw new Error("Invalid Token");
        // const user = await User.find({name: decodedToken.name})
        // if (!user){
        //     user = await User.create({
        //         name: decodedToken.name,
        //         roll: decodedToken.username,
        //         entry: false,
        //         count: 0
        //     })
        //     console.log("creaeted:", user);
        // }
        const access = await User.find({name: decodedToken.name}).select('entry')
        const ret = {
            'uname': decodedToken.name,
            // 'entry': access[0].entry,
        };
        return ret;

    } catch (e) {
        console.error("Error:", e);
        throw e;
    }
}

async function helperFunction(requestData) {
    try {
        // const { topicId, token } = requestData;

        // const headers = {
        //     'Authorization': `Bearer ${token}`,
        //     'Referer': 'https://tesseractonline.com/'
        // };

        // const quizReq = `https://api.tesseractonline.com/quizattempts/create-quiz/${topicId}`;

        // const response = await axios.get(quizReq, { headers });

        // const data = response.data;

        // if (!data.payload) {
        //     throw new Error("An unexpected error occurred while creating quiz.");
        // }

        // const quizId = data.payload.quizId;

        // if (!quizId) {
        //     throw new Error("Quiz ID not found in response.");
        // }

        // const questions = data.payload.questions.map(questionData => ({
        //     question_id: questionData.questionId,
        //     question: questionData.question,
        //     options: questionData.options
        // }));

        // const answers = {};

        // let ptr = 1;
        // let currentScore = 1;

        // const saveAnswerAndSubmitQuiz = async (question, userAnswer) => {
        //     const saveAnswerUrl = "https://api.tesseractonline.com/quizquestionattempts/save-user-quiz-answer";
        //     const payload = {
        //         quizId,
        //         questionId: question.question_id,
        //         userAnswer: String(userAnswer)
        //     };

        //     let response = await axios.post(saveAnswerUrl, payload, { headers });

        //     if (response.status !== 201) {
        //         return false;
        //     }

        //     const submitQuizUrl = "https://api.tesseractonline.com/quizattempts/submit-quiz";
        //     const submitPayload = { quizId };

        //     response = await axios.post(submitQuizUrl, submitPayload, { headers });

        //     const submitData = response.data;
        //     console.log();("Submit quiz response data:", submitData);

        //     if (!submitData.payload || submitData.payload.score == null) {
        //         throw new Error("An unexpected error occurred while submitting quiz.");
        //     }

        //     currentScore = submitData.payload.score;
        //     return currentScore;
        // };

        // while (currentScore < questions.length - 2) {
        //     for (const question of questions) {
        //         if (answers[question.question_id]) {
        //             continue;
        //         }

        //         let userAnswer = 'a';

        //         currentScore = await saveAnswerAndSubmitQuiz(question, userAnswer);
        //         if (currentScore !== ptr) {
        //             for (const key of Object.keys(question.options)) {
        //                 if (key === userAnswer) {
        //                     continue;
        //                 }

        //                 currentScore = await saveAnswerAndSubmitQuiz(question, key.trim()[0]);
        //                 if (currentScore === ptr) {
        //                     answers[question.question_id] = key;
        //                     break;
        //                 }
        //             }
        //         }
        //         ptr += 1;
        //         answers[question.question_id] = userAnswer;
        //     }
        // }
        console.log("All questions answered correctly!");
    } catch (error) {
        console.error("Error occurred:", error.message);
    }
}

module.exports = { fetchUserData, helperFunction };
