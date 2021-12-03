import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { getPlayerScoresByID, postPlayerScore } from '../ApiActions/ApiActions';
import ScoreCard from '../ScoreCard/ScoreCard';
import classes from './ScoreDetails.module.css'

const ScoreDetails = (props) => {
    const [playerScores, setPlayerScores] = useState([]);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [headerFontSize, setHeaderFontSize] = useState('');
    const [textFontSize, setTextFontSize] = useState('');
    const [addState, setAddState] = useState(false);

    useEffect(() => {
        setForm({
            'gameName': '',
            'playerScore': ''
        })
    }, [])

    useEffect(() => {
        if (!props.player.playerId) return
        getPlayerScoresByID(props.player.playerId, setPlayerScores)
    }, [props])

    useEffect(() => {
        const headerFontArr = { 0: 'xxx-large', 1: 'xx-large', 2: 'x-large', 3: 'large', 4: 'medium' };
        const textFontArr = { 0: 'x-large', 1: 'large', 2: 'medium', 3: 'small', 4: 'x-small' };
        setHeaderFontSize(headerFontArr[props.theme.headerFontSize])
        setTextFontSize(textFontArr[props.theme.textFontSize])
    }, [props])

    const addPlayerScore = async (e, player, form) => {
        e.preventDefault();
        await postPlayerScore(player.playerId, form)
        await getPlayerScoresByID(player.playerId, setPlayerScores)
    }

    const setField = (name, value) => {
        setForm({ ...form, [name]: value })

        if (errors[name]) setErrors({ ...errors, [name]: null })
    }

    const findFormErrors = () => {
        const { gameName, playerScore } = form;
        const newErrors = {};

        if (!gameName) newErrors.gameName = "You must enter a game name";
        if (playerScore && !/^[0-9]*$/.test(playerScore)) newErrors.playerScore = "You must enter a valid player score (a number)";
        if (!playerScore) newErrors.playerScore = "You must enter a player score";

        return newErrors;
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        await postPlayerScore(props.player.playerId, form, setAddState)
        await getPlayerScoresByID(props.player.playerId, setPlayerScores)
        handleClose()
    };

    const handleClose = () => setAddState(false)

    return (
        <>
            <div className={classes.scoreContainer}>
                <div className={classes.scoreHeader}
                    style={{ fontSize: headerFontSize }}>
                    <p>{props.player.playerName}'s Scores</p>
                    <Button
                        onClick={() => setAddState(true)}
                        style={{
                            backgroundColor: props.theme.buttonBackgroundColour,
                            color: props.theme.buttonTextColour,
                            fontSize: textFontSize
                        }}>
                        Add Score
                    </Button>
                </div>
                <div className={classes.scoreListContainer}>
                    {playerScores.map(score => {
                        return <ScoreCard key={score.scoreId} theme={props.theme} score={score} playerID={props.player.playerId} />
                    })}
                </div>
            </div>
            <Modal show={addState} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Score for {props.player.playerName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={classes.addForm} onSubmit={handleAdd}>
                        <div className={classes.inputElements}>
                            <Form.Group>
                                <Form.Label><i class="fas fa-trophy"></i> Game Name</Form.Label>
                                <Form.Control
                                    isInvalid={errors.gameName}
                                    type="text"
                                    value={form.gameName}
                                    onChange={e => setField('gameName', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.gameName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className={classes.inputElements}>
                            <Form.Group>
                                <Form.Label><i class="fas fa-list-ol"></i> Player Score</Form.Label>
                                <Form.Control
                                    isInvalid={errors.playerScore}
                                    type="text"
                                    value={form.playerScore}
                                    onChange={e => setField('playerScore', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.playerScore}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={handleAdd}>
                        Save Score
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ScoreDetails
