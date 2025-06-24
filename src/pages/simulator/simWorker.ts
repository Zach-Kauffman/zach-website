self.onmessage = function (e) {
    const { deckSize, looks, hits, iterations } = e.data;
    let successCount = 0;

    for (let i = 0; i < iterations; i++) {
        if (simulateOnce({ deckSize, looks, hits })) successCount++;

        if (i % 10000 === 0 || i === iterations - 1) {
            self.postMessage({ progress: i, result: divFloat(successCount, i + 1) });
        }
    }

    self.postMessage({ done: true, result: divFloat(successCount, iterations) });
};

function simulateOnce({
    deckSize,
    looks,
    hits,
}: {
    deckSize: number;
    looks: number;
    hits: number[];
}) {
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
    // look at the top `looks` number of cards in the deck
    const drawn = deck.slice(0, looks);
    // check if all hit types seen
    const found = new Set(drawn);
    const expected = new Set(Array.from({ length: hits.length }, (_, i) => i + 1));
    const gotAllHits = [...expected].every((v) => found.has(v));
    return gotAllHits;
}

const divFloat = (a: number, b: number) => {
    // var * 1.0 forces floating point division
    return (a * 1.0) / b;
};
