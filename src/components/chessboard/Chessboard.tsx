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
import { useRef } from 'react';

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

let active_piece: HTMLElement | null = null;

export default function Chessboard()
{
    const chessboard_ref = useRef<HTMLDivElement>(null);
    let board = [];

    function grabPiece(event: React.MouseEvent)
    {
        const element = event.target as HTMLElement;
        if (element.classList.contains('tile-image'))
        {
            const x = event.clientX - 50;
            const y = event.clientY - 50;

            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            active_piece = element;
        }   
    }

    function movePiece(event: React.MouseEvent)
    {
        const chessboard = chessboard_ref.current;
        if (active_piece && chessboard)
        {
            const minX = chessboard.offsetLeft - 24;
            const minY = chessboard.offsetTop - 15;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 80;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 88;

            let x = event.clientX - 50;
            let y = event.clientY - 50;

            x = Math.max(x, minX);
            x = Math.min(x, maxX);
            y = Math.max(y, minY);
            y = Math.min(y, maxY);

            active_piece.style.position = 'absolute';
            active_piece.style.left = `${x}px`;
            active_piece.style.top = `${y}px`;
        }   
    }

    function dropPiece(event: React.MouseEvent)
    {
        if (active_piece)
        {
            active_piece = null;
        }
    }

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
        <div 
            onMouseDown={event => grabPiece(event)} 
            onMouseMove={event => movePiece(event)} 
            onMouseUp={event => dropPiece(event)}
            id='chessboard'
            ref={chessboard_ref}
        >
            {board}
        </div>
    );
}