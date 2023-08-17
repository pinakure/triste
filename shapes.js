var Shapes = {
    0 : {
        type    : 0,
        name    : 'L',
        rotate  : true,
        center  : [1,1],
        width   : 3,
        height  : 3,
        data    : [ 
                    [ 
                        1, 0, 0, 
                        1, 0, 0, 
                        1, 1, 0, 
                    ],[ 
                        1, 1, 1, 
                        1, 0, 0, 
                        0, 0, 0, 
                    ],[ 
                        0, 1, 1, 
                        0, 0, 1, 
                        0, 0, 1, 
                    ],[ 
                        0, 0, 0, 
                        0, 0, 1, 
                        1, 1, 1, 
                    ],
                ],
    },
    1 : {
        type    : 1,
        name    : 'L flipped',
        rotate  : true,
        center  : [1,1],
        width   : 3,
        height  : 3,
        data    : [ 
                    [ 
                        1, 1, 0, 
                        1, 0, 0, 
                        1, 0, 0, 
                    ],[ 
                        1, 1, 1, 
                        0, 0, 1, 
                        0, 0, 0, 
                    ],[ 
                        0, 0, 1, 
                        0, 0, 1, 
                        0, 1, 1, 
                    ],[ 
                        0, 0, 0, 
                        1, 0, 0, 
                        1, 1, 1, 
                    ],
                ],
    },
    2 : {
        type    : 2,
        name    : 'Z',
        rotate  : true,
        center  : [1,1],
        width   : 3,
        height  : 3,
        data    : [ 
                    [ 
                        1, 1, 0, 
                        0, 1, 1, 
                        0, 0, 0  
                    ],[ 
                        0, 0, 1, 
                        0, 1, 1, 
                        0, 1, 0, 
                    ],[ 
                        0, 0, 0, 
                        1, 1, 0, 
                        0, 1, 1, 
                    ],[ 
                        0, 1, 0, 
                        1, 1, 0, 
                        1, 0, 0, 
                    ],
                ],
    },
    3 : {
        type    : 3,
        name    : 'Z flipped',
        rotate  : true,
        center  : [1,1],
        width   : 3,
        height  : 3,
        data    : [ 
                    [ 
                        0, 1, 1, 
                        1, 1, 0, 
                        0, 0, 0, 
                    ],[ 
                        0, 1, 0, 
                        0, 1, 1, 
                        0, 0, 1, 
                    ],[ 
                        0, 0, 0, 
                        0, 1, 1, 
                        1, 1, 0, 
                    ],[ 
                        1, 0, 0, 
                        1, 1, 0, 
                        0, 1, 0, 
                    ],
                ],
    },
    4 : {
        type    : 4,
        name    : '- stick',
        rotate  : true,
        center  : [1,1],
        width   : 4,
        height  : 4,
        data    : [ 
                    [ 
                        0, 0, 0, 0, 
                        1, 1, 1, 1, 
                        0, 0, 0, 0, 
                        0, 0, 0, 0, 
                    ],[ 
                        0, 1, 0, 0, 
                        0, 1, 0, 0, 
                        0, 1, 0, 0, 
                        0, 1, 0, 0, 
                    ],[ 
                        0, 0, 0, 0, 
                        0, 0, 0, 0, 
                        1, 1, 1, 1, 
                        0, 0, 0, 0, 
                    ],[ 
                        0, 0, 1, 0, 
                        0, 0, 1, 0, 
                        0, 0, 1, 0, 
                        0, 0, 1, 0, 
                    ],
                ],

    },
    5 : {
        type    : 5,
        name    : '2x2 cube',
        rotate  : false,
        center  : [0,1],
        width   : 2,
        height  : 2,
        data    : [ 
                    [ 
                        1, 1, 
                        1, 1
                    ],[ 
                        1, 1, 
                        1, 1
                    ],[ 
                        1, 1, 
                        1, 1
                    ],[ 
                        1, 1, 
                        1, 1
                    ],
                ],
    },
    6 : {
        type    : 6,
        name    : 'T',
        rotate  : true,
        center  : [1,1],
        width   : 3,
        height  : 3,
        data    : [ 
                    [ 
                        1, 1, 1, 
                        0, 1, 0, 
                        0, 0, 0, 
                    ],[ 
                        0, 0, 1, 
                        0, 1, 1, 
                        0, 0, 1, 
                    ],[ 
                        0, 0, 0, 
                        0, 1, 0, 
                        1, 1, 1, 
                    ],[ 
                        1, 0, 0, 
                        1, 1, 0, 
                        1, 0, 0, 
                    ],
                ],
    },
};