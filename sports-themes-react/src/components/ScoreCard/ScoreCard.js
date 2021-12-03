import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { updatePlayerScore } from '../ApiActions/ApiActions';
import classes from './ScoreCard.module.css'

const ScoreCard = (props) => {
    const [editState, setEditState] = useState(false);
    const [gameName, setGameName] = useState('');
    const [playerScore, setPlayerScore] = useState(0);

    useEffect(() => {
        if (!props.score.gameName) return

        setGameName(props.score.gameName);
        setPlayerScore(props.score.playerScore);
    }, [props])

    const handleEdit = () => {
        if (!editState) {
            setEditState(true);
            return;
        }

        updatePlayerScore(props.score.scoreId, gameName, playerScore, props.playerID, setEditState)
    }

    return (
        <div className={classes.scoreCard} style={{ color: props.theme.textColour }}>
            <div className={classes.scoreInfo}>
                {editState ? (
                    <>
                        <Form.Label><i class="fas fa-trophy">&nbsp;&nbsp;&nbsp;</i></Form.Label>
                        <Form.Control
                            type="text"
                            value={gameName}
                            onChange={e => setGameName(e.target.value)}
                        />
                        <Form.Label><i class="fas fa-trophy">&nbsp;&nbsp;&nbsp;</i></Form.Label>
                        <Form.Control
                            type="number"
                            value={playerScore}
                            onChange={e => setPlayerScore(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <p><i class="fas fa-trophy">&nbsp;&nbsp;&nbsp;</i> {gameName}</p>
                        <p><i class="fas fa-list-ol"></i>&nbsp;&nbsp;&nbsp; {playerScore}</p>
                    </>
                )}
            </div>
            {props.role === 'Coach' && <div className={classes.flexEnd}>
                <Button
                onClick={() => handleEdit()}
                    style={{ backgroundColor: props.theme.buttonBackgroundColour, color: props.theme.buttonTextColour }}>
                    {editState ? <>Save Score</> : <>Edit Score</>}
                </Button>
            </div>}
        </div>
    )
}

export default ScoreCard
