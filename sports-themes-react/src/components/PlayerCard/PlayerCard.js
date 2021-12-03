import React from 'react'
import { Button } from 'react-bootstrap'
import classes from './PlayerCard.module.css'

const PlayerCard = (props) => {
    return (
        <div className={classes.playerCard} style={{ color: props.theme.textColour }}>
            <div className={classes.playerInfo}>
                <p><i class="fas fa-user"></i>&nbsp;&nbsp;&nbsp; {props.player.playerName}</p>
                <p>{props.player.position}</p>
            </div>
            <div className={classes.flexEnd}>
                <Button
                    onClick={() => props.handleClick(props.player)}
                    style={{ backgroundColor: props.theme.buttonBackgroundColour, color: props.theme.buttonTextColour }}>
                    View Scores
                </Button>
            </div>
        </div>
    )
}

export default PlayerCard
