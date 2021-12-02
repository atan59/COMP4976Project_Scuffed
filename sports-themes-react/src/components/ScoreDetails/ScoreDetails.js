import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { getPlayerScoresByID, postPlayerScore } from '../ApiActions/ApiActions';
import ScoreCard from '../ScoreCard/ScoreCard';
import classes from './ScoreDetails.module.css'

const ScoreDetails = (props) => {
    const [playerScores, setPlayerScores] = useState([]);
    const [form, setForm] = useState({});
    const [addScoreFormLoaded, setAddScoreFormLoaded] = useState(false);
    
    useEffect(() => {
        if (!props.player.playerId) return
        getPlayerScoresByID(props.player.playerId, setPlayerScores)
    }, [props])

    const showAddPlayScoreForm = () => {
        setAddScoreFormLoaded(true)
    }

    const addPlayerScore = async (e, player, form) => {
        e.preventDefault();
        await postPlayerScore(player.playerId, form, setAddScoreFormLoaded)
        await getPlayerScoresByID(player.playerId, setPlayerScores)
    }

    const setField = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    return (
        <div className={classes.scoreContainer}>
            <div className={classes.scoreHeader}>
                <p>{props.player.playerName}'s Scores</p>
                <Button
                    style={{
                        backgroundColor: props.theme.buttonBackgroundColour,
                        color: props.theme.buttonTextColour
                    }} onClick={()=>showAddPlayScoreForm()}>
                    Add Score
                </Button>
            </div>
            <div className={classes.scoreListContainer}>
                    {playerScores.map(score => {
                        return <ScoreCard key={score.scoreId} theme={props.theme} score={score} />
                    })}
            </div>
            <div className={classes.addScoreFormContainer}>
                <Form onSubmit={(e)=> addPlayerScore(e, props.player, form)} style={{ visibility: addScoreFormLoaded ? 'visible': 'hidden'}}>
                    <h1>Team Scuffed</h1>
                    <div className={classes.inputElements}>
                        <Form.Group>
                            <Form.Label>Game Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.gameName}
                                onChange={e => setField('gameName', e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className={classes.inputElements}>
                        <Form.Group>
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                type="int"
                                value={form.score}
                                onChange={e => setField('score', e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <Button style={{
                        backgroundColor: props.theme.buttonBackgroundColour,
                        color: props.theme.buttonTextColour
                        }} 
                        type="submit">
                        Save Score
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ScoreDetails
