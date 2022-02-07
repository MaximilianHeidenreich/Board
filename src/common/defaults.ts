import type { IData } from "./interfaces/IData"
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

    // App state
    openBoard: "",

    // Board view
    userGridColumns: 4,
    gridPaddingValue: 1, // Base padding (e.g. 1rem) which gets multiplied with userGridPadding to get final padding
    gridPaddingUnit: "rem",
    userGridPaddingFactor: 1,
}

export const DataDefault: IData = {
    boards: [
        {
            id: "asdkl",
            createdAt: 0,
            modifiedAt: 0,

            title: "Test Entry",
            description: "Hello world",
            headerImage:
                "https://dr.savee-cdn.com/things/thumbnails/6/1/f728012244d7c2cf4d9e17.jpg",
            members: "",

            defaultLayout: EBoardLayout.grid, // For online viewers and if shared
            gridSize: 1,
            gridPadding: 1,
            notesShown: false,

            entities: [
                /*{
                    createdAt: 0,
                    modifiedAt: 0,
                    id: "asldhlas",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/f728012244d7c2cf4d9e17.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "asda",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/fc0a9820461a2e2e00d510.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "sd2d9o",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/fb191f7df8a82e1cb6e73f.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "asdjh9a8hsdi",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/fb18b7374fe7d586d74ceb.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "asd6",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/f8929d7e88f5505d0714fa.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "asd211",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/f728012244d7c2cf4d9e17.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "3tw5t34",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/fc0a9820461a2e2e00d510.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "a3fse",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/fb18b7374fe7d586d74ceb.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },
                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "ad398qi2",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/fb191f7df8a82e1cb6e73f.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },

                {
                    createdAt: 0,
                    modifiedAt: 0,
                    type: "image",
                    id: "sads1i",

                    imgSource:
                        "https://dr.savee-cdn.com/things/thumbnails/6/1/f8929d7e88f5505d0714fa.jpg",

                    // Map
                    locX: 0,
                    locY: 0,
                },*/
            ],
        },
    ],
}
