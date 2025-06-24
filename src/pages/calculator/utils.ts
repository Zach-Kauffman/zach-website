export function calculateOdds({
    deckSize,
    looks,
    hits,
    iterations,
}: {
    deckSize: number;
    looks: number;
    hits: number[];
    iterations: number;
}) {
    let successfulAttempts = 0;
    // const hitsMap = {};
    for (let i = 0; i < iterations; i++) {
        // create array with all cards
        const deck = Array(deckSize).fill(0);
        let marker = 1;

        // randomly assign hits to deck
        for (const count of hits) {
            let placed = 0;
            while (placed < count) {
                const index = Math.floor(Math.random() * deckSize);
                if (deck[index] === 0) {
                    deck[index] = marker;
                    placed++;
                }
            }
            marker++;
        }

        // draw cards
        const drawn = [];
        const used = new Set();
        while (drawn.length < looks) {
            const index = Math.floor(Math.random() * deckSize);
            if (!used.has(index)) {
                used.add(index);
                drawn.push(deck[index]);
            }
        }

        // check if all hit types seen
        const found = new Set(drawn);
        const expected = new Set(Array.from({ length: hits.length }, (_, i) => i + 1));
        const gotAllHits = [...expected].every((v) => found.has(v));
        if (gotAllHits) {
            successfulAttempts++;
        }
    }
    return divFloat(successfulAttempts, iterations);
}

const divFloat = (a: number, b: number) => {
    // var * 1.0 forces floating point division
    return (a * 1.0) / b;
};
