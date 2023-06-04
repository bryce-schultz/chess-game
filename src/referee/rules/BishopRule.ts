import { TeamType, Piece, Position, samePosition } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const bishopRule = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]) => {
    for (let i = 1; i < 8; i++) {
        //Up right movement
        if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition: Position = { x: initialPosition.x + i, y: initialPosition.y + i };
            //Check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
                //Dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            }
            else {
                //Dealing with passing tile
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
        //Bottom right movement
        if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition: Position = { x: initialPosition.x + i, y: initialPosition.y - i };
            //Check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
                //Dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            }
            else {
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
        //Bottom left movement
        if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition: Position = { x: initialPosition.x - i, y: initialPosition.y - i };
            //Check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
                //Dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            }
            else {
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
        //Top left movement
        if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition: Position = { x: initialPosition.x - i, y: initialPosition.y + i };
            //Check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
                //Dealing with destination tile
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            }
            else {
                if (tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
    }

    return false;
}

export const getPossibleBishopMoves = (bishop: Piece, boardState: Piece[]): Position[] =>
{
    const possibleMoves: Position[] = [];

    for (let i = 1; i < 8; i++) 
    {
       const destination: Position = {x: bishop.position.x + i, y: bishop.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team))
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
       const destination: Position = {x: bishop.position.x + i, y: bishop.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team))
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
       const destination: Position = {x: bishop.position.x - i, y: bishop.position.y - i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team))
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
       const destination: Position = {x: bishop.position.x - i, y: bishop.position.y + i};

        if (!tileIsOccupied(destination, boardState))
        {
            possibleMoves.push(destination);
        }
        else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, bishop.team))
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