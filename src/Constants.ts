import white_pawn from './assets/images/pawn_w.png';
import black_pawn from './assets/images/pawn_b.png';
import white_rook from './assets/images/rook_w.png';
import black_rook from './assets/images/rook_b.png';
import white_knight from './assets/images/knight_w.png';
import black_knight from './assets/images/knight_b.png';
import white_bishop from './assets/images/bishop_w.png';
import black_bishop from './assets/images/bishop_b.png';
import white_queen from './assets/images/queen_w.png';
import black_queen from './assets/images/queen_b.png';
import white_king from './assets/images/king_w.png';
import black_king from './assets/images/king_b.png';

export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const GRID_SIZE = 100;

export var TURN_NUM = 1;

export function incrementTurn() {
    TURN_NUM++;
}

export function samePosition(p1: Position, p2: Position) {
    return p1.x === p2.x && p1.y === p2.y;
}

export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum TeamType {
    OPPONENT,
    OUR
}

export interface Position {
    x: number;
    y: number;
}

export interface Piece {
    image: string;
    position: Position;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
    possibleMoves?: Position[];
}


export const initialBoardState: Piece[] = [
    { image: white_king, position: { x: 3, y: 0, }, type: PieceType.KING, team: TeamType.OUR },
    { image: white_queen, position: { x: 4, y: 0, }, type: PieceType.QUEEN, team: TeamType.OUR },
    { image: black_king, position: { x: 4, y: 7, }, type: PieceType.KING, team: TeamType.OPPONENT },
    { image: black_queen, position: { x: 3, y: 7, }, type: PieceType.QUEEN, team: TeamType.OPPONENT },
    { image: white_bishop, position: { x: 5, y: 0, }, type: PieceType.BISHOP, team: TeamType.OUR },
    { image: white_bishop, position: { x: 2, y: 0, }, type: PieceType.BISHOP, team: TeamType.OUR },
    { image: black_bishop, position: { x: 5, y: 7, }, type: PieceType.BISHOP, team: TeamType.OPPONENT },
    { image: black_bishop, position: { x: 2, y: 7, }, type: PieceType.BISHOP, team: TeamType.OPPONENT },
    { image: white_knight, position: { x: 6, y: 0, }, type: PieceType.KNIGHT, team: TeamType.OUR },
    { image: white_knight, position: { x: 1, y: 0, }, type: PieceType.KNIGHT, team: TeamType.OUR },
    { image: black_knight, position: { x: 6, y: 7, }, type: PieceType.KNIGHT, team: TeamType.OPPONENT },
    { image: black_knight, position: { x: 1, y: 7, }, type: PieceType.KNIGHT, team: TeamType.OPPONENT },
    { image: white_rook, position: { x: 7, y: 0, }, type: PieceType.ROOK, team: TeamType.OUR },
    { image: white_rook, position: { x: 0, y: 0, }, type: PieceType.ROOK, team: TeamType.OUR },
    { image: black_rook, position: { x: 7, y: 7, }, type: PieceType.ROOK, team: TeamType.OPPONENT },
    { image: black_rook, position: { x: 0, y: 7, }, type: PieceType.ROOK, team: TeamType.OPPONENT },
    { image: white_pawn, position: { x: 0, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: white_pawn, position: { x: 1, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: white_pawn, position: { x: 2, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: white_pawn, position: { x: 3, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: white_pawn, position: { x: 4, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: white_pawn, position: { x: 5, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: white_pawn, position: { x: 6, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: white_pawn, position: { x: 7, y: 1, }, type: PieceType.PAWN, team: TeamType.OUR },
    { image: black_pawn, position: { x: 0, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image: black_pawn, position: { x: 1, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image: black_pawn, position: { x: 2, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image: black_pawn, position: { x: 3, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image: black_pawn, position: { x: 4, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image: black_pawn, position: { x: 5, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image: black_pawn, position: { x: 6, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image: black_pawn, position: { x: 7, y: 6, }, type: PieceType.PAWN, team: TeamType.OPPONENT },
];