import './simulator.css';

import { useRef, useState } from 'react';

import { Col, Grid, Row } from '../../components/shared/layout';

function Simulator() {
    const workerRef = useRef<Worker | null>(null);

    const [deckSize, setDeckSize] = useState(60);
    const [looks, setLooks] = useState(7);
    const [comboSize, setComboSize] = useState(2);
    const [hits, setHits] = useState([4, 4]);
    const [odds, setOdds] = useState<number | undefined>(undefined);
    const [iterations, setIterations] = useState(1_000_000);
    const [progress, setProgress] = useState(-1);

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

    const handleStartSim = () => {
        const worker = new Worker(new URL('./simWorker.ts', import.meta.url), {
            type: 'module',
        });
        workerRef.current = worker;

        worker.onmessage = (e) => {
            const { progress, result, done } = e.data;
            if (progress !== undefined) {
                setProgress(progress);
                setOdds(result);
            }
            if (done) {
                setOdds(result);
                setProgress(-1);
                worker.terminate();
            }
        };

        worker.postMessage({ deckSize, looks, hits, iterations });
    };

    const handleStopSim = () => {
        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
            setProgress(-1);
        }
    };

    return (
        <div style={{ paddingLeft: '20px', width: 'fit-content' }}>
            <h1>Advanced Cardgame Simulator</h1>
            <p>Simulate odds of seeing 1 or more specific cards, given some parameters.</p>
            <p>By default, there are 1,000,000 iterations. Increase for more accuracy.</p>
            <p>
                Note: Anything above 10e7 will take a <i>very</i> long time.
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
                            <option key={idx} value={value}>
                                10e{idx + 3}
                            </option>
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
                        key={currRow}
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
            <hr />
            <Grid style={{ gridAutoFlow: 'column', gridGap: '10px' }}>
                <button disabled={progress >= 0} onClick={handleStartSim}>
                    {progress >= 0 ? 'Calculating... ' : 'Calculate odds'}
                </button>
                <button disabled={progress < 0} onClick={handleStopSim}>
                    Stop simulation
                </button>
            </Grid>
            {progress >= 0 && (
                <p style={{ paddingTop: '10px' }}>
                    {progress}/{iterations} games simulated
                </p>
            )}
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
