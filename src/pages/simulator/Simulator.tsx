import './simulator.css';

import { useState } from 'react';

import { Col, Grid, Row } from '../../components/shared/layout';
import { calculateOdds } from './utils';

function Simulator() {
    const [deckSize, setDeckSize] = useState(60);
    const [looks, setLooks] = useState(7);
    const [comboSize, setComboSize] = useState(2);
    const [hits, setHits] = useState([4, 4]);
    const [odds, setOdds] = useState<number | undefined>(undefined);
    const [iterations, setIterations] = useState(1_000_000);

    const [loading, setLoading] = useState(false);

    const hitRows = Math.ceil(hits.length / 5);

    const handleComboSizeChange = (size: number) => {
        setComboSize(size);
        setHits((prev) => {
            const newHits = [...prev];
            if (size > prev.length) return [...newHits, ...Array(size - prev.length).fill(0)];
            else return newHits.slice(0, size);
        });
    };

    const handleHitChange = (index: number, value: number) => {
        const newHits = [...hits];
        newHits[index] = value;
        setHits(newHits);
    };

    const handleCalculateOdds = async () => {
        setOdds(undefined);
        // make sure no values are zero before proceeding to calculation
        if (deckSize > 0 && looks > 0 && hits.filter((h) => h > 0).length === hits.length) {
            setLoading(true);
            const result: number = await new Promise((resolve) => {
                // using a setTimeout with 0 forces async behavior and allows us to await the lengthy calculation
                setTimeout(() => {
                    const res = calculateOdds({ deckSize, looks, hits, iterations });
                    resolve(res);
                }, 0);
            });
            setLoading(false);
            setOdds(result);
        }
    };

    return (
        <div style={{ paddingLeft: '20px', width: 'fit-content' }}>
            <h1>Advanced Cardgame Simulator</h1>
            <p>Simulate odds of seeing 1 or more specific cards, given some parameters.</p>
            <p>By default, there are 1,000,000 iterations. Increase for more accuracy.</p>
            <p>
                Note: Anything above 10e7 will take a <i>very</i> long time
            </p>
            <hr />
            <Grid
                style={{
                    gridAutoFlow: 'row',
                    paddingTop: '10px',
                }}
            >
                <label>Number of iterations to run.</label>
                <select
                    defaultValue={1000000}
                    onChange={(e) => setIterations(parseInt(e.target.value))}
                    style={{ width: 'fit-content' }}
                >
                    {Array.from({ length: 7 }, (_, idx) => Math.pow(10, idx + 3)).map(
                        (value, idx) => (
                            <option value={value}>10e{idx + 3}</option>
                        ),
                    )}
                </select>
            </Grid>
            <Grid
                style={{
                    gridGap: '10px',
                    gridAutoFlow: 'column',
                    gridAutoColumns: 'min-content',
                    padding: '5px 0 5px',
                }}
            >
                <Col>
                    <label htmlFor="deckSize">Deck size</label>
                    <input
                        id="deckSize"
                        type="number"
                        value={deckSize}
                        onChange={(e) => {
                            setDeckSize(parseInt(e.target.value));
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
                            setLooks(parseInt(e.target.value));
                        }}
                    />
                </Col>
                <Row>
                    <Col>
                        <label htmlFor="comboSize">Cards in combo</label>
                        <input
                            id="comboSize"
                            type="number"
                            value={comboSize}
                            onChange={(e) => handleComboSizeChange(parseInt(e.target.value))}
                        />
                    </Col>
                </Row>
            </Grid>
            {Array(hitRows)
                .fill(0)
                .map((_, currRow) => (
                    <Grid
                        style={{
                            gridGap: '10px',
                            gridAutoFlow: 'column',
                            gridTemplateColumns: 'repeat(auto-fit, 189px)',
                            paddingBottom: '10px',
                        }}
                    >
                        {hits.slice(currRow * 5, currRow * 5 + 5).map((_, idx) => (
                            <Col key={idx}>
                                <label htmlFor="hits">
                                    Number of hits for card #{currRow * 5 + idx + 1}
                                </label>
                                <input
                                    id="hits"
                                    type="number"
                                    value={hits[currRow * 5 + idx]}
                                    onChange={(e) =>
                                        handleHitChange(currRow * 5 + idx, parseInt(e.target.value))
                                    }
                                />
                            </Col>
                        ))}
                    </Grid>
                ))}
            <Row>
                <button disabled={loading} onClick={handleCalculateOdds}>
                    Calculate odds
                </button>
            </Row>
            {loading && <p>Calculating...</p>}
            {!!odds && (
                <p>
                    {comboSize === 1
                        ? `Odds of seeing at least 1 hit in ${looks} looks: `
                        : `Odds of seeing at least one of each ${comboSize} cards in your combo: `}
                    ~<b>{Math.floor(odds * 10000) / 100}%</b>
                </p>
            )}
        </div>
    );
}

export default Simulator;
