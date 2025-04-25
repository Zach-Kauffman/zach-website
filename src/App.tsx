import { useCallback, useState } from 'react';
import './App.css'
import { Folder } from './folder/Folder';


function App() {

  const [selected, setSelected] = useState<number>(0);

  const handleClick = (index: number) => {
    console.log('selected', index);
    if (index !== tabs.length) setSelected(index);
  }

  const tabs: string[] = [
    'content 1',
    'content 2',
    'content 3',
    'content 4',
    'content 5',
    'content 6',
  ];


  return (
    <div style={{
    }}>
      {tabs.map((content, index) => index !== selected && (
        <Folder label={content} index={index} onClick={handleClick}><>poopy</></Folder>
      ))}
      <Folder label={tabs[selected]} index={tabs.length} onClick={handleClick}><>poopy</></Folder>
    </div>
  )
}

export default App
