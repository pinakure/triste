function truerand(mult){
    return parseInt(((Math.random()*Number.MAX_SAFE_INTEGER)/Number.MAX_SAFE_INTEGER)*mult);
}


var Tetris = {

    width       : 16,//,8,
    height      : 32,//12,
    map         : undefined,
    simulations : [],
    bestmove    : undefined,
    bm          : undefined,
    inistate    : undefined,
    run         : true,
    speed       : 10,
    animate     : true,
    lines       : 0,

    initialize  : function(width=Tetris.width, height=Tetris.height){
        Tetris.width = width;
        Tetris.height = height;
        Tetris.map = new TetrisMap(Tetris.width, Tetris.height);
        Tetris.newPiece();
        Tetris.loop();
    }, 
    
    loop        : function(){
        Tetris.inistate   = new TetrisMap(Tetris.map.width, Tetris.map.height, Tetris.map.data);
        //Tetris.simulations = Tetris.simulate();
        //Tetris.bm = Tetris.bestMovement();
        if(!Tetris.piece.logic()){
            Tetris.inistate = Tetris.piece.write(Tetris.inistate);
            Tetris.map = Tetris.piece.write(Tetris.map);            
            Tetris.newPiece();
            if(!Tetris.animate){
                Tetris.display();
            }
        } else {
            Tetris.map = Tetris.piece.write(Tetris.map);            
        }
        if(Tetris.animate){
            Tetris.display();
        }
        Tetris.map = new TetrisMap(Tetris.map.width, Tetris.map.height, Tetris.inistate.data);
        l =  Tetris.map.getLines();
        if(l>0){
            Tetris.lines += l;
            Tetris.map.removeLines();
            Tetris.simulate();
        }
        if(Tetris.run)setTimeout(Tetris.loop, Tetris.speed);
    },

    newPiece    : function(){
        Tetris.piece = undefined;
        do {
            Tetris.piece = Tetris.addPiece(truerand(7));
        } while(!Tetris.piece);
        Tetris.simulations = Tetris.simulate();
        Tetris.bm = Tetris.bestMovement();
        Tetris.piece.x        = Tetris.bm.x;
        Tetris.piece.rotation = Tetris.bm.rotation;
    },

    addPiece        : function(type){
        var column  = 0;//truerand(Tetris.width-2);
        var row     = -Shapes[type].height;
        var rotation= 0;//truerand(4);
        return Tetris.map.addShape(type, column, row, rotation);
    },

    evaluateSimulations: function(){
        var scores = []; // Want [ 0, 0, 0, 0 ] 
        var angle_count = Shapes[Tetris.piece.type].data.length;
        var best_score = 0;
        var best_index = 0;            
        var best_offset= 0;            
        for(ai=0; ai < angle_count; ai++){
            var simset = Tetris.simulations[ai];
            best_score = 0;
            best_index = 0;
            best_offset = 0;
            for(rz=0; rz < simset.length; rz++){
                var sim = simset[rz];
                var node = $(`body > div.canvasbox.canvas-${ai} > div.canvaswrapper.canvaswrapper-angle_${ai}_${rz} .score`);
                node.html(`
                &nbsp;<b>S:${sim.score}</b>
                &nbsp;<b class="red">P:${sim.penalty}<b>
                `);
                //&nbsp;<b class="green">CS:${sim.columnscore}<b>
                if(sim.score <= best_score)continue;                    
                best_score = sim.score;
                best_offset= sim.piece.landingColumn();
                best_index = sim.position - best_offset;
            }
            scores[ai] = { value: best_score, index: best_index, offset: best_offset };
        }
        return scores;
    },
   
    bestMovement: function(){
        var scores = Tetris.evaluateSimulations();        
        var best_score = 0;
        var best_index = 0;
        var best_offset = 0;
        var best_angle = 0;
        for(si=0; si<scores.length;si++){
            var score = scores[si];
            if(score.value <= best_score)continue;
            best_score = score.value;
            best_index = score.index;
            best_offset= score.offset;
            best_angle = si;
        }
        $('.canvaswrapper').css('background', '#ffffff');
        $(`.canvaswrapper-angle_${best_angle}_${best_index+best_offset}`).css('background', '#ffa0a0');
        Tetris.bestmove = new TetrisMap(Tetris.width, Tetris.height, Tetris.map.data);
        return new Movement(best_index, Tetris.piece.y, best_angle);        
    },

    display     : function(){
        //Tetris.displayInitialState();
        //Tetris.displayBestMove();
        Tetris.displaySimulations();
        Tetris.displayMap();
    },

    displayInitialState: function(){
        if(!Tetris.inistate)return;
        Tetris.inistate.render('initial_state');
    },
    displayBestMove: function(){
        if(!Tetris.bestmove)return;
        Tetris.bestmove.render('best_movement');
    },
    displayMap : function(){
        if(!map)return;
        Tetris.map.render('map');
    },
    displaySimulations:function(){
        for(ai=0; ai < Shapes[Tetris.piece.type].data.length; ai++){
            var simset = Tetris.simulations[ai];
            if(!simset)continue;
            simset[0].map.render(`angle_${ai}`);
            for(si=0; si<simset.length; si++){
                var sim = simset[si];
                sim.render(`angle_${ai}_${si}`);
            }
        }
    },
    
    simulate    : function(){
        //map = new TetrisMap(Tetris.map.width, Tetris.map.height, Tetris.map.data);
        piece = Tetris.piece;
        var simulations = [];
        var angle_count = Shapes[piece.type].data.length;
        for(a=0; a<angle_count; a++){
            simulations[a] = [];
            for(z=0; z<Tetris.map.width; z++){
                simulations[a][z] = new Simulation(Tetris.map, piece, z, a);
            }
        }
        return simulations;
    },
};

