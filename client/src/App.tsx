import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ComponentPreview } from './pages/components/ComponentPreview';
import { PokerCardShowcase } from './pages/components/PokerCardShowcase';
import { TopBarShowcase } from './pages/components/TopBarShowcase';
import { BottomBarShowcase } from './pages/components/BottomBarShowcase';
import { ChatShowcase } from './pages/components/ChatShowcase';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComponentPreview />} />
        <Route path="/poker-cards" element={<PokerCardShowcase />} />
        <Route path="/topbar" element={<TopBarShowcase />} />
        <Route path="/bottombar" element={<BottomBarShowcase />} />
        <Route path="/chat" element={<ChatShowcase />} />
      </Routes>
    </Router>
  );
}

export default App;
