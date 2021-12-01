import React, { useEffect, useState } from 'react';
import _ from 'lodash';

export const useTheme = () => {
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
    
  const [theme, setTheme] = useState(themes.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = mode => {
    setTheme(mode);
  };

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes, 'font'));
    return allFonts;
  }

//   useEffect(() =>{
//     setTheme(themes.seaWave);
//     setThemeLoaded(true);
//   }, [themes]);

  return { theme, themeLoaded, setMode, getFonts };
};