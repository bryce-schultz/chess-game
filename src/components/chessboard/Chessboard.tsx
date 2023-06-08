import Tile from '../Tile/Tile';
import './Chessboard.css';
import Referee from '../../referee/Referee';

import { useRef, useState } from 'react';

import white_rook from '../../assets/images/rook_w.png';
import black_rook from '../../assets/images/rook_b.png';
import white_knight from '../../assets/images/knight_w.png';
import black_knight from '../../assets/images/knight_b.png';
import white_bishop from '../../assets/images/bishop_w.png';
import black_bishop from '../../assets/images/bishop_b.png';
import white_queen from '../../assets/images/queen_w.png';
import black_queen from '../../assets/images/queen_b.png';

import {
    VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE, Piece, TeamType, PieceType, initialBoardState,
    Position, samePosition, TURN_NUM, incrementTurn,
} from "../../Constants";

export default function Chessboard()
{
    const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1});
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();

    const referee = new Referee();
    const chessboard_ref = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    let board = [];

    function updateValidMoves()
    {
        setPieces((currentPieces) =>
        {
            return currentPieces.map(piece =>
            {
                piece.possibleMoves = referee.getValidMoves(piece, currentPieces);
                return piece;
            });
        });
    }

    function grabPiece(event: React.MouseEvent)
    {

        updateValidMoves();
        const element = event.target as HTMLElement;
        const chessboard = chessboard_ref.current;
        if (element.classList.contains('tile-image') && chessboard)
        {
            setGrabPosition({
                x: Math.floor((event.clientX - chessboard.offsetLeft) / GRID_SIZE),
                y: 7 - Math.floor((event.clientY - chessboard.offsetTop) / GRID_SIZE),
            });

            const x = event.clientX - GRID_SIZE/2;
            const y = event.clientY - GRID_SIZE/2;

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

        const x = Math.floor((event.clientX - chessboard.offsetLeft) / GRID_SIZE);
        const y = 7-Math.floor((event.clientY - chessboard.offsetTop) / GRID_SIZE);

        const currentPiece = pieces.find(p => samePosition(p.position, grabPosition));

        if (currentPiece)
        {
            // Prevent the inactive team from playing
            let valid = true;
            if (currentPiece.team === TeamType.OUR
                && TURN_NUM % 2 !== 1) valid = false;
            if (currentPiece.team === TeamType.OPPONENT
                && TURN_NUM % 2 !== 0) valid = false;
            if (valid == false) {
                console.log(TURN_NUM);
                activePiece.style.position = "relative";
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");
                setActivePiece(null);
                return;
            }
            incrementTurn();

            const validMove = referee.isValidMove(grabPosition, { x, y }, currentPiece.type, currentPiece.team, pieces);

            const isEnPassantMove = referee.isEnPassantMove(grabPosition, { x, y }, currentPiece.type, currentPiece.team, pieces);

            const pawnDirection = (currentPiece.team === TeamType.OUR) ? 1 : -1;
            
            if (isEnPassantMove)
            {
                const updatedPieces = pieces.reduce((results, piece) => 
                {
                    if (samePosition(piece.position, grabPosition))
                    {
                        piece.enPassant = false;
                        piece.position.x = x;
                        piece.position.y = y;
                        results.push(piece);
                    }
                    else if (!(samePosition(piece.position, { x, y: y - pawnDirection })))
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
                    if (samePosition(piece.position, grabPosition)) {
                        //SPECIAL MOVE
                        piece.enPassant =
                            Math.abs(grabPosition.y - y) === 2 &&
                            piece.type === PieceType.PAWN;

                        piece.position.x = x;
                        piece.position.y = y;

                        let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;

                        if (y === promotionRow && piece.type === PieceType.PAWN) {
                            modalRef.current?.classList.remove("hidden");
                            setPromotionPawn(piece);
                        }
                        results.push(piece);
                    }
                    else if (!samePosition(piece.position, { x, y })) {
                        if (piece.type === PieceType.PAWN) {
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

    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }

        const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, promotionPawn.position)) {
                piece.type = pieceType;
                const ourTeam = piece.team === TeamType.OUR;
                let image = "";
                switch (pieceType) {
                    case PieceType.ROOK: {
                        if (ourTeam)
                        {
                            image = white_rook;
                        }
                        else
                        {
                            image = black_rook;
                        }
                        break;
                    }
                    case PieceType.BISHOP: {
                        if (ourTeam)
                        {
                            image = white_bishop;
                        }
                        else
                        {
                            image = black_bishop;
                        }
                        break;
                    }
                    case PieceType.KNIGHT: {
                        if (ourTeam)
                        {
                            image = white_knight;
                        }
                        else
                        {
                            image = black_knight;
                        }
                        break;
                    }
                    case PieceType.QUEEN: {
                        if (ourTeam)
                        {
                            image = white_queen;
                        }
                        else
                        {
                            image = black_queen;
                        }
                        break;
                    }
                }
                piece.image = image;
            }
            results.push(piece);
            return results;
        }, [] as Piece[])

        setPieces(updatedPieces);

        modalRef.current?.classList.add("hidden");
    }

    function promotionTeamType() {
        return (promotionPawn?.team === TeamType.OUR);
    }

    for (let i = VERTICAL_AXIS.length - 1; i >= 0; i--)
    {
        for (let j = 0; j < HORIZONTAL_AXIS.length; j++)
        {
            const tile_id = j + i + 2;
            const piece = pieces.find(p => p.position.x === j && p.position.y === i);
            let image = piece ? piece.image : undefined;

            let currentPiece = activePiece !== null ? 
                pieces.find(piece => samePosition(piece.position, grabPosition)) : 
                undefined;

            let highlight = currentPiece?.possibleMoves ? 
                currentPiece.possibleMoves.some(pos => samePosition(pos, {x: j, y: i})) : 
                false;

            board.push(<Tile key={`${i},${j}`} number={tile_id} image={image} highlight={highlight}/>);
        }
    }

    return (
        <>
            <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
                <div className="modal-body">
                    {
                        promotionTeamType() ? 
                        <img alt='white rook' onClick={() => promotePawn(PieceType.ROOK)} src={white_rook}/> : 
                        <img alt='black rook' onClick={() => promotePawn(PieceType.ROOK)} src={black_rook}/>
                    }
                    {
                        promotionTeamType() ? 
                        <img alt='white bishop' onClick={() => promotePawn(PieceType.BISHOP)} src={white_bishop}/> : 
                        <img alt='black bishop' onClick={() => promotePawn(PieceType.BISHOP)} src={black_bishop}/>
                    }
                    {
                        promotionTeamType() ? 
                        <img alt='white knight' onClick={() => promotePawn(PieceType.KNIGHT)} src={white_knight}/> : 
                        <img alt='black knight' onClick={() => promotePawn(PieceType.KNIGHT)} src={black_knight}/>
                    }
                    {
                        promotionTeamType() ? 
                        <img alt='white queen' onClick={() => promotePawn(PieceType.QUEEN)} src={white_queen}/> : 
                        <img alt='black queen' onClick={() => promotePawn(PieceType.QUEEN)} src={black_queen}/>
                    }
                </div>
            </div>
            <div 
                onMouseDown={event => grabPiece(event)} 
                onMouseMove={event => movePiece(event)} 
                onMouseUp={event => dropPiece(event)}
                id='chessboard'
                ref={chessboard_ref}
            >
            {board}
            </div>
        </>
    );
}