import Problem from "./Components/Problem/Problem";

function App() {
  return (
    <div className="holder vertical">
      <div className="holder">
        <span className="title">Matrix Calculator</ span>
        <svg fill="var(--dark-color)" width="80px" height="80px" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg" ><title>matrix</title><path d="M64 96L144 96 144 176 64 176 64 96ZM184 96L264 96 264 176 184 176 184 96ZM304 96L384 96 384 176 304 176 304 96ZM64 216L144 216 144 296 64 296 64 216ZM184 216L264 216 264 296 184 296 184 216ZM304 216L384 216 384 296 304 296 304 216ZM64 336L144 336 144 416 64 416 64 336ZM184 336L264 336 264 416 184 416 184 336ZM304 336L384 336 384 416 304 416 304 336Z" /></svg>
      </div>
      <Problem />
    </ div>
  );
}

export default App;
