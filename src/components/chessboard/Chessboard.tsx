import Tile from '../Tile/Tile';
import './Chessboard.css';
import Referee from '../../referee/Referee';

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
import { useRef, useState } from 'react';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export enum PieceType 
{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum TeamType
{
    OPPONENT,
    OUR
}

export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
}

const initialBoardState: Piece[] = [];

for (let i = 0; i < 8; i++)
{
    initialBoardState.push({image: black_pawn, x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT});
}

for (let i = 0; i < 8; i++)
{
    initialBoardState.push({image: white_pawn, x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR});
}

initialBoardState.push({image: black_rook, x: 0, y: 7, type: PieceType.ROOK, team: TeamType.OPPONENT});
initialBoardState.push({image: black_rook, x: 7, y: 7, type: PieceType.ROOK, team: TeamType.OPPONENT});
initialBoardState.push({image: white_rook, x: 0, y: 0, type: PieceType.ROOK, team: TeamType.OUR});
initialBoardState.push({image: white_rook, x: 7, y: 0, type: PieceType.ROOK, team: TeamType.OUR});
initialBoardState.push({image: black_knight, x: 1, y: 7, type: PieceType.KNIGHT, team: TeamType.OPPONENT});
initialBoardState.push({image: black_knight, x: 6, y: 7, type: PieceType.KNIGHT, team: TeamType.OPPONENT});
initialBoardState.push({image: white_knight, x: 1, y: 0, type: PieceType.KNIGHT, team: TeamType.OUR});
initialBoardState.push({image: white_knight, x: 6, y: 0, type: PieceType.KNIGHT, team: TeamType.OUR});
initialBoardState.push({image: black_bishop, x: 2, y: 7, type: PieceType.BISHOP, team: TeamType.OPPONENT});
initialBoardState.push({image: black_bishop, x: 5, y: 7, type: PieceType.BISHOP, team: TeamType.OPPONENT});
initialBoardState.push({image: white_bishop, x: 2, y: 0, type: PieceType.BISHOP, team: TeamType.OUR});
initialBoardState.push({image: white_bishop, x: 5, y: 0, type: PieceType.BISHOP, team: TeamType.OUR});
initialBoardState.push({image: black_queen, x: 3, y: 7, type: PieceType.QUEEN, team: TeamType.OPPONENT});
initialBoardState.push({image: black_king, x: 4, y: 7, type: PieceType.KING, team: TeamType.OPPONENT});
initialBoardState.push({image: white_queen, x: 4, y: 0, type: PieceType.QUEEN, team: TeamType.OUR});
initialBoardState.push({image: white_king, x: 3, y: 0, type: PieceType.KING, team: TeamType.OUR});

export default function Chessboard()
{
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const referee = new Referee();
    const chessboard_ref = useRef<HTMLDivElement>(null);
    let board = [];

    function grabPiece(event: React.MouseEvent)
    {
        const element = event.target as HTMLElement;
        const chessboard = chessboard_ref.current;
        if (element.classList.contains('tile-image') && chessboard)
        {
            setGridX(Math.floor((event.clientX - chessboard.offsetLeft) / 100));
            setGridY(7-Math.floor((event.clientY - chessboard.offsetTop) / 100));

            const x = event.clientX - 50;
            const y = event.clientY - 50;

            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }   
    }

    function movePiece(event: React.MouseEvent)
    {
        const chessboard = chessboard_ref.current;
        if (activePiece && chessboard)
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

            activePiece.style.position = 'absolute';
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }   
    }

    function dropPiece(event: React.MouseEvent)
    {
        const chessboard = chessboard_ref.current;
        if (!activePiece || !chessboard) return;

        const x = Math.floor((event.clientX - chessboard.offsetLeft) / 100);
        const y = 7-Math.floor((event.clientY - chessboard.offsetTop) / 100);

        const currentPiece = pieces.find(p => p.x === gridX && p.y === gridY);

        if (currentPiece)
        {
            const validMove = referee.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);

            const isEnPassantMove = referee.isEnPassantMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);

            const pawnDirection = (currentPiece.team === TeamType.OUR) ? 1 : -1;
            
            if (isEnPassantMove)
            {
                const updatedPieces = pieces.reduce((results, piece) => 
                {
                    if (piece.x === gridX && piece.y === gridY)
                    {
                        piece.enPassant = false;
                        piece.x = x;
                        piece.y = y;
                        results.push(piece);
                    } 
                    else if (!(piece.x === x && piece.y === y - pawnDirection))
                    {
                        if (piece.type === PieceType.PAWN)
                        {
                            piece.enPassant = false;
                        }
                        results.push(piece);
                    }

                    return results;
                }, [] as Piece[]);

                setPieces(updatedPieces);
            }
            else if (validMove)
            {
                const updatedPieces = pieces.reduce((results, piece) =>
                {
                    if (piece.x === gridX && piece.y === gridY)
                    {
                        if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN)
                        {
                            piece.enPassant = true;
                        }
                        else
                        {
                            piece.enPassant = false;
                        }

                        piece.x = x;
                        piece.y = y;
                        results.push(piece);
                    }
                    else if (!(piece.x === x && piece.y === y))
                    {
                        if (piece.type === PieceType.PAWN)
                        {
                            piece.enPassant = false;
                        }

                        results.push(piece);
                    }

                    return results;
                }, [] as Piece[]);

                setPieces(updatedPieces);
            }
            else
            {
                activePiece.style.position = 'relative';
                activePiece.style.removeProperty('top');
                activePiece.style.removeProperty('left');
            }   
        }

        setActivePiece(null);
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