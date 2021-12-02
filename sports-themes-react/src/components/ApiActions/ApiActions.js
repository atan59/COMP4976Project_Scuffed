import axios from 'axios';
import { db } from '../Firebase/Firebase';
import { v4 } from 'uuid';

export const postCoachUser = (uid, userInfo) => {
    return axios.post('https://localhost:5001/api/coaches/', {
        "coachID": uid,
        "coachName": userInfo.name
    }).catch(err => console.log(err));
}

export const postPlayerUser = (uid, userInfo) => {
    return axios.post('https://localhost:5001/api/players/', {
        "playerID": uid,
        "playerName": userInfo.name,
        "position": userInfo.position
    }).catch(err => console.log(err));
}

export const getFirebaseUserInfo = (uid) => {
    return db.collection('users').where('uid', '==', uid).get().then(res => {
        return res.docs[0].data();
    }).catch(err => console.log(err));
}

export const getTeamByCoach = (uid) => {
    return axios.get(`https://localhost:5001/api/teams/coach/${uid}`).then(res => {
        return res.data
    }).catch(err => console.log(err))
}

export const getTeamNameByPlayer = (uid) => {
    return axios.get(`https://localhost:5001/api/players/${uid}`).then(res => {
        return res.teamName
    }).catch(err => console.log(err))
}

export const getPlayerRoster = (teamName, setPlayerRoster) => {
    return axios.get('https://localhost:5001/api/players').then(res => {
        console.log(res.data);
        setPlayerRoster(res.data.filter(player => player.teamName === teamName))
    }).catch(err => console.log(err))
}

export const getThemeIDByTeamName = (teamName, setThemeID) => {
    return axios.get(`https://localhost:5001/api/teams/${teamName}`).then(res => {
        setThemeID(res.themeId)
    }).catch(err => console.log(err))
}

export const getNoTeamRoster = (setRoster) => {
    return axios.get('https://localhost:5001/api/players/noTeam').then(res => {
        setRoster(res.data)
    }).catch(err => console.log(err))
}

export const postPlayerToTeam = (player, teamName) => {
    return axios.put(`https://localhost:5001/api/players/${player.playerId}`, {
        "playerId": player.playerId,
        "playerName": player.playerName,
        "position": player.position,
        "teamName": teamName
    }).then(res => console.log(res)).catch(err => console.log(err))
}

export const getThemeByID = (themeID, setTheme, setThemeLoaded) => {
    return axios.get(`https://localhost:5001/api/themes/${themeID}`).then(res => {
        setTheme(res.data)
        setThemeLoaded(true)
    }).catch(err => console.log(err))
}

export const getPlayerScoresByID = (playerID, setPlayerScores) => {
    return axios.get('https://localhost:5001/api/scores').then(res => {
        setPlayerScores(res.data.filter(score => score.playerId === playerID))
    }).catch(err => console.log(err))
}

export const postPlayerScore = (playerID, form, setAddScoreFormLoaded) => {
    return axios.post('https://localhost:5001/api/scores', {
        "gameName": form.gameName,
        "playerScore": form.score,
        "playerId": playerID
    }).then(res => {
        setAddScoreFormLoaded(false)
    }).catch(err => console.log(err))
}
