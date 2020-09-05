import { ButtonData } from './button';

export interface DialogData {
    title: string;
    text: string;
    buttons: DialogButtons;
}

export interface DialogButtons {
    confirm: ButtonData;
    reject: ButtonData;
}