import { FormControl } from '@angular/forms';

export interface InputData {
    type: string;
    label: string;
    control?: FormControl;
    placeholder?: string;
    readonly?: boolean;
    copyAbility?: boolean;
}
