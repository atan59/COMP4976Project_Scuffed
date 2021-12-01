import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import classes from '../HomePage/HomePage.module.css';
 
const TeamContainer = (selectedTheme) => {
    console.log(selectedTheme, "<== team container")
    const [bodyColor, setBodyColor] = useState('')
    const [buttonBackgroundColour, setButtonBackgroundColour] = useState('')
    const [buttonTextColour, setButtonTextColour] = useState('')
    const [font, setFont] = useState('')
    const [fontSize, setFontSize] = useState('')
    const [linkOpacity, setLinkOpacity] = useState('')
    const [linkTextColour, setLinkTextColour] = useState('')
    const [logo, setLogo] = useState('')
    const [textColour, setTextColour] = useState('')
    const [teamName, setTeamName] = useState('')
    const [isOpen, setIsOpen] = useState(false)
 
    useEffect(() => { //setting all the theme values
        if(selectedTheme != null){
            setBodyColor(selectedTheme.selectedTheme.bodyColor);
            setButtonBackgroundColour(selectedTheme.selectedTheme.buttonBackgroundColour);
            setButtonTextColour(selectedTheme.selectedTheme.buttonTextColour);
            setFont(selectedTheme.selectedTheme.font);
            setFontSize(selectedTheme.selectedTheme.fontSize);
            setLinkOpacity(selectedTheme.selectedTheme.linkOpacity);
            setLinkTextColour(selectedTheme.selectedTheme.linkTextColour);
            setLogo(selectedTheme.selectedTheme.logo);
            setTextColour(selectedTheme.selectedTheme.textColour);
            setTeamName(selectedTheme.teamName)
        }
    }, [selectedTheme])
 
    //HARDCODED
    const playerArr = [
        {
            "playerId": "a29e2769-5e6b-4312-bda3-7f861490a85c",
            "playerName": "Bambam Rubble",
            "position": "Test Position 1",
            "teamName": "Test Team 1",
            "team": {
                "teamName": "Test Team 1",
                "city": "Vancouver",
                "coachId": "c3ec054e-4d44-4517-8d8e-19edfbde3f9a",
                "coach": null,
                "themeId": "00000000-0000-0000-0000-000000000000",
                "theme": null,
                "players": [
                    {
                        "playerId": "e53b635b-6c9f-414f-9c37-b8f33a0e953d",
                        "playerName": "Pebbles Flintstone",
                        "position": "Test Position 2",
                        "teamName": "Test Team 1",
                        "scores": null
                    }
                ]
            },
            "scores": null
        },
        {
            "playerId": "e53b635b-6c9f-414f-9c37-b8f33a0e953d",
            "playerName": "Pebbles Flintstone",
            "position": "Test Position 2",
            "teamName": "Test Team 1",
            "team": {
                "teamName": "Test Team 1",
                "city": "Vancouver",
                "coachId": "c3ec054e-4d44-4517-8d8e-19edfbde3f9a",
                "coach": null,
                "themeId": "00000000-0000-0000-0000-000000000000",
                "theme": null,
                "players": [
                    {
                        "playerId": "a29e2769-5e6b-4312-bda3-7f861490a85c",
                        "playerName": "Bambam Rubble",
                        "position": "Test Position 1",
                        "teamName": "Test Team 1",
                        "scores": null
                    }
                ]
            },
            "scores": null
        }
    ]
 
    const playersToBeAddedArr = ['James Bond', 'Taylor Swift', 'Donald Trump']
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return(
        <div className={classes.container}>
            <div className={classes.logoTeamNameContainer} style={{fontFamily: font }}>
                <img src={logo} alt="" className={classes.logo}/>
                <div className={classes.teamName} style={{fontSize: '36px', color: textColour}}>{teamName} Player Statistics</div>
            </div>
            <div className={classes.playerListAndScoreContainer}>
                <div className={classes.playerListContainer}>
                    {playerArr.map(player => {
                        return <>
                            <div className={classes.playerCard} style={{color: textColour}}>
                                <div className={classes.playerName}>{player.playerName}</div>
                                <div className={classes.playerPosition}>{player.position}</div>
                                <button className={classes.viewScoreBtn} style={{backgroundColor:buttonBackgroundColour, color:buttonTextColour}}>View Scores</button>
                            </div>
                        </>
                    })}
                </div>
                <div className={classes.playerScoreContainer} style={{color: textColour}}>
                    score container view
                </div>
            </div>
            <div className={classes.addPlayerContainer}>
                    <div className={classes.addPlayerDiv} style={{color: textColour}}>Add Player</div>
                    <Dropdown isOpen={isOpen} toggle={()=>toggle()} className={classes.addplayerDropdown}>
                        <DropdownToggle caret className={classes.addplayerDropdown}>Dropdown</DropdownToggle>
                        <DropdownMenu>
                            {playersToBeAddedArr.map(player => {
                                return <DropdownItem>{player}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                    <button className={classes.confirmAddPlayerBtn} style={{backgroundColor:buttonBackgroundColour, color:buttonTextColour}}>Confirm</button>
            </div>
        </div>
    )
};
export default TeamContainer
 

