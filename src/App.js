import React from 'react';
import './App.css';
import {Cell, Grid} from "react-grata";

const variations = {
  fullHeight: {
    matrix: [
      ['hd', 'hd', 'hd'],
      ['sl', 'bd', 'sr'],
      ['ft', 'ft', 'ft'],
    ],
    rows: [
      "200px",
      "fit-height",
      "200px",
    ],
    columns: ["100px", "1fr", "100px"],
    rowGap: "12px",
    columnGap: "12px"
  }
}

function App() {
  return (
    <Grid {...variations.fullHeight}>
      <Cell id='hd'>Header</Cell>
      <Cell id='sl'>Side Left</Cell>
      <Cell id='bd'>Body</Cell>
      <Cell id='sr'>Side Right</Cell>
      <Cell id='ft'>Footer</Cell>
    </Grid>
  );
}

export default App;
