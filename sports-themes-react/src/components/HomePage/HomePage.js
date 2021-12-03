import React, { useEffect, useState } from 'react'
import classes from './HomePage.module.css';
import TeamContainer from '../TeamContainer/TeamContainer';
import { auth, logout } from '../Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirebaseUserInfo, getTeamByCoach, getTeamNameByPlayer, getThemeByID, getThemeIDAndCoachIDByTeamName, postCoachUser, postPlayerUser, getCoachNameByCoachID } from '../ApiActions/ApiActions';
import NavbarComponent from '../Navbar/NavbarComponent';


const HomePage = () => {
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState({});
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [teamName, setTeamName] = useState('');
  const [themeID, setThemeID] = useState('');
  const [loading, setLoading] = useState(true);
  const [coachID, setCoachID] = useState('');
  const [coachName, setCoachName] = useState('');

  useEffect(() => {
    if (!user) return;

    getFirebaseUserInfo(user.uid).then(res => {
      setUserInfo(res);
    })
  }, [user]);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) return;

    checkNewUser();
  }, [userInfo])

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) return;

    if (userInfo.role === 'Coach') {
      getTeamByCoach(user.uid).then(res => {
        setTeamName(res?.teamName);
        setThemeID(res?.themeId);
        setLoading(false);
      })
      return;
    }

    getTeamNameByPlayer(user.uid).then(res => {
      setTeamName(res);
      getThemeIDAndCoachIDByTeamName(res, setThemeID, setCoachID);
      setLoading(false);
    })
  }, [userInfo])

  useEffect(() => {
    if (!coachID) return

    getCoachNameByCoachID(coachID, setCoachName);
  }, [coachID])

  useEffect(() => {
    if (!themeID) return

    getThemeByID(themeID, setSelectedTheme, setThemeLoaded)
  }, [themeID]);

  // 5: Render if the theme is loaded.
  const checkNewUser = async () => {
    const creationTime = new Date(auth.currentUser.metadata.creationTime).getTime() / 1000;
    const loginTime = Math.round(new Date().getTime() / 1000);

    // Checks if user is a new user (2 second range)
    if (loginTime + 2 >= creationTime && loginTime - 2 <= creationTime) {
      if (userInfo.role === 'Coach') {
        await postCoachUser(user?.uid, userInfo);
        return;
      }
      await postPlayerUser(user?.uid, userInfo);
    }
  }

  return (
    <>
      <NavbarComponent name={userInfo.name} logout={logout} />
      <div
        className={classes.mainContainer}
        style={{ backgroundColor: selectedTheme.bodyColour, fontFamily: selectedTheme.font }}>
        {!themeLoaded ? (
          <>
            <div className={classes.defaultMessage}>
              {!loading ? <h1>You are currently not assigned to a team</h1> :
                <h1>Loading...</h1>}
            </div>
          </>
        ) : (
          <TeamContainer theme={selectedTheme} teamName={teamName} role={userInfo.role} name={userInfo.role === 'Coach' ? userInfo.name : coachName}/>
        )}
      </div>
    </>
  );
}

export default HomePage;


