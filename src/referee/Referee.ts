import { PieceType, TeamType, Piece, Position } from "../Constants";
import { pawnRule, knightRule, bishopRule, rookRule, kingRule, queenRule, getPossiblePawnMoves, getPossibleKnightMoves, getPossibleBishopMoves, getPossibleRookMoves, getPossibleKingMoves, getPossibleQueenMoves } from "./rules";

export default class Referee 
{

    isEnPassantMove (
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]): boolean
    {
        const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant);

                if (piece) {
                    return true;
                }
            }
        }

        return false;
    }

    isValidMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType, 
        team: TeamType, 
        boardState: Piece[])
    {
        console.log('referee is checking move.');

        if (type === PieceType.PAWN) {
            return pawnRule(initialPosition, desiredPosition, team, boardState);
        }
        else if (type === PieceType.KNIGHT) {
            return knightRule(initialPosition, desiredPosition, team, boardState);
        }
        else if (type === PieceType.BISHOP) {
            return bishopRule(initialPosition, desiredPosition, team, boardState);
        }
        else if (type === PieceType.ROOK) {
            return rookRule(initialPosition, desiredPosition, team, boardState);
        }
        else if (type === PieceType.QUEEN) {
            return queenRule(initialPosition, desiredPosition, team, boardState);
        }
        else if (type === PieceType.KING) {
            return kingRule(initialPosition, desiredPosition, team, boardState);
        }

        return false;
    }

    getValidMoves(piece: Piece, boardState: Piece[]) : Position[]
    {
        if (piece.type === PieceType.PAWN) 
        {
            return getPossiblePawnMoves(piece, boardState);
        }
        else if (piece.type === PieceType.KNIGHT) 
        {
            return getPossibleKnightMoves(piece, boardState);
        }
        else if (piece.type === PieceType.BISHOP) 
        {
            return getPossibleBishopMoves(piece, boardState);
        }
        else if (piece.type === PieceType.ROOK) 
        {
            return getPossibleRookMoves(piece, boardState);
        }
        else if (piece.type === PieceType.QUEEN) 
        {
            return getPossibleQueenMoves(piece, boardState);
        }
        else if (piece.type === PieceType.KING) 
        {
            return getPossibleKingMoves(piece, boardState);
        }
        else
        {
            return [];
        }

        return [];
    }
}