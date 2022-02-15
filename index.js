let playerCount = 0;
let gridSize = 0;
let gridCells = 0;
let count = 0;
let allPlayerDiceRollCount = [];
let coordinate = [];
let playerHistory = [];

function setData(event) {
    event.preventDefault();
    playerCount = document.getElementById('playerCount').value;
    gridSize = document.getElementById('gridSize').value;
    gridCells = Math.pow(gridSize, 2);
    allPlayerDiceRollCount = [];
    coordinate = [];
    playerHistory = [];
    let direction = 'right';
    let gridNumber = 0;
    for (let i = 0; i < gridSize; i++) {
        coordinate.push([])
        for (let j = 0; j < gridSize; j++) {
            gridNumber += 1;
            direction == 'right' ? coordinate[i].push(gridNumber) : coordinate[i].unshift(gridNumber);
        }
        direction == 'right' ? direction = 'left' : direction = 'right'
    }
    // document.getElementById('container').innerHTML = '<table>' + createPlayer(playerCount) + '</table>';
    createPlayer(playerCount);
    winnerIdentifier();
    console.log(coordinate);
}

function diceRoll() {
    return Math.floor(Math.random() * 6) + 1;
}

function gameHistory() {
    let score = 0;
    let lastDiceRoll = 0;
    let diceRollHistory = [];
    let positionHistory = [];
    let coordinateHistory = [];
    count = 0;
    let index;
    for (let i = 0; i < gridCells; i++) {
        if (score >= gridCells) {
            break;
        }
        let val = diceRoll();
        score += val;
        lastDiceRoll = val;
        diceRollHistory.push(val);
        positionHistory.length === 0 ? positionHistory.push(val) : positionHistory.push(positionHistory[positionHistory.length - 1] + val);
        if (positionHistory[positionHistory.length - 1] <= gridCells) {
            index = indexLocator(positionHistory[positionHistory.length - 1]);
            coordinateHistory.push(index);
        }
        count++;
    }
    allPlayerDiceRollCount.push(count);
    playerHistory.push([score, lastDiceRoll, diceRollHistory, positionHistory, count, coordinateHistory]);
    return playerHistory;
}

function indexLocator(index) {
    for (let i = 0; i < gridSize; i++) {
        let ind = coordinate[i].indexOf(index);
        if (ind != -1) {
            return ([`(${i}, ${ind})`]);
        }
    }
}

function createPlayer(player) {
    let headers = document.createElement("tr");
    // table.setAttribute("id", "table");
    headers.innerHTML = `
            <th>Player</th>
            <th>Score</th>
            <th>Last Dice Roll</th>
            <th>Dice Roll History</th>
            <th>Position History</th>
            <th>Coordinate History</th>
            <th>Win Status</th>`;
    document.getElementById("table").appendChild(headers);

    for (let i = 0; i < player; i++) {
        let row = document.createElement("tr");
        gameHistory1 = gameHistory();
        row.innerHTML = `
        <td>${i + 1}</td>
        <td>${gameHistory1[i][0]}</td>
        <td>${gameHistory1[i][1]}</td>
        <td>${gameHistory1[i][2]}</td>
        <td>${gameHistory1[i][3]}</td>
        <td>${gameHistory1[i][5]}</td>
        <td><span id='player${i + 1}result'></span></td>`;
        document.getElementById("table").appendChild(row);
    }
}

function winnerIdentifier() {
    // allPlayerDiceRollCount.pop();
    let winner = allPlayerDiceRollCount.indexOf(Math.min(...allPlayerDiceRollCount)) + 1;
    document.getElementById('player' + winner + 'result').innerHTML = 'Winner';
}