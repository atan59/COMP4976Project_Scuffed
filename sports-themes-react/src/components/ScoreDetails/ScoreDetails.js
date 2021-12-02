import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { getPlayerScoresByID } from '../ApiActions/ApiActions';
import ScoreCard from '../ScoreCard/ScoreCard';
import classes from './ScoreDetails.module.css'

const ScoreDetails = (props) => {
    const [playerScores, setPlayerScores] = useState([]);

    useEffect(() => {
        if (!props.player.playerId) return

        getPlayerScoresByID(props.player.playerId, setPlayerScores)
    }, [props])

    return (
        <div className={classes.scoreContainer}>
            <div className={classes.scoreHeader}>
                <p>{props.player.playerName}'s Scores</p>
                <Button
                    style={{
                        backgroundColor: props.theme.buttonBackgroundColour,
                        color: props.theme.buttonTextColour
                    }}>
                    Add Score
                </Button>
            </div>
            <div className={classes.scoreListContainer}>
                    {playerScores.map(score => {
                        return <ScoreCard theme={props.theme} score={score} />
                    })}
                </div>
        </div>
    )
}

export default ScoreDetails
