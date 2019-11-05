export const fetchUrl = 'https://api.pokemontcg.io/v1/cards'

/**
 *  You can define here:
 *  - pageSize - count of items that will be fetched from the server
 *  - blockSize - count of items that will be lazy rendered on the page in one time, each time user scrolls to the
 *  bottom of the window same {blockSize} quantity will be added from props to displayed list of cards
 *
 *  Please, don't define blockSize greater then pageSize
 *
 * */
export const blockSize = 20
export const pageSize = 50