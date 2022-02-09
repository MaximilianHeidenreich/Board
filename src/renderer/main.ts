import App from "./App.svelte"
import "@lib/styles/tailwind.css"
import "@lib/styles/base.pcss"
import "@lib/styles/schwifty.pcss"

const app = new App({
    target: document.getElementById("app") as Element,
})

export default app
