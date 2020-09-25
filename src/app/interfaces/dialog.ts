import { ButtonData } from './button';
import { InputData } from './input';

export interface DialogData {
    title: string;
    text: string;
    buttons: DialogButtons;
    input: InputData;
}

export interface DialogButtons {
    confirm: ButtonData;
    reject: ButtonData;
}
