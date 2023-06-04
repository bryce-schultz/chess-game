import { TeamType, Piece, Position, samePosition } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const queenRule = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]) => 
{
    for (let i = 1; i < 8; i++)
    {
        let multiplierX;
        if (desiredPosition.x < initialPosition.x)
        {
            multiplierX = -1;
        }
        else if (desiredPosition.x > initialPosition.x)
        {
            multiplierX = 1;
        }
        else
        {
            multiplierX = 0;
        }

        let multiplierY;
        if (desiredPosition.y < initialPosition.y)
        {
            multiplierY = -1;
        }
        else if (desiredPosition.y > initialPosition.y)
        {
            multiplierY = 1;
        }
        else
        {
            multiplierY = 0;
        }

        let passedPosition: Position = { x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY) };
        //Check if the tile is the destination tile
        if (samePosition(passedPosition, desiredPosition)) 
        {
            //Dealing with destination tile
            if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) 
            {
                return true;
            }
        }
        else 
        {
            //Dealing with passing tile
            if (tileIsOccupied(passedPosition, boardState)) 
            {
                break;
            }
        }
    }
    return false;
}

export const getPossibleQueenMoves = (queen: Piece, boardState: Piece[]): Position[] =>
{
    const possibleMoves: Position[] = [];

    for (let i = 1; i < 8; i++) 
    {
        const destination: Position = {x: queen.position.x, y: queen.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 8; i++) 
    {
        const destination: Position = {x: queen.position.x, y: queen.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 8; i++) 
    {
        const destination: Position = {x: queen.position.x + i, y: queen.position.y};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 8; i++) 
    {
        const destination: Position = {x: queen.position.x - i, y: queen.position.y};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 8; i++) 
    {
       const destination: Position = {x: queen.position.x + i, y: queen.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 8; i++) 
    {
       const destination: Position = {x: queen.position.x + i, y: queen.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 8; i++) 
    {
       const destination: Position = {x: queen.position.x - i, y: queen.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
        {
            possibleMoves.push(destination);
            break;
        } 
        else 
        {
            break;
        }
    }

    for (let i = 1; i < 8; i++) 
    {
       const destination: Position = {x: queen.position.x - i, y: queen.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team))
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