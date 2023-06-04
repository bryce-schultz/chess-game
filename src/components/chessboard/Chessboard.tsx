import Tile from '../Tile/Tile';
import './Chessboard.css';
import Referee from '../../referee/Referee';

import { useRef, useState } from 'react';

import {
    VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE, Piece, TeamType, PieceType, initialBoardState,
    Position, samePosition,
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

    function grabPiece(event: React.MouseEvent)
    {
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
                const teamType = (piece.team === TeamType.OUR) ? "w" : "b";
                let image = "";
                switch (pieceType) {
                    case PieceType.ROOK: {
                        image = "rook";
                        break;
                    }
                    case PieceType.BISHOP: {
                        image = "bishop";
                        break;
                    }
                    case PieceType.KNIGHT: {
                        image = "knight";
                        break;
                    }
                    case PieceType.QUEEN: {
                        image = "queen";
                        break;
                    }
                }
                piece.image = `assets/images/${image}_${teamType}.png`;
            }
            results.push(piece);
            return results;
        }, [] as Piece[])

        setPieces(updatedPieces);

        modalRef.current?.classList.add("hidden");
    }

    function promotionTeamType() {
        return (promotionPawn?.team === TeamType.OUR) ? "w" : "b";
    }

    for (let i = VERTICAL_AXIS.length - 1; i >= 0; i--)
    {
        for (let j = 0; j < HORIZONTAL_AXIS.length; j++)
        {
            const tile_id = j + i + 2;
            const piece = pieces.find(p => p.position.x === j && p.position.y === i);
            let image = piece ? piece.image : undefined;

            board.push(<Tile key={`${i},${j}`} number={tile_id} image={image}/>);
        }
    }

    return (
        <>
            <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
                <div className="modal-body">
                    <img onClick={() => promotePawn(PieceType.ROOK)} src={`../../assets/images/rook_${promotionTeamType()}.png`}/>
                    <img onClick={() => promotePawn(PieceType.BISHOP)} src={`../../assets/images/bishop_${promotionTeamType()}.png`}/>
                    <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`../../assets/images/knight_${promotionTeamType()}.png`}/>
                    <img onClick={() => promotePawn(PieceType.QUEEN)} src={`../../assets/images/queen_${promotionTeamType()}.png`}/>
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