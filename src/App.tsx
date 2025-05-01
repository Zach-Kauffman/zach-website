import { useCallback, useState } from 'react';
import './App.css'
import { Folder } from './folder/Folder';


function App() {

  const [selected, setSelected] = useState<number>(0);

  const handleClick = (index: number) => {
    console.log('selected', index);
    if (index !== tabs.length) setSelected(index);
  }

  const tabs: [string, string][] = [
    ['Resume', 'resume text here'],
    ['Portfolio', 'portfolio here'],
    ['Links', 'links here'],
    ['content 4', 'content 4'],
    ['content 5', 'content 5'],
    ['content 6', 'content 6'],
  ];

  const unselectedFolders = () => {
    let i = -1;
    return tabs.map((content, index) => {
      if (index !== selected) {
        i += 1;
        return <Folder label={content[0]} location={i} index={index} onClick={handleClick}><></></Folder>
      }
    }
    )
  }


  return (
    <div style={{
    }}>
      {unselectedFolders()}
      <Folder label={tabs[selected][0]} location={selected} index={tabs.length} onClick={handleClick} isSelected><>{tabs[selected][1]}</></Folder>
    </div>
  )
}

export default App
