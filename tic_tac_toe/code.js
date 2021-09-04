class TicTacToe {
    constructor(size, root, debug = false) { 
        this.winMap = [];
        this.players = {
            '0': [],
            'X': []      
        };

        this.debug = debug;
        this.currentPlayer = 'X';
        this.winner = null;

        this.size = size;
        
        if (size & 1) {
            this.renderDOM(root, {margin: 2, width: 50});
            this.lis = document.querySelectorAll('li');
            this.initMatrix(size);

            window.addEventListener('click', e => {
                if (e.target.tagName === 'LI') {
                  e.preventDefault();
                  this.handleClick(e.target);
                }
            });
        
        } else {
            document.querySelector('.error').classList.add('show'); 
        }
    }

    renderDOM(root, opts) {
        const dims = this.size * opts.width + (this.size - 1) * opts.margin;
        root.setAttribute('style', 'width:' + dims + 'px;');
        for(let i = 0; i < this.size; i++) {
            const ul = document.createElement('ul');
            ul.setAttribute('style', 'margin-bottom:' + opts.margin + 'px;height:' + opts.width + 'px');
            root.appendChild(ul);
            for (let y = 0; y < this.size; y++) {
                const li = document.createElement('li');
                li.setAttribute('style', 'margin-right:' + opts.margin + 'px;width:' + opts.width + 'px');
                ul.appendChild(li);
            }
        }
    }

    initMatrix() {
        let winMapRow = [];
        
        // Hanlde rows
        this.lis.forEach((li, idx) => {
            li.setAttribute('data-index', idx);            
            this.debug && (li.innerHTML = '<span>' + idx + '</span>'); 
            if (idx && idx % this.size === 0) {
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
        
        this.debug && console.log('Win map', this.winMap);
    }

    handlePlayers(player) {
        this.currentPlayer = player === 'X' ? '0' : 'X';
        this.debug && console.log('Current player', this.currentPlayer);
    }

    handleClick(handler) {
        if (handler.className.match(/selected/) || this.winner) {
            return false;
        }
        handler.classList.add('selected', 'selected' + this.currentPlayer);
        this.players[this.currentPlayer].push(handler.getAttribute('data-index'));
        this.handleWinners();
        this.handlePlayers(this.currentPlayer);
    }

    getHadnler(idx) {
        return document.querySelector('li[data-index="' + idx + '"]');
    }

    handleWinners() {
        const playerMap = this.players[this.currentPlayer];
        const res = this.players[this.currentPlayer].map(x => parseInt(x, 10));
        playerMap.length >= this.size && this.winMap.forEach(nums => {
            let winner = true;
            nums.forEach(n => {
                winner = winner && res.indexOf(n) > -1;
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
    new TicTacToe(5, document.querySelector('#root'), true);
})();