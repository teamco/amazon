class TicTacToe {
    constructor(size, minSize, root, debug = false) { 
        this.winMap = [];
        this.players = {
            '0': [],
            'X': []      
        };

        this.debug = debug;
        this.currentPlayer = 'X';
        this.winner = null;

        this.size = size;
        this.minSize = minSize;

        if (size < minSize) {
            throw new Error('Size less than Min size');
        }
        
        if (size & 1) {
            this.renderDOM(root, {margin: 2, width: 50});
            this.uls = document.querySelectorAll('ul');
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

    getCombinations(colMap, startAt, result = []) {
        if (startAt >= colMap.length) {
            return result;
        }

        const res = [];
        for (let i = startAt; i < colMap.length; i++) {
            if (res.length < this.minSize) {
                res.push(colMap[i]);
            }
        }

        if (res.length === this.minSize) {
            result.push(res);
        }
        
        return this.getCombinations(colMap, startAt + 1, result);
    }

    handleH(HMap = []) {
        this.uls.forEach((ul, ul_idx) => {        
            const lis = ul.querySelectorAll('li');
            let colMap = [];
            lis.forEach((li, li_idx) => {
                const idx = ul_idx + '' + li_idx;
                li.setAttribute('data-index', idx);            
                this.debug && (li.innerHTML = '<span>' + idx + '</span>'); 
                colMap.push(idx);            
            });

            const res = this.getCombinations(colMap, 0, []);

            HMap.push(colMap);

            this.winMap = [...this.winMap, ...res]; 
        });

        return HMap;
    }

    handleV(HMap, VMap = []) {
        const HMap_90 = HMap[0].map((val, index) => HMap.map(row => row[index]).reverse());
        HMap_90.forEach(val => {
            const res = this.getCombinations(val, 0, []);
            VMap = [...VMap,  ...res];
        });  
        
        return {VMap, HMap_90};
    }

    handleDiagonals(list, index = 0, up = 1, diagonals = []) {
        if (list.length < index + 1) {
            return diagonals;        
        }

        const diagonal = list.map((val, idx) => val[idx + up * index]).filter(d => d);
        const combinations = this.getCombinations(diagonal, 0, []);

        if (diagonal.length >= this.minSize) {
            diagonals = [...diagonals, ...combinations];
        }
        
        return this.handleDiagonals(list, index + 1, up, diagonals);
    }

    initMatrix() {
        const HMap = this.handleH([]);

        const dHUp = this.handleDiagonals(HMap, 0, 1, []);
        const dHDown  = this.handleDiagonals(HMap, 0, -1, []);

        const diagonalsH = Array.from(new Set([...dHUp, ...dHDown].map(JSON.stringify)), JSON.parse);

        const {VMap, HMap_90} = this.handleV(HMap, []);  


        const dVUp = this.handleDiagonals(HMap_90, 0, 1, []);
        const dVDown  = this.handleDiagonals(HMap_90, 0, -1, []);

        const diagonalsV = Array.from(new Set([...dVUp, ...dVDown].map(JSON.stringify)), JSON.parse);

        this.winMap = [...this.winMap, ...VMap, ...diagonalsH, ...diagonalsV];
        
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
        playerMap.length >= this.minSize && this.winMap.forEach(nums => {
            let winner = true;
            nums.forEach(n => {
                winner = winner && res.indexOf(parseInt(n, 10)) > -1;
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
    new TicTacToe(5, 3, document.querySelector('#root'), true);
})();