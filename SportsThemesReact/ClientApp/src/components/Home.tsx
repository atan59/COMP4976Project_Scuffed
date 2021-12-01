import React, { useEffect, useState } from 'react'
import instance from '../Assets/Axios/AxiosInstance';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
// import { GlobalStyles } from '../theme/GlobalStyles';
// import { useTheme } from '../theme/useTheme';
import TeamContainer from './TeamContainer';
import _ from 'lodash';


const Home = () => {
  const themes = {
    "light" : {
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
    "seaWave" : {
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
  const [selectedTheme, setSelectedTheme] = useState(theme);
  // const Container = styled.div`margin: 5px auto 5px auto;`;
  const coachId = "c3ec054e-4d44-4517-8d8e-19edfbde3f9a"; // HARDCODED THIS FOR NOW...

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes, 'font'));
    return allFonts;
  }
 
  useEffect(() => {
      setSelectedTheme(theme);
   }, [theme]);

   useEffect(() => {
    setThemeLoaded(true);
   }, [selectedTheme])

  // get coach OR player
  useEffect(() => {
    // TODO: add an if else statement, which user type is logged in, get coach or player depending on that (for now we'll do coach only)
    instance.get(`https://localhost:5001/api/coaches/${coachId}`).then(res => { // TODO: make the coach id DYNAMIC on the one logged in
        let response = res;
        console.log(response, "<== response");
    }).catch(err => {
        console.log(err)
    })
  }, [])
  
  // get team
  useEffect(() => {
    instance.get(`https://localhost:5001/api/teams`).then(res => {
        let response = res;
        console.log(response, "<== response");
    }).catch(err => {
        console.log(err)
    })
  }, [])

  // get theme

// 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  console.log(themeLoaded, "<== themeLoaded");
  console.log(selectedTheme, "<== selectedTheme");

  // 5: Render if the theme is loaded.
  return (
    <div style={{backgroundColor: realTheme.bodyColour}}>
    {
      themeLoaded && 
      // <ThemeProvider theme={ selectedTheme }>
      //   <GlobalStyles/>
      //   <Container style={{fontFamily: selectedTheme.font}}>
      //     <h1>Theme Builder</h1>
      //     <p>
      //       This is a theming system with a Theme Switcher and Theme Builder.
      //     </p>
      //   </Container>
      // </ThemeProvider>
      <TeamContainer 
        selectedTheme={realTheme}
        teamName="Team Pepe"
      />
    }
    </div>
  );
}

export default connect()(Home);
