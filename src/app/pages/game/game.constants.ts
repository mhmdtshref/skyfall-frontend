export enum E_GAME_STATUS {
    waiting = 'waiting',
    started = 'started',
}

export enum E_GAME_STATUS_LABEL {
    waiting = 'Waiting admin',
    started = 'Game started',
}

export type T_GAME_STATUS = 'waiting' | 'started';

export type T_GAME_STATUS_LABEL = 'Game started' | 'Waiting admin';
