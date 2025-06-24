import '../../App.css';

import { useState } from 'react';

import { Folder } from '../../components/folder/Folder';
import { Resume } from '../../components/resume/Resume';
import Calculator from '../calculator/Calculator';

function Home() {
    const [selected, setSelected] = useState<number>(0);

    const handleClick = (index: number) => {
        console.log('selected', index);
        if (index !== tabs.length) setSelected(index);
    };

    const tabs: [string, React.ReactElement][] = [
        ['Home', <></>],
        ['Resume', <Resume />],
        ['Links', <></>],
        ['Cardgame Calculator', <Calculator />],
        ['content 5', <></>],
        ['content 6', <></>],
    ];

    const unselectedFolders = () => {
        let i = -1;
        return tabs.map((content, index) => {
            if (index !== selected) {
                i += 1;
                return (
                    <Folder
                        key={index}
                        label={content[0]}
                        location={i}
                        index={index}
                        onClick={handleClick}
                    />
                );
            }
        });
    };

    return (
        <div style={{}}>
            {unselectedFolders()}
            <Folder
                label={tabs[selected][0]}
                location={selected}
                index={tabs.length}
                onClick={handleClick}
                isSelected
            >
                {tabs[selected][1]}
            </Folder>
        </div>
    );
}

export default Home;
