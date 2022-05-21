import React from 'react';
import MainContainer from './navigation/MainContainer';
import TopBar from './navigation/TopBar';

function App() {
  return (    
      <div style={{ display: 'flex', flexDirection: 'column' }}>      
        <TopBar/>
        <MainContainer/> 
      </div>    
  );
}

export default App;
