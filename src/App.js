import React, {useState} from 'react';
import {Cell, Grid} from "react-grata";
import { useMediaQuery } from 'react-responsive'
import './App.css';

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
      "20%",
      "fit-height",
      "20%",
    ],
    columns: ["20%", "1fr", "20%"],
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
    {
      layout.rows && (
        <>
          <h3>
            <code>rows</code>
          </h3>
          <pre>
            rows: <br />["{layout.rows.join('", "')}"]<br />
          </pre>
        </>
      )
    }
      {
        layout.columns && (
          <>
            <h3>
              <code>columns</code>
            </h3>
            <pre>
            columns: <br />["{layout.columns.join('", "')}"]<br />
          </pre>
          </>
        )
      }
    </>
  )
}

const Header = () => (
  <h1>Responsive Layout with &nbsp;
    <a href="https://github.com/zhenyanghua/react-grata">
      React-grata
    </a>
  </h1>
);

function App() {
  const [layout, setLayout] = useState(variations.blog)
  const isMobile = useMediaQuery({ maxWidth: 800 })
  const et = layout.rows || layout.columns ? 'et' : 'mx';
  const matrixMobile = [
    ['hd'],
    ['bd'],
    ['sd'],
    ['mx'],
    ['et'],
  ];
  const matrixOthers = [
    ['hd', 'hd', 'hd'],
    ['sd', 'bd', 'bd'],
    ['mx', 'bd', 'bd'],
    [ et , 'bd', 'bd'],
  ];
  const rowsMobile = ["auto", "1fr", "1fr", "1fr", "1fr"];
  const rowsOthers = ["auto", "1fr", "1fr", "1fr"];
  const rows = isMobile ? rowsMobile : rowsOthers;
  const matrix = isMobile ? matrixMobile : matrixOthers;
  return (
    <Grid className="page-grid" matrix={matrix} rows={rows} {...commons}>
      <Cell id="hd"><Header /></Cell>
      <Cell id="bd"><Example layout={layout}/></Cell>
      <Cell id="sd"><Controls setLayout={setLayout}/></Cell>
      <Cell id="mx"><Matrix layout={layout} /></Cell>
      <Cell id="et"><Others layout={layout}/></Cell>
    </Grid>
  );
}

export default App;
