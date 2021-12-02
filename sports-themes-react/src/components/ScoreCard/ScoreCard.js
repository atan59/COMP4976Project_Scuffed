import React from 'react'
import { Button } from 'react-bootstrap'
import classes from './ScoreCard.module.css'

const ScoreCard = (props) => {
    return (
        <div className={classes.scoreCard} style={{ color: props.theme.textColour }}>
            <div className={classes.scoreInfo}>
                <p>{props.score.gameName}</p>
                <p>{props.score.playerScore}</p>
            </div>
            <div className={classes.flexEnd}>
                <Button
                    style={{ backgroundColor: props.theme.buttonBackgroundColour, color: props.theme.buttonTextColour }}>
                    Edit Score
                </Button>
            </div>
        </div>
    )
}

export default ScoreCard
