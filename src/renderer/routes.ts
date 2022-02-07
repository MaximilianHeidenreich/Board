/*import wrap from "svelte-spa-router/wrap";
import NotFound from "@pages/NotFound.svelte";
import Home from "@pages/Home.svelte";
import Board from "@pages/Board.svelte";
import Settings from "@pages/Settings.svelte";

export default {
  "/": Home,
  "/board/:id": Board,
  "/settings": Settings,
  "/": wrap({
    asyncComponent: () => import("@pages/Test1.svelte"),
  }),
  "/test2": wrap({
    asyncComponent: () => import("@pages/Test2.svelte"),
  }),
  "/test3": wrap({
    asyncComponent: () => import("@pages/Test3.svelte"),
  }),
  "/board/:id": Board,
  /*
  "/": wrap({
    asyncComponent: () => import("@pages/Home.svelte"),
  }),
  "/board/:id": wrap({
    asyncComponent: () => import("@renderer/lib/pages/Board.svelte"),
  }),
  "/settings": wrap({
    asyncComponent: () => import("@renderer/lib/pages/Settings.svelte"),
  }),
  // Catch-all
  // This is optional, but if present it must be the last
  "*": NotFound,
  
};*/
