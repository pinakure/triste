function TetrisPiece(type, x, y, rotation=0){
    this.rotation = rotation;;
    this.type = type;
    this.x = x;
    this.y = y;
    this.shape = Shapes[this.type];
    this.data = this.shape[this.rotation];
    this.width = this.shape.width;
    this.height = this.shape.height;
}

TetrisPiece.prototype.landingRow = function(){
    /*Returns first column whose block is landing, starting from bottom left */
    var glclist = this.getRows();
    /* Iterate all rows from bottom to top */
    for(glci=glclist.length-1; glci>=0; glci--){
        var glcrow = glclist[glci];
        /* Find first populated column in this row and return row index when found */
        for(glcri in glcrow){
            var glb = glcrow[glcri];
            if(glb) return glci;
        }
    }
}

TetrisPiece.prototype.landingColumn = function(){
   /*Returns first column whose block is landing, starting from bottom left */
   var glclist = this.getRows();
   /* Iterate all rows from bottom to top */
   var landing_row = this.landingRow();
   for(glci=0;glci< glclist[landing_row].length;glci++ ){
       var glb = glclist[landing_row][glci];
       if(glb) {
            return glci;
       }
   }
   return 0;
}

TetrisPiece.prototype.isPlaceable = function(_map){
    var ip_index=0;
    if(this.y<0)return true;
    try {
        for(ip_row=0; ip_row < this.shape.height; ip_row++){
            for(ip_col=0; ip_col < this.shape.width; ip_col++){            
                if(this.shape.data[this.rotation][ip_index]==1){
                    var x = this.x + ip_col;
                    var y = this.y + ip_row;
                    if(y<0)continue;
                    if(!_map.check(x,y)){
                        return false;
                    }
                }
                ip_index++;
            }
        }
        return true;
    } catch(e){
        return false;
    }
}

TetrisPiece.prototype.update = function(){
    this.data = Shapes[this.type][this.rotation];
}

TetrisPiece.prototype.write = function(_map, value=1){
    if(this.y<0)return _map;
    try {
        for(write_y = 0; write_y < this.height; write_y++){
            for(write_x = 0; write_x < this.width; write_x++){
                if(this.shape.data[this.rotation][(write_y*this.width) + write_x]) 
                    _map.data[this.y + write_y][this.x + write_x] = value;
            }
        }
        return _map;
    } catch(e){
        return false;    
    }
}

TetrisPiece.prototype.logic = function(){
    this.y++;
    if(!this.isPlaceable(Tetris.map)){
        this.y--;
        return false;
    }
    $('#info').html(`
    Y: ${this.y}<bR/>
    X: ${this.x}<bR/>
    O:${this.landingColumn()}<bR/>
    LINES:${Tetris.lines}<bR/>
    `);
    // Piece colission!
    this.update();
    return true;
}

TetrisPiece.prototype.getRows = function(){
    /*
    Returns a set of rows from the set of rows conforming the shape
    */
    var rows = [];
    for(row_index=0; row_index < this.shape.height; row_index++){
        var row = [];
        for(column_index=0; column_index < this.shape.width; column_index++){
            row[column_index] = this.shape.data[this.rotation][(row_index * this.shape.width)+column_index];
        }
        rows[row_index] = row;        
    }
    return rows;
}

TetrisPiece.prototype.getEvaluableBlocks = function(){
    var columns = this.getColumns();
    var blocks = [];
    for(c=0; c<columns.length; c++){
        var column = columns[c];
        for(v=column.length; v>=0;v--){
            if(column[v]){
                blocks[blocks.length] = [ c, v ];
                v = 0;
                continue;
            }
        }
    }
    return blocks;
}

TetrisPiece.prototype.getColumns = function(){
        /*
    Returns a set of columns from the set of rows conforming the shape
    */
    var cols = [];
    for(column_index=0; column_index < this.shape.width; column_index++){
        var col = [];
        for(row_index=0; row_index < this.shape.height; row_index++){
            col[row_index] = this.shape.data[this.rotation][(row_index*this.shape.width)+column_index];
        }
        cols[column_index] = col; 
    }
    return cols;
}
