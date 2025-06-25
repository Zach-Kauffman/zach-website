import '../../App.css';

import { useState } from 'react';

import { Folder } from '../../components/folder/Folder';
import { Resume } from '../../components/resume/Resume';
import { Col } from '../../components/shared/layout';
import Simulator from '../simulator/Simulator';

function Home() {
    const [selected, setSelected] = useState<number>(0);

    const handleClick = (index: number) => {
        console.log('selected', index);
        if (index !== tabs.length) setSelected(index);
    };

    const tabs: [string, React.ReactElement][] = [
        ['Home', <DefaultTab />],
        ['Resume', <Resume />],
        ['Links', <Links />],
        ['Cardgame Simulator', <Simulator />],
    ];

    const unselectedFolders = () => {
        const arr: React.ReactElement[] = [];
        tabs.map((content, index) => {
            if (index !== selected) {
                arr.push(
                    <Folder
                        key={index}
                        label={content[0]}
                        location={index}
                        index={index}
                        onClick={handleClick}
                    />,
                );
            }
        });
        return arr;
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

function DefaultTab() {
    return (
        <Col style={{ paddingLeft: '20px' }}>
            <h1>Welcome to my website!</h1>
            <p>Click around the tabs to see what I've been up to</p>
        </Col>
    );
}

function Links() {
    return (
        <Col style={{ padding: '20px' }}>
            <p>Since you're already on my website there's not much else to show you, but...</p>
            <a href="https://github.com/Zach-Kauffman">Github</a>
            <a href="https://www.linkedin.com/in/zach-kauffman-6209191a9/">Linkedin</a>
        </Col>
    );
}

export default Home;
