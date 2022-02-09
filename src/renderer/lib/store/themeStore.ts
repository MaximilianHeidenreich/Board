import { writable } from "svelte/store"

export let themeStore = writable({
    darkMode: false,
    colors: {
        textBase: "#000",
        textBaseDark: "#fff",

        textLight: "#fff",
        textLightDark: "#fff",

        textMuted: "#999",
        textMutedDark: "",
    },
})
