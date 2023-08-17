function Movement(x,y,rotation) {
    this.x = x;
    this.rotation = rotation;
};

function Simulation(map, piece, z_position, rotation, q=3.5, w=1.0){
    this.w = w;
    this.q = q;
    this.map = new TetrisMap(map.width, map.height, map.data);
    this.map.color = [0,255,0,255];
    this.piece = new TetrisPiece(piece.type, z_position, piece.y, rotation);
    this.position = z_position;
    this.landing_column = this.piece.landingColumn();
    this.piece.x-=this.piece.landingColumn() ;
    this.score = 0;
    this.penalty = 0;
    this.map.removeLines();
    this.columnscore = this.map.getColumnScore(this.position);
    this.run();
}

Simulation.prototype.run = function(){
    // Calculate movement 
    // Set Simulation.score = { value:value, column_index:index }
    this.score = 0;
    for(y=this.piece.y;y<Tetris.height;y++){
        this.piece.y = y;
        if(!this.piece.isPlaceable(this.map)){
            this.piece.y--;
            if(this.piece.y<=0){
                this.score = -1;                
            }
            this.penalty = this.calculatePenalty();
            return;
        }
    }
}

Simulation.prototype.calculatePenalty = function(){
    if(this.score == -1)return 99999;
    var penalty = 0;
    var blocks = this.piece.getEvaluableBlocks();
    this.piece.write(this.map,3);
    for(b=0; b<blocks.length; b++){
        var block = blocks[b];
        var x = this.piece.x+block[0];
        if(x>=this.map.width)continue; else if(x<0)continue;
        if(this.piece.rotation==2){
            //console.clear();
            //console.table(this.piece);
            //console.table(this.map.data);
            //debugger
        }
        for(y=this.piece.y+block[1]+1;y<this.map.height; y++){
        //for(y=this.map.height-1; y>=this.piece.y + block[1]; y--){
            if(y>=this.map.height)continue; else if(y<0)continue;
            if(this.map.data[y][x]==0){
                //penalty+=(this.map.height-y)*10;
                penalty+=(this.map.height-y);
                penalty *= this.q;
                penalty = parseInt(penalty);
                //console.log(`penalty at ${x},${y} on angle ${this.piece.rotation} position:${th//is.position}. map[${y}][${x}]=${this.map.data[y][x]}`);
            } 
            if(!this.map.data[y][x]==0){y=this.map.height;}            
        }
    }
    var c = this.map.color;
    this.map.color = [255,0,0,255];
    this.piece.write(this.map, 3);
    this.map.color = c;
    var lines = this.map.getLines() * 100;
    var cs = (this.score >=0) 
        ? this.columnscore*this.w//this.map.getColumnScore(this.position) 
        : this.score;
    this.score = (cs + lines) - (penalty);
    return penalty;//this.score = cs;
}

Simulation.prototype.render = function(target){
    this.map.render(target);
}