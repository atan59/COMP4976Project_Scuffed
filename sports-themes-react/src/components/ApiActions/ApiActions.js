import axios from 'axios';
import { db } from '../Firebase/Firebase';
import { v4 } from 'uuid';

export const postCoachUser = (uid, userInfo) => {
    return axios.post('https://localhost:5001/api/coaches/', {
        "coachID": uid,
        "coachName": `${userInfo.firstName} ${userInfo.lastName}`
    }).catch(err => console.log(err));
}

export const postPlayerUser = (uid, userInfo) => {
    return axios.post('https://localhost:5001/api/players/', {
        "playerID": uid,
        "playerName": `${userInfo.firstName} ${userInfo.lastName}`,
        "position": userInfo.position
    }).catch(err => console.log(err));
}

export const getFirebaseUserInfo = (uid) => {
    return db.collection('users').where('uid', '==', uid).get().then(res => {
        return res.docs[0].data();
    }).catch(err => console.log(err));
}
