import React from 'react';
import MainContainer from './components/MainContainer';
import TopBar from './components/TopBar';

function App() {
  return (    
      <div style={{ display: 'flex', flexDirection: 'column' }}>      
        <TopBar/>
        <MainContainer/> 
        
      </div>    
  );
}

export default App;
