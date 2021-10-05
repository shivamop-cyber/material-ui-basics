import { Grid, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NotesCard from '../Components/NotesCard';
import Masonry from 'react-masonry-css';
import '../index.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
    });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={3}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <NotesCard note={note} handleDelete={handleDelete} />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
}
