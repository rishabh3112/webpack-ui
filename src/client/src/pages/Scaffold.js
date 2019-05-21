import React, {useState, useEffect, useRef} from 'react';
import User from '../helpers/User';
import { Link } from 'react-router-dom';
import { Question } from '../components/Question';
import { request } from '../store/features/webpack';
import { Fab, CircularProgress, Typography, Button } from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrowTwoTone'
import Timeout from '../helpers/TimeoutPromise';
import Done from '@material-ui/icons/DoneOutlineTwoTone';
import {connect} from 'react-redux';
import {refresh} from '../store/features/webpack';

// Polyfill
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

function Scaffold(props) {
    const [answer, setAnswer] = useState("")
    const [disable, setDisable] = useState(null)
    const [question, setQuestion] = useState(null)
    const [isScaffolding, setIsScaffolding] = useState(true);
    const [questionIterable, setQuestionIterable] = useState(getQuestion(props));
    const [message, setMessage] = useState("Installing and processing starter's package")
    const ANSWER = useRef(answer);
    const WEBPACK = useRef(props.webpack);

    async function* getQuestion() {
        await request('/api/init', {type: props.match.params.name});
        const user = new User();
        let ques = await user.question();
    
        while (ques) {
            if (!Array.isArray(ques)) {
                yield <Question question={ques} answer={answer} setAnswer={setAnswer}/>
                user.answer({
                    answer: {
                        [ques.name]: ANSWER.current,
                    }
                });
                setAnswer("");
            } else {
                let ans = { answer: {} }
                for(let i=0, l=ques.length; i<l; i++){
                    yield <Question question={ques[i]} answer={answer} setAnswer={setAnswer} />
                    ans.answer[ques[i].name] = ANSWER.current;
                    setAnswer("");
                }
                user.answer(ans);
            }
            ques = await Timeout(2000, user.question());
        }
        setMessage("Scaffolding your project");
        user.socket.close();
        yield null;
    }

    useEffect(() => {
        let TITLE = props.match.params.name.split("-").splice(2).join(" ") + " starter";
        TITLE = TITLE[0].toUpperCase() + TITLE.split("").splice(1).join("");
        props.setTitle(TITLE); 
        (async () => {
            const value = await questionIterable.next();
            await setQuestion(value.value);
        })();
    },[]);

    useEffect(() => {
        ANSWER.current = answer;
    },[answer]);

    useEffect(() => {
        WEBPACK.current = props.webpack;
    },[props.webpack]);

    useEffect(()=>{
        if (message === "Scaffolding your project") {
            const scaffoldingInterval = setInterval(async () => {
                await props.refresh();
                if (WEBPACK.current !== null) {
                    setIsScaffolding(false);
                    clearInterval(scaffoldingInterval);
                }
            }, 4000)
        }
    }, [message])

    return(
        <>
            {
                question &&
                <div>
                        {question}
                    <Fab style={{position: "relative", top: "-27.5px", left: "90%", transform: "translateX(-50%)"}} disabled={disable} color="primary" onClick={
                        async () => {
                            const nextQuestion = await questionIterable.next();
                            setQuestion(nextQuestion.value);
                    }}><PlayArrow></PlayArrow></Fab>
                </div>
            }
            {
                !question && isScaffolding &&
                <div>
                    <center style={{paddingTop: "10%"}}>
                        <CircularProgress></CircularProgress>
                        <Typography variant="h5">{message}</Typography>
                    </center>
                </div>
            }
            {
                !isScaffolding &&
                <div>
                    <center style={{paddingTop: "10%"}}>
                        <Done></Done>
                        <Typography variant="h5">Your starter project is created!</Typography>
                        <Link to="/">
                            <Button>Return to Dashboard</Button>
                        </Link>
                    </center>
                </div>
            }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        webpack: state.webpack,
    }
};
export default connect(mapStateToProps, {refresh})(Scaffold);