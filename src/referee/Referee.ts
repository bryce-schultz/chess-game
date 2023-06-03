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
        else if (type === PieceType.BISHOP) {
            return this.bishopRule(initialPosition, desiredPosition, team, boardState);
        }
        else if (type === PieceType.ROOK) {
            return this.rookRule(initialPosition, desiredPosition, team, boardState);
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

        return false;
    }

    bishopRule(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]) {
        for (let i = 1; i < 8; i++) {
            //Up right movement
            if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x + i, y: initialPosition.y + i };
                //Check if the tile is the destination tile
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //Dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    //Dealing with passing tile
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
            //Bottom right movement
            if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x + i, y: initialPosition.y - i };
                //Check if the tile is the destination tile
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //Dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
            //Bottom left movement
            if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x - i, y: initialPosition.y - i };
                //Check if the tile is the destination tile
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //Dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
            //Top left movement
            if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition: Position = { x: initialPosition.x - i, y: initialPosition.y + i };
                //Check if the tile is the destination tile
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //Dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
        }

        return false;
    }

    rookRule(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]) {
        if (initialPosition.x === desiredPosition.x) {
            for (let i = 1; i < 8; i++) {
                let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;

                let passedPosition: Position = { x: initialPosition.x, y: initialPosition.y + (i * multiplier) };
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
        }
        if (initialPosition.y === desiredPosition.y) {
            for (let i = 1; i < 8; i++) {
                let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;

                let passedPosition: Position = { x: initialPosition.x + (i * multiplier), y: initialPosition.y };
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                }
                else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
        }

        return false;
    }
}