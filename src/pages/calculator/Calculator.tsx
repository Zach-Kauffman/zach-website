import { useEffect, useState } from 'react';

import { Col, Row } from '../../components/shared/layout';
import { calculateOdds } from './utils';

function Calculator() {
    const [deckSize, setDeckSize] = useState(60);
    const [looks, setLooks] = useState(7);
    const [hits, setHits] = useState([4]);
    const [comboSize, setComboSize] = useState(1);
    const [game, setGame] = useState('mtg');

    const [odds, setOdds] = useState<number | undefined>(undefined);

    const games = ['mtg', 'hs', 'other'];

    useEffect(() => {
        switch (game) {
            case 'mtg':
                setDeckSize(60);
                setLooks(7);
                handleComboSizeChange(1);
                break;
            case 'hs':
                setDeckSize(30);
                setLooks(4);
                handleComboSizeChange(1);
                break;
            default:
                setDeckSize(0);
                setLooks(0);
                handleComboSizeChange(0);
        }
    }, [game]);

    const handleComboSizeChange = (size: number) => {
        setComboSize(size);
        setHits((prev) => {
            const newHits = [...prev];
            if (size > prev.length) return [...newHits, ...Array(size - prev.length).fill(0)];
            else return newHits.slice(0, size);
        });
        setOdds(undefined);
    };

    const handleHitChange = (index: number, value: number) => {
        const newHits = [...hits];
        newHits[index] = value;
        setHits(newHits);
        setOdds(undefined);
    };

    const handleCalculateOdds = () => {
        // make sure no values are zero before proceeding to calculation
        if (deckSize > 0 && looks > 0 && hits.filter((h) => h > 0).length === hits.length) {
            setOdds(calculateOdds({ deckSize, looks, hits, iterations: 10_000 }));
            return;
        }
        setOdds(undefined);
    };

    return (
        <div style={{ width: '80vw', height: '100vh', paddingLeft: '50px', paddingTop: '50px' }}>
            <h1>Advanced Cardgame Calculator</h1>
            <p>Calculate odds of seeing 1 or more specific cards given some parameters</p>
            <Row>
                <Col>
                    <label htmlFor="game">Select a game</label>
                    <select
                        id="game"
                        value={game}
                        onChange={(e) => {
                            setGame(e.target.value);
                        }}
                    >
                        {games.map((game) => {
                            return <option value={game}>{game}</option>;
                        })}
                    </select>
                </Col>
            </Row>
            <Row style={{ maxWidth: '80vw' }}>
                <Col>
                    <label htmlFor="deckSize">Deck size</label>
                    <input
                        id="deckSize"
                        type="number"
                        value={deckSize}
                        onChange={(e) => {
                            setDeckSize(e.target.value as unknown as number);
                        }}
                    />
                </Col>
                <Col>
                    <label htmlFor="looks">Number of looks</label>
                    <input
                        id="looks"
                        type="number"
                        value={looks}
                        onChange={(e) => {
                            setLooks(e.target.value as unknown as number);
                        }}
                    />
                </Col>
                <Row>
                    <Col>
                        <label htmlFor="comboSize">
                            Number of distinct cards you want to see together (e.g., 2 for an A+B
                            combo)
                        </label>
                        <input
                            id="comboSize"
                            type="number"
                            value={comboSize}
                            onChange={(e) =>
                                handleComboSizeChange(e.target.value as unknown as number)
                            }
                        />
                    </Col>
                </Row>
            </Row>
            <Row style={{ flexWrap: 'wrap' }}>
                {hits.map((_, idx) => (
                    <Col key={idx}>
                        <label htmlFor="hits">Number of hits for card #{idx + 1}</label>
                        <input
                            id="hits"
                            type="number"
                            value={hits[idx]}
                            onChange={(e) =>
                                handleHitChange(idx, e.target.value as unknown as number)
                            }
                        />
                    </Col>
                ))}
            </Row>
            <hr />
            <Row>
                <button onClick={handleCalculateOdds}>Calculate odds</button>
                {!!odds && (
                    <p>
                        {comboSize === 1
                            ? `Odds of seeing at least 1 hit in ${looks} looks: `
                            : `Odds of seeing at least one of each ${comboSize} cards in your combo: `}
                        ~{odds}
                    </p>
                )}
            </Row>
        </div>
    );
}

export default Calculator;
