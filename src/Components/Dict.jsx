import React, { useState, useEffect } from "react";
import axios from "axios";
import { languages } from "../Data/languages";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const url = "https://api.dictionaryapi.dev/api/v2/entries/";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "200px",
    },
  },
}));

export const Dict = () => {
  const classes = useStyles();

  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState("");
  const [lang, setLang] = useState("en");

  const fetchData = async () => {
    try {
      const data = await axios.get(
        `${url}${lang}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      setMeanings(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [word, lang]);

  return (
    <div className={classes.root}>
      <Typography variant="h2" style={{ margin: 12 }}>
        Dictionary
      </Typography>
      <TextField
        onChange={(e) => setWord(e.target.value)}
        id="word"
        placeholder="Type The Word"
        variant="outlined"
      />
      <TextField
        id="lang"
        select
        label="Language"
        variant="outlined"
        onChange={(e) => setLang(e.target.value)}
      >
        {languages.map((language, index) => (
          <MenuItem key={index} value={language.value}>
            {language.label}
          </MenuItem>
        ))}
      </TextField>
      {meanings !== null &&
        meanings.map((meaning) => (
          <>
            <Typography variant="h3" style={{ margin: 16 }}>
              {meaning.word}
            </Typography>
            {meaning.meanings.map((wordMeanings, index) => (
              <List style={{ textAlign: "center" }} key={index}>
                <Typography variant="h4">
                  {wordMeanings.partOfSpeech}
                </Typography>
                {wordMeanings.definitions.map((wordDef, index) => (
                  <>
                    <ListItem style={{ textAlign: "center" }} key={index}>
                      <ListItemText>{wordDef.definition}</ListItemText>
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            ))}
          </>
        ))}
      {meanings === null && (
        <>
        <Typography variant="h3" style={{ margin: 12 }}>
          No Definitions Found
        </Typography>
        <Typography variant="h5" style={{ margin: 12 }}>
        Sorry pal, we couldn't find definitions for the word you were looking for.
        </Typography>
        </>
      )}
    </div>
  );
};
