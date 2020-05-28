import React, {useState} from 'react';
import './App.css';
import {Cell, Grid} from "react-grata";

const commons = {
  rowGap: "12px",
  columnGap: "12px"
}
const variations = {
  blog: {
    ...commons,
    matrix: [
      [1, 1, 1],
      [2, 3, 4],
      [5, 5, 5],
    ],
    rows: [
      "100px",
      "fit-height",
      "100px",
    ],
    columns: ["80px", "1fr", "80px"],
  },
  crossOver: {
    ...commons,
    matrix: [
      [1, 1, 2],
      [4, 5, 2],
      [4, 3, 3],
    ],
  },
  splitHorizontal: {
    ...commons,
    matrix: [
      [1, 2]
    ]
  },
  splitVertical: {
    ...commons,
    matrix: [
      [1],
      [2],
    ]
  },
  leaveBlank: {
    ...commons,
    matrix: [
      [1, 1, undefined],
      [undefined, 2, 2],
      [3, undefined, 3],
    ]
  }
}

const Example = ({layout}) => (
  <Grid className="example-grid" {...layout}>
    <Cell id={1}><span className="one">One</span></Cell>
    <Cell id={2}><span className="two">Two</span></Cell>
    <Cell id={3}><span className="three">Three</span></Cell>
    <Cell id={4}><span className="four">Four</span></Cell>
    <Cell id={5}><span className="five">Five</span></Cell>
  </Grid>
)

const Controls = ({setLayout}) => {
  return (
    <ul>
      {Object.keys(variations)
        .map(key => (
          <li key={key}>
            <button onClick={() => setLayout(variations[key])}>{key}</button>
          </li>
        ))}
    </ul>
  )
}

const mapClass = (value) => {
  switch (value) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    default:
      return '';
  }
}

const Matrix = ({layout}) => {
  return (
    <>
      <h3>
        <code>matrix</code>
      </h3>
      <pre>[
        <br/>
      {layout.matrix.map((row, index) => {
          return (
            <React.Fragment key={`row-${index}`}>
              <span>  [{row.map(x => x || ' ').map((x, i) => {
                console.log(`x-${x}|`, row)
                return (
                  <React.Fragment key={`${x}-${i}`}>
                    <span className={mapClass(x)}>{x}</span>
                    {i === row.length - 1 ? '' : ', '}
                  </React.Fragment>
                );
              })}]</span>
              , <span className="comments">// row {index + 1}</span>
              <br/>
            </React.Fragment>
          )
        })}]
      </pre>
    </>
  )
}

const Others = ({layout}) => {
  return (
    <>
      <h3>
        <code>rows & columns</code>
      </h3>
      <pre>
        {layout.rows && <>rows: ["{layout.rows.join('", "')}"]<br /></>}
        {layout.columns && <>columns: ["{layout.columns.join('", "')}"]<br /></>}
      </pre>
    </>
  )
}

function App() {
  const [layout, setLayout] = useState(variations.blog)
  const et = layout.rows || layout.columns ? 'et' : 'mx';
  const matrix = [
    ['sd', 'bd', 'bd'],
    ['mx', 'bd', 'bd'],
    [ et , 'bd', 'bd'],
  ]
  return (
    <Grid className="page-grid" matrix={matrix} {...commons}>
      <Cell id="sd"><Controls setLayout={setLayout}/></Cell>
      <Cell id="mx"><Matrix layout={layout} /></Cell>
      <Cell id="et"><Others layout={layout}/></Cell>
      <Cell id="bd"><Example layout={layout}/></Cell>
    </Grid>
  );
}

export default App;
