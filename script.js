document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const grid = Array.from({ length: 4 }, () => Array(4).fill(null));
    let sumnum = 0;
    let maxnum = 4;
    function renderGrid() {
        gridContainer.innerHTML = '';
        grid.forEach(row => {
            row.forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.textContent = cell ? cell : '';
                gridContainer.appendChild(cellElement);
            });
        });
        document.getElementsByClassName("print")[0].innerHTML = "总分："+sumnum;
    }

    function placeRandomBlock() {
        const emptyCells = grid.reduce((acc, row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (!cell) {
                    acc.push({ rowIndex, colIndex });
                }
            });
            return acc;
        }, []);

        if (emptyCells.length > 0) {
            const { rowIndex, colIndex } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[rowIndex][colIndex] = Math.random() > 0.8 ? Math.pow( 2,parseInt(maxnum / 2048 + 2) ) : Math.pow( 2,parseInt(maxnum / 2048 + 1) );
            sumnum += grid[rowIndex][colIndex];
            renderGrid();
        }
    }
    function test(){
        for(let row=0;row<4;row++)
        grid[0][row]=2;
        renderGrid();

    }
    // 初始化游戏
    function initGame() {
        placeRandomBlock();
        placeRandomBlock();
        //test();
    }

    initGame();

    // 监听键盘事件，移动方块
    document.addEventListener('keyup', event => {
        if (event.key === 'ArrowUp') {
            moveup();
        }
        else if (event.key === 'ArrowDown') {
            movedown();
        }
        else if (event.key === 'ArrowLeft') {
            moveleft();
        }
        else if (event.key === 'ArrowRight') {
            moveright();
        }
    });

    function moveup() {
        let ismove = false;// 是否移动过
        // 遍历每一列
        for (let col = 0; col < 4; col++) {
            let mergedCells = new Set(); // 记录已经合并过的格子索引
            // 从第二行开始，向上移动格子
            for (let row = 1; row < 4; row++) {
                if (grid[row][col]) {
                    let currentRow = row;
                    while (currentRow > 0) {
                        // 移动格子
                        if (!grid[currentRow - 1][col]) {
                            ismove = true;
                            grid[currentRow - 1][col] = grid[currentRow][col];
                            grid[currentRow][col] = null;
                            updateCellPosition(currentRow - 1, col);
                        } else if (grid[currentRow - 1][col] === grid[currentRow][col] && !mergedCells.has((currentRow - 1) * 4 + col) && !mergedCells.has(currentRow * 4 + col)) {
                            // 合并格子
                            ismove = true;
                            grid[currentRow - 1][col] *= 2;
                            if (grid[currentRow - 1][col] > maxnum)
                                maxnum = grid[row][currentRow + 1];
                            grid[currentRow][col] = null;
                            mergedCells.add((currentRow - 1) * 4 + col);
                            // 更新 DOM 元素的位置
                            updateCellPosition(currentRow - 1, col);
                        }
                        currentRow--;
                    }
                }
            }      
        }
        if (ismove) {
            placeRandomBlock();
            // 重新渲染游戏格子
            renderGrid();
        }
    }
    function movedown() {
        let ismove = false;// 是否移动过
        // 遍历每一列
        for (let col = 0; col < 4; col++) {
            let mergedCells = new Set(); // 记录已经合并过的格子索引
            // 从第三行开始，向下移动格子
            for (let row = 2; row >= 0; row--) {
                if (grid[row][col]) {
                    let currentRow = row;
                    while (currentRow < 3) {
                        // 移动格子
                        if (!grid[currentRow + 1][col]) {
                            ismove=true;
                            grid[currentRow + 1][col] = grid[currentRow][col];
                            grid[currentRow][col] = null;
                            updateCellPosition(currentRow - 1, col);
                        } else if (grid[currentRow + 1][col] === grid[currentRow][col] && !mergedCells.has((currentRow + 1) * 4 + col)&& !mergedCells.has(currentRow * 4 + col)) {
                            // 合并格子
                            ismove=true;
                            grid[currentRow + 1][col] *= 2;
                            if(grid[currentRow + 1][col] > maxnum)
                                maxnum = grid[row][currentRow + 1];
                            grid[currentRow][col] = null;
                            mergedCells.add((currentRow + 1) * 4 + col);
                            updateCellPosition(currentRow + 1, col);
                        }
                        currentRow++;
                    }
                }
            }
        }
        if (ismove) {
            placeRandomBlock();
            // 重新渲染游戏格子
            renderGrid();
        }
    }

    function moveleft() {
        let ismove = false;// 是否移动过
        // 遍历每一行
        for (let row = 0; row < 4; row++) {
            let mergedCells = new Set(); // 记录已经合并过的格子索引
            // 从第二列开始，向左移动格子
            for (let col = 1; col < 4; col++) {
                if (grid[row][col]) {
                    let currentcol = col;
                    while (currentcol > 0) {
                        // 移动格子
                        if (!grid[row][currentcol - 1]) {
                            ismove = true;
                            grid[row][currentcol - 1] = grid[row][currentcol];
                            grid[row][currentcol] = null;
                            updateCellPosition(row, currentcol - 1);
                        } else if (grid[row][currentcol - 1] === grid[row][currentcol] && !mergedCells.has((currentcol - 1) * 4 + row)&& !mergedCells.has(currentcol * 4 + row)) {
                            // 合并格子
                            ismove = true;
                            grid[row][currentcol - 1] *= 2;
                            if(grid[row][currentcol - 1] > maxnum)
                                maxnum = grid[row][currentcol + 1];
                            grid[row][currentcol] = null;
                            mergedCells.add((currentcol - 1) * 4 + row);
                            updateCellPosition(row, currentcol - 1);
                        }
                        currentcol--;
                    }
                }
            } 
        }
        if (ismove) {
            placeRandomBlock();
            // 重新渲染游戏格子
            renderGrid();
        }
    }
    function moveright() {
        let ismove = false;// 是否移动过
        // 遍历每一行
        for (let row = 0; row < 4; row++) {
            let mergedCells = new Set(); // 记录已经合并过的格子索引
            // 从第三列开始，向右移动格子
            for (let col = 2; col >= 0; col--) {
                if (grid[row][col]) {
                    let currentcol = col;
                    while (currentcol < 3) {
                        // 移动格子
                        if (!grid[row][currentcol + 1]) {
                            ismove = true;
                            grid[row][currentcol + 1] = grid[row][currentcol];
                            grid[row][currentcol] = null;
                            updateCellPosition(row, currentcol + 1);
                        } else if (grid[row][currentcol + 1] === grid[row][currentcol] && !mergedCells.has((currentcol + 1) * 4 + row)&& !mergedCells.has(currentcol * 4 + row)) {
                            // 合并格子
                            ismove = true;
                            grid[row][currentcol + 1] *= 2;
                            if(grid[row][currentcol + 1] > maxnum)
                                maxnum = grid[row][currentcol + 1];
                            grid[row][currentcol] = null;
                            mergedCells.add((currentcol + 1) * 4 + row);
                            updateCellPosition(row, currentcol + 1);
                        }
                        currentcol++;
                    }
                }
            }         
        }
        if (ismove) {
            placeRandomBlock();
            // 重新渲染游戏格子
            renderGrid();
        }
    }
    function updateCellPosition(row, col) {
        const cell = gridContainer.children[row * 4 + col];
        const newTop = row * 150;
        const newLeft = col * 150;
        cell.style.transform = `translate(${newLeft}px, ${newTop}px)`;
    }
    
});
