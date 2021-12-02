import React, { useEffect, useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import { getNoTeamRoster, postPlayerToTeam, getPlayerRoster } from '../ApiActions/ApiActions';
import classes from '../TeamContainer/TeamContainer.module.css';

const TeamContainer = (props) => {
    const [noTeamRoster, setNoTeamRoster] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState({});
    const [playerRoster, setPlayerRoster] = useState([]);
    const [fontSize, setFontSize] = useState('');
    const dropdownRef = useRef(null);
    const confirmRef = useRef(null);

    useEffect(() => {
        getNoTeamRoster(setNoTeamRoster);

        if (!props.teamName) return

        getPlayerRoster(props.teamName, setPlayerRoster)
    }, [props])

    useEffect(() => {
        const fontArr = { 0: 'xxx-large', 1: 'xx-large', 2: 'x-large', 3: 'large', 4: 'medium' };
        setFontSize(fontArr[props.theme.fontSize])
    }, [props])

    const addPlayerToTeam = async (player) => {
        await postPlayerToTeam(JSON.parse(player), props.teamName)
        await getPlayerRoster(props.teamName, setPlayerRoster)
    }

    const showDropdown = () => {
        const dropdown = dropdownRef.current;
        dropdown.style.visibility = 'visible';
    }

    const showConfirm = (player) => {
        const confirmButton = confirmRef.current;
        setSelectedPlayer(player);

        if (!player) {
            confirmButton.style.visibility = 'hidden';
            return;
        }

        confirmButton.style.visibility = 'visible';
    }

    return (
        <div className={classes.container}>
            <div className={classes.logoTeamNameContainer} style={{ fontFamily: props.theme.font }}>
                <img src={props.theme.logo} alt="" className={classes.logo} />
                <div className={classes.teamName} style={{ fontSize: fontSize, color: props.theme.textColour }}>{props.teamName} Player Statistics</div>
            </div>
            <div className={classes.playerListAndScoreContainer}>
                <div className={classes.playerListContainer}>
                    {playerRoster.map(player => {
                        return <>
                            <div className={classes.playerCard} style={{ color: props.theme.textColour }}>
                                <div className={classes.playerName}>{player.playerName}</div>
                                <div className={classes.playerPosition}>{player.position}</div>
                                <button className={classes.viewScoreBtn} style={{ backgroundColor: props.theme.buttonBackgroundColour, color: props.theme.buttonTextColour }}>View Scores</button>
                            </div>
                        </>
                    })}
                </div>
                <div className={classes.playerScoreContainer} style={{ color: props.theme.textColour }}>
                    score container view
                </div>
            </div>
            <div className={classes.addPlayerContainer} style={{ color: props.theme.textColour }}>
                <Button
                    style={{ backgroundColor: props.theme.buttonBackgroundColour }}
                    onClick={() => showDropdown()}>
                    Add Player
                </Button>
                <Form.Group className={classes.addPlayerSelect} ref={dropdownRef}>
                    <Form.Control
                        as="select"
                        value={selectedPlayer}
                        onChange={e => showConfirm(e.target.value)}>
                        <option value=''>Select one</option>
                        {noTeamRoster.map(player => {
                            return <option key={player.playerId} value={JSON.stringify(player)}>{player.playerName}</option>
                        })}
                    </Form.Control>
                </Form.Group>
                <Button
                    ref={confirmRef}
                    onClick={() => addPlayerToTeam(selectedPlayer)}
                    style={{ backgroundColor: props.theme.buttonBackgroundColour }}>
                    Confirm
                </Button>
            </div>
        </div>
    )
};
export default TeamContainer


