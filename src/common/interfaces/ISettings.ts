export interface ISettings {
    // Application
    windowBounds: {
        width: number;
        height: number;
    };

    // User
    displayName: string;

    // App state
    openBoard: string;

    // Board view
    userGridColumns: number;
    gridPaddingValue: number; // Base padding (e.g. 1rem) which gets multiplied with userGridPadding to get final padding
    gridPaddingUnit: string;
    userGridPaddingFactor: number;
}