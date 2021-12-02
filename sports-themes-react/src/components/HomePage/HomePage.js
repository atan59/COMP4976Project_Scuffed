import React, { useEffect, useState } from 'react'
import instance from '../../Assets/Axios/AxiosInstance';
import classes from './HomePage.module.css';
import WebFont from 'webfontloader';
import TeamContainer from '../TeamContainer/TeamContainer';
import { auth, logout } from '../Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import _ from 'lodash';
import { getFirebaseUserInfo, getTeamByCoach, getTeamNameByPlayer, getThemeByID, getThemeIDByTeamName, postCoachUser, postPlayerUser } from '../ApiActions/ApiActions';
import NavbarComponent from '../Navbar/NavbarComponent';


const HomePage = () => {
  const themes = {
    "light": {
      "id": "T_001",
      "name": "Light",
      "colors": {
        "body": "#FFFFFF",
        "text": "#000000",
        "button": {
          "text": "#FFFFFF",
          "background": "#000000"
        },
        "link": {
          "text": "teal",
          "opacity": 1
        }
      },
      "font": "Tinos"
    },
    "seaWave": {
      "id": "T_007",
      "name": "Sea Wave",
      "colors": {
        "body": "#9be7ff",
        "text": "#0d47a1",
        "button": {
          "text": "#ffffff",
          "background": "#0d47a1"
        },
        "link": {
          "text": "#0d47a1",
          "opacity": 0.8
        }
      },
      "font": "Ubuntu"
    }
  }

  const realTheme = {
    "id": "00000000-0000-0000-0000-000000000002",
    "name": "Test Theme 2",
    "bodyColour": "#c0c0c0",
    "textColour": "#fd7776",
    "buttonTextColour": "#baaadd",
    "buttonBackgroundColour": "#bae8c0",
    "linkTextColour": "#15f4ee",
    "linkOpacity": 50,
    "font": "Helvetica",
    "fontSize": 24,
    "logo": "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/07/attachment_80660538-e1531899559548.jpg?auto=format&q=60&fit=max&w=930"
  }
  // const {theme, themeLoaded, getFonts} = useTheme();
  const [theme, setTheme] = useState(themes.seaWave)
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState({});
  const [user, loading] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [teamName, setTeamName] = useState('');
  const [themeID, setThemeID] = useState('');

  console.log(selectedTheme);

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
      })
      return;
    }

    getTeamNameByPlayer(user.uid).then(res => {
      setTeamName(res)
      getThemeIDByTeamName(res, setThemeID)
    })
  }, [userInfo])

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

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes, 'font'));
    return allFonts;
  }

  return (
    <>
      <NavbarComponent name={userInfo.name} logout={logout} />
      <div
        className={classes.mainContainer}
        style={{ backgroundColor: selectedTheme.bodyColour, fontFamily: selectedTheme.font }}>
        {themeLoaded && <TeamContainer theme={selectedTheme} teamName={teamName} />}
      </div>
    </>
  );
}

export default HomePage;


