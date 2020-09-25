export interface ButtonData {
    type: string;
    text?: string;
    clickAction?(value?: string): void;
}
