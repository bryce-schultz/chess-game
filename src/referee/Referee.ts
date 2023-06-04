import { PieceType, TeamType, Piece, Position } from "../Constants";
import { pawnRule, knightRule, bishopRule, rookRule, kingRule } from "./rules";

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
            var retVal = false;
            if (rookRule(initialPosition, desiredPosition, team, boardState))
                retVal = true;
            else if (bishopRule(initialPosition, desiredPosition, team, boardState))
                retVal = true;

            return retVal;
        }
        else if (type === PieceType.KING) {
            return kingRule(initialPosition, desiredPosition, team, boardState);
        }

        return false;
    }
}