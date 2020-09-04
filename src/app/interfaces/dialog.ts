export interface DialogData {
    title: string;
    text: string;
    rejectButtonText: string;
    confirmButtonText: string;
    confirmAction: Function;
    rejectAction: Function | null;
}