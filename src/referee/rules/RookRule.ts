import { TeamType, Piece, Position, samePosition } from "../../Constants";
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const rookRule = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]) => {
    if (initialPosition.x === desiredPosition.x) {
        for (let i = 1; i < 8; i++) {
            let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;

            let passedPosition: Position = { x: initialPosition.x, y: initialPosition.y + (i * multiplier) };
            if (samePosition(passedPosition, desiredPosition)) {
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
    if (initialPosition.y === desiredPosition.y) {
        for (let i = 1; i < 8; i++) {
            let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;

            let passedPosition: Position = { x: initialPosition.x + (i * multiplier), y: initialPosition.y };
            if (samePosition(passedPosition, desiredPosition)) {
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