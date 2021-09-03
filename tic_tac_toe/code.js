class TicTacToe {
    constructor(size, root) { 
        this.winMap = [];
        this.players = {
            '0': [],
            'X': []      
        };

        this.currentPlayer = 'X';
        this.winner = null;
        
        if (size & 1) {
            this.renderDOM(size,  root, {margin: 2, width: 50});
            this.lis = document.querySelectorAll('li');
            this.initMatrix(size);

            window.addEventListener('click', e=> {
                if (e.target.tagName === 'LI') {
                  e.preventDefault();
                  this.handleClick(e.target, size);
                }
            });
        
        } else {
            document.querySelector('.error').classList.add('show'); 
        }
    }

    renderDOM(size, root, opts) {
        const dims = size * opts.width + (size - 1) * opts.margin;
        root.setAttribute('style', 'width:' + dims + 'px;');
        for(let i = 0; i < size; i++) {
            const ul = document.createElement('ul');
            ul.setAttribute('style', 'margin-bottom:' + opts.margin + 'px;height:' + opts.width + 'px');
            root.appendChild(ul);
            for (let y = 0; y < size; y++) {
                const li = document.createElement('li');
                li.setAttribute('style', 'margin-right:' + opts.margin + 'px;width:' + opts.width + 'px');
                ul.appendChild(li);
            }
        }
    }

    initMatrix(size) {
        let winMapRow = [];
        
        // Hanlde rows
        this.lis.forEach((li, idx) => {
            li.setAttribute('data-index', idx); 
            if (idx && idx % size === 0) {
                this.winMap.push(winMapRow);            
                winMapRow = [idx];              
            } else {
                winMapRow.push(idx);
            } 
        });

        this.winMap.push(winMapRow); 

        // Handle diagonal left.
        const diagonal1 = this.winMap.map((val, idx) => val[idx]);

        // Handle columns.
        const rotate90 = this.winMap[0].map((val, index) => this.winMap.map(row => row[index]).reverse());        

        // Handle diagonal right.
        const diagonal2 = rotate90.map((val, idx) => val[idx]);

        this.winMap = [...this.winMap, ...rotate90, diagonal1, diagonal2];
        
        console.log(this.winMap)
    }

    handlePlayers(player) {
        this.currentPlayer = player === 'X' ? '0' : 'X';
    }

    handleClick(handler, size) {
        if (handler.className.match(/selected/) || this.winner) {
            return false;
        }
        handler.classList.add('selected', 'selected' + this.currentPlayer);
        this.players[this.currentPlayer].push(handler.getAttribute('data-index'));
        this.handleWinners(size);
        this.handlePlayers(this.currentPlayer);
    }

    getHadnler(idx) {
        return document.querySelector('li[data-index="' + idx + '"]');
    }

    handleWinners(size) {
        const playerMap = this.players[this.currentPlayer];
        const res = this.players[this.currentPlayer].join('');
        playerMap.length >= size && this.winMap.forEach(nums => {
            let winner = true;
            nums.forEach(n => {
                winner = winner && res.match(n);
            });
            
            if (winner) {
                nums.forEach(n => {
                    const handler = this.getHadnler(n);
                    handler.classList.add('winner');
                });
                this.winner = this.currentPlayer;
            }
        });     
    }
}

(function() {
    new TicTacToe(5, document.querySelector('#root'));
})();