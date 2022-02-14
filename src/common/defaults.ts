import type { ISettings } from "./interfaces/ISettings"
import { EBoardLayout } from "./interfaces/EBoardLayout"

export const SettingsDefault: ISettings = {
    // Application
    windowBounds: {
        width: 760,
        height: 420,
    },

    // User
    displayName: "Untitled User",
    licenseKey: "",

    // App state
    openBoardId: "",
    sidebarShown: false,
    favourites: [],
    folders: [],

    // Board view
    defaultBoardLayout: EBoardLayout.grid,
    defaultBoardGridColumns: 4,
    defaultBoardGridPaddingValue: 1, // Base padding (e.g. 1rem) which gets multiplied with userGridPadding to get final padding
    defaultBoardGridPaddingUnit: "rem",
    defaultBoardGridPaddingFactor: 1,
}
