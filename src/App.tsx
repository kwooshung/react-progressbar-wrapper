import ProgressBar from './progressbar';

const ProgressChildren = <div style={{ height: '2px', background: 'linear-gradient(112.44deg,#ff5858 2.09%,#c058ff 75.22%)', backgroundSize: '165%' }} />;

function App() {
  return (
    <>
      <ProgressBar active={false} done={false}>
        {ProgressChildren}
      </ProgressBar>
    </>
  );
}

export default App;
