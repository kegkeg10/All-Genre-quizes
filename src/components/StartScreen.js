import React from 'react'

function StartScreen({numQuestions, dispatch}) {
    return (
        <div className='start'>
            <h2>Welcome To Movie Quiz!</h2>
            <h3>{numQuestions} question to test your movie knowledge</h3>
            <button
                className='btn btn-ui'
                onClick={() => dispatch({type: 'start'})}
            >Lets Start</button>
        </div>
    )
}
export default StartScreen