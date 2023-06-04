import { TeamType, Piece, Position, samePosition } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const kingRule = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]) => {
    for (let i = 1; i < 2; i++) {
        //Diagonal
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;

        let passedPosition: Position = { x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY) };

        if (samePosition(passedPosition, desiredPosition)) {
            if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                return true;
            }
        } else {
            if (tileIsOccupied(passedPosition, boardState)) {
                break;
            }
        }
    }
    return false;
}

export const getPossibleKingMoves = (king: Piece, boardState: Piece[]): Position[] =>
{
    const possibleMoves: Position[] = [];

    for (let i = 1; i < 2; i++) 
    {
        const destination: Position = {x: king.position.x, y: king.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 2; i++) 
    {
        const destination: Position = {x: king.position.x, y: king.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 2; i++) 
    {
        const destination: Position = {x: king.position.x + i, y: king.position.y};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 2; i++) 
    {
        const destination: Position = {x: king.position.x - i, y: king.position.y};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 2; i++) 
    {
       const destination: Position = {x: king.position.x + i, y: king.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 2; i++) 
    {
       const destination: Position = {x: king.position.x + i, y: king.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 2; i++) 
    {
       const destination: Position = {x: king.position.x - i, y: king.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 2; i++) 
    {
       const destination: Position = {x: king.position.x - i, y: king.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    return possibleMoves;
}