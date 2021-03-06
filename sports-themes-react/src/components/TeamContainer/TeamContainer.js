import React, { useEffect, useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import { getNoTeamRoster, postPlayerToTeam, getPlayerRoster } from '../ApiActions/ApiActions';
import classes from '../TeamContainer/TeamContainer.module.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import PlayerCard from '../PlayerCard/PlayerCard';
import ScoreDetails from '../ScoreDetails/ScoreDetails';

const TeamContainer = (props) => {
    const [noTeamRoster, setNoTeamRoster] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState({});
    const [playerRoster, setPlayerRoster] = useState([]);
    const [headerFontSize, setHeaderFontSize] = useState('');
    const [textFontSize, setTextFontSize] = useState('');
    const [playerDetails, setPlayerDetails] = useState(null);
    const dropdownRef = useRef(null);
    const confirmRef = useRef(null);
    const notyf = new Notyf({
        duration: 4000,
        position: {
            x: 'right',
            y: 'bottom',
        }
    });

    useEffect(() => {
        getNoTeamRoster(setNoTeamRoster);

        if (!props.teamName) return
        getPlayerRoster(props.teamName, setPlayerRoster)
    }, [props])

    useEffect(() => {
        const headerFontArr = { 0: 'xxx-large', 1: 'xx-large', 2: 'x-large', 3: 'large', 4: 'medium' };
        const textFontArr = { 0: 'x-large', 1: 'large', 2: 'medium', 3: 'small', 4: 'x-small' };
        setHeaderFontSize(headerFontArr[props.theme.headerFontSize])
        setTextFontSize(textFontArr[props.theme.textFontSize])
    }, [props])

    const addPlayerToTeam = async (player) => {
        const confirmButton = confirmRef.current;
        confirmButton.style.visibility = 'hidden';

        const dropdown = dropdownRef.current;
        dropdown.style.visibility = 'hidden';

        await postPlayerToTeam(JSON.parse(player), props.teamName)
        await getPlayerRoster(props.teamName, setPlayerRoster)
        await getNoTeamRoster(setNoTeamRoster);
    }

    const showDropdown = () => {
        if (noTeamRoster.length === 0) {
            notyf.error('All players are currently on a team');
            return
        }

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
        <div className={classes.container} style={{ fontSize: textFontSize }}>
            <div className={classes.logoTeamNameContainer}>
                <img src={props.theme.logo} alt="" className={classes.logo} />
                <div className={classes.teamName} style={{ fontSize: headerFontSize, color: props.theme.textColour }}>{props.teamName} Player Statistics</div>
            </div>
            <div className={classes.coachName} style={{ fontSize: headerFontSize, color: props.theme.textColour }}>
                Coached by {props.name}
            </div>
            <div className={classes.homeContainer}
                style={{ background: props.theme.listBackgroundColour }}>
                {playerRoster.length === 0 ? (
                    <div className={classes.defaultMessage}>
                        <p style={{ fontSize: headerFontSize }}>
                            There are currently no players on your team
                        </p>
                    </div>
                ) : (
                    <>
                        <div className={classes.playerListContainer}>
                            {playerRoster.map(player => {
                                return <PlayerCard key={player.playerId} theme={props.theme} player={player} handleClick={setPlayerDetails} />
                            })}
                        </div>
                        <div className={classes.playerScoreContainer} style={{ color: props.theme.textColour }}>
                            {playerDetails === null && playerRoster.length !== 0 &&
                                <div className={classes.defaultMessage}>
                                    <p style={{ fontSize: headerFontSize }}>
                                        Click on the "View Scores" button to see a player's scores
                                    </p>
                                </div>}
                            {playerDetails !== null && <ScoreDetails player={playerDetails} theme={props.theme} role={props.role} />}
                        </div>
                    </>
                )}
            </div>
            <div className={classes.addPlayerContainer} style={{ color: props.theme.textColour }}>
                {props.role === 'Coach' && <Button
                    style={{ backgroundColor: props.theme.buttonBackgroundColour, color: props.theme.buttonTextColour }}
                    onClick={() => showDropdown()}>
                    <i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp; Add Player
                </Button>}
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
                    style={{ backgroundColor: props.theme.buttonBackgroundColour, color: props.theme.buttonTextColour }}>
                    Confirm
                </Button>
            </div>
        </div>
    )
};
export default TeamContainer


