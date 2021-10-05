import React, { useState } from 'react';
import {
  Typography,
  Button,
  Container,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (!title) {
      setTitleError(true);
    }

    if (!details) {
      setDetailsError(true);
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push('/'));
    }
  };

  return (
    <Container>
      <Typography
        variant='h6'
        component='h2'
        gutterBottom
        color='textSecondary'
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label='Detail'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio />} label='Money' value='money' />
            <FormControlLabel control={<Radio />} label='todos' value='todos' />
            <FormControlLabel
              control={<Radio />}
              label='reminders'
              value='reminders'
            />
            <FormControlLabel control={<Radio />} label='work' value='work' />
          </RadioGroup>
        </FormControl>
        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
