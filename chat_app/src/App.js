import './App.css';
import ChatSection from './components/ChatSection';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      <div className='side-bar'>
        <SideBar/>
      </div>

      <div className='chat-section'>
        <ChatSection/>
      </div>
    </div>
  );
}

export default App;
