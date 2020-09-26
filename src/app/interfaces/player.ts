/* {
    "id":1,
    "name":"Mohamed Sh",
    "gameId":1,
    "isSpy":false
}*/
export interface Player {
    id: number;
    name: string;
    gameId: number;
    isSpy?: boolean;
}