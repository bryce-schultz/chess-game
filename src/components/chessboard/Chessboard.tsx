import Tile from '../Tile/Tile';
import './Chessboard.css';

import white_pawn from '../../assets/images/pawn_w.png';
import black_pawn from '../../assets/images/pawn_b.png';
import white_rook from '../../assets/images/rook_w.png';
import black_rook from '../../assets/images/rook_b.png';
import white_knight from '../../assets/images/knight_w.png';
import black_knight from '../../assets/images/knight_b.png';
import white_bishop from '../../assets/images/bishop_w.png';
import black_bishop from '../../assets/images/bishop_b.png';
import white_queen from '../../assets/images/queen_w.png';
import black_queen from '../../assets/images/queen_b.png';
import white_king from '../../assets/images/king_w.png';
import black_king from '../../assets/images/king_b.png';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

interface Piece {
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = [];

for (let i = 0; i < 8; i++)
{
    pieces.push({image: black_pawn, x: i, y: 6});
}

for (let i = 0; i < 8; i++)
{
    pieces.push({image: white_pawn, x: i, y: 1});
}

pieces.push({image: black_rook, x: 0, y: 7});
pieces.push({image: black_rook, x: 7, y: 7});
pieces.push({image: white_rook, x: 0, y: 0});
pieces.push({image: white_rook, x: 7, y: 0});

pieces.push({image: black_knight, x: 1, y: 7});
pieces.push({image: black_knight, x: 6, y: 7});
pieces.push({image: white_knight, x: 1, y: 0});
pieces.push({image: white_knight, x: 6, y: 0});

pieces.push({image: black_bishop, x: 2, y: 7});
pieces.push({image: black_bishop, x: 5, y: 7});
pieces.push({image: white_bishop, x: 2, y: 0});
pieces.push({image: white_bishop, x: 5, y: 0});

pieces.push({image: black_queen, x: 3, y: 7});
pieces.push({image: black_king, x: 4, y: 7});

pieces.push({image: white_queen, x: 4, y: 0});
pieces.push({image: white_king, x: 3, y: 0});

export default function Chessboard()
{
    let board = [];

    for (let i = verticalAxis.length - 1; i >= 0; i--)
    {
        for (let j = 0; j < horizontalAxis.length; j++)
        {
            const tile_id = j + i + 2;
            let image = undefined;

            pieces.forEach(piece =>
            {   
                if (piece.x === j && piece.y === i)
                {
                    image = piece.image;
                }
            })

            board.push(<Tile key={`${i},${j}`} number={tile_id} image={image}/>);
        }
    }

    return (
        <div id='chessboard'>{board}</div>
    );
}