import { PieceType, TeamType, Piece, Position } from "../Constants";

export default class Referee 
{
    tileIsOccupied(position: Position, boardState: Piece[]): boolean
    {
        const piece = boardState.find(p => p.position.x === position.x && p.position.y === position.y);
        if (piece)
            return true;
        return false;
    }

    tileIsOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType): boolean
    {
        const piece = boardState.find(p => p.position.x === position.x && p.position.y === position.y && p.team !== team);

        if (piece)
            return true;
        return false;
    }

    tileIsEmptyOrOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType) {
        return (!this.tileIsOccupied(position, boardState) || this.tileIsOccupiedByOpponent(position, boardState, team));
    }

    isEnPassantMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType, 
        team: TeamType, 
        boardState: Piece[]): boolean
    {
        const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

        if (type === PieceType.PAWN)
        {
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection)
            {
                const piece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant);

                if (piece)
                {
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

        if (type === PieceType.PAWN)
        {
            return this.pawnRule(initialPosition, desiredPosition, team, boardState);
        }
        else if (type === PieceType.KNIGHT) {
            return this.knightRule(initialPosition, desiredPosition, team, boardState);
        }

        return false;
    }

    pawnRule(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[])
    {
        const specialRow = (team === TeamType.OUR) ? 1 : 6;
        const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

        // movement logic.
        if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2*pawnDirection)
        {
            if (!this.tileIsOccupied(desiredPosition, boardState) &&
                !this.tileIsOccupied({ x: desiredPosition.x, y: desiredPosition.y - pawnDirection }, boardState))
            {
                return true;
            }
        } 
        else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection)
        {
            if (!this.tileIsOccupied(desiredPosition, boardState))
            {
                return true;
            }
        }
        // attack logic.
        else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection)
        {
            if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team))
            {
                return true;
            }
        }
        else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection)
        {   
            if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team))
            {
                return true;
            }
        }

        return false;
    }

    knightRule(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]) {
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                if (desiredPosition.y - initialPosition.y === 2 * i) {
                    if (desiredPosition.x - initialPosition.x === j) {
                        if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                            return true;
                        }
                    }
                }
                if (desiredPosition.x - initialPosition.x === 2 * i) {
                    if (desiredPosition.y - initialPosition.y === j) {
                        if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
}