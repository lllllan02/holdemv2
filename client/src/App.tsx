import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ComponentPreview } from './pages/components/ComponentPreview';
import { PokerCardShowcase } from './pages/components/PokerCardShowcase';
import { TopBarShowcase } from './pages/components/TopBarShowcase';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComponentPreview />} />
        <Route path="/poker-cards" element={<PokerCardShowcase />} />
        <Route path="/topbar" element={<TopBarShowcase />} />
      </Routes>
    </Router>
  );
}

export default App;
