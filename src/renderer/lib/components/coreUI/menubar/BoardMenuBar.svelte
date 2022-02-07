<script lang="ts">
    import { createEventDispatcher } from "svelte";
    //import { pop, replace } from 'svelte-spa-router'
    import { router } from "tinro";
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import LayoutToggle from "@components/coreUI/menubar/LayoutToggle.svelte";
    import ThemeToggle from "@components/coreUI/menubar/ThemeToggle.svelte";
    import ThemedElement from "@components/coreUI/ThemedElement.svelte";
    import type { IBoard } from "@common/interfaces/IBoard";
    import { settings } from "@store/settingsStore";
    import Tooltip from '../../Tooltip.svelte';
    import { darkMode } from '@renderer/lib/store/darkModeStore';
    import Slider from '../form/Slider.svelte';
    import MenuBar from "./MenuBar.svelte";
import ExpandingTextArea from "../form/ExpandingTextArea.svelte";
import AddMediaBtn from "./board/AddMediaBtn.svelte";
import MoreBtn from "./board/MoreBtn.svelte";
import { switcherOpened } from "@renderer/lib/store/switcherOpenedStore";

    export let  board: IBoard,
                commentsVisible = false;
    let settingsShown = false;
    const dispatch = createEventDispatcher();

    function toggleComments() {
        dispatch("toggleComments");
    }

</script>

<MenuBar>
    {#if settingsShown}
    <div id="settingsOverlay" class:dark={$darkMode} class="px-12 py-8 flex justify-between items-center" transition:fly="{{ y: -30, duration: 500, easing: quintOut }}">
        <div class="flex flex-1 justify-evenly items-center">
            <div class="w-48 flex flex-col gap-3 items-center uppercase">
                <strong>Grid Columns</strong>
                <Slider min={1} max={6} bind:value={$settings.userGridColumns}/>
            </div>
            <div class="w-48 flex flex-col gap-3 items-center uppercase">
                <strong>Grid Gap</strong>
                <Slider min={0} max={8} bind:value={$settings.userGridPaddingFactor}/>
            </div>
        </div>
        <button on:click={ () => settingsShown = false }>
            <ThemedElement>
                <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#fff"></path>
                </svg>
                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0D0D0D"></path>
                </svg>
            </ThemedElement>
        </button>
    </div>
    {/if}

    <div id="menubar" class="h-full px-12 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
            <button on:click={() => switcherOpened.set(true)}><h2>Board</h2></button>
            <ThemedElement>
                <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path xmlns="http://www.w3.org/2000/svg" d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L17.5858 12L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289ZM6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289L13.7071 11.2929C13.8946 11.4804 14 11.7348 14 12C14 12.2652 13.8946 12.5196 13.7071 12.7071L7.70711 18.7071C7.31658 19.0976 6.68342 19.0976 6.29289 18.7071C5.90237 18.3166 5.90237 17.6834 6.29289 17.2929L11.5858 12L6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289Z" fill="#fff"></path>
                </svg>
                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path xmlns="http://www.w3.org/2000/svg" d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L17.5858 12L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289ZM6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289L13.7071 11.2929C13.8946 11.4804 14 11.7348 14 12C14 12.2652 13.8946 12.5196 13.7071 12.7071L7.70711 18.7071C7.31658 19.0976 6.68342 19.0976 6.29289 18.7071C5.90237 18.3166 5.90237 17.6834 6.29289 17.2929L11.5858 12L6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289Z" fill="#0D0D0D"></path>
                </svg>
            </ThemedElement>
            <h3>{board.title}</h3>
            <div class="ml-4">
                <ExpandingTextArea 
                    value={board.description}/>
            </div>
        </div>
        <div>
            <ul class="flex gap-5 items-center">
                <li>
                    <AddMediaBtn/>
                </li>
                <li>
                    <Tooltip>
                        <button slot="content">
                            <ThemedElement>
                                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711C15.3166 7.09763 14.6834 7.09763 14.2929 6.70711L13 5.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V5.41421L9.70711 6.70711C9.31658 7.09763 8.68342 7.09763 8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289L11.2929 2.29289ZM4 11C4 9.89543 4.89543 9 6 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H6V20H18V11H16C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9H18C19.1046 9 20 9.89543 20 11V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V11Z" fill="#0D0D0D"></path>
                                </svg>
                                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711C15.3166 7.09763 14.6834 7.09763 14.2929 6.70711L13 5.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V5.41421L9.70711 6.70711C9.31658 7.09763 8.68342 7.09763 8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289L11.2929 2.29289ZM4 11C4 9.89543 4.89543 9 6 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H6V20H18V11H16C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9H18C19.1046 9 20 9.89543 20 11V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V11Z" fill="#0D0D0D"></path>
                                </svg>
                            </ThemedElement>
                        </button>
                        <p slot="tooltip">Export / Share</p>
                    </Tooltip>
                    
                </li>
                <li>
                    <Tooltip>
                        <button slot="content">
                            <ThemedElement>
                                <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M5 10C5 6.68629 7.68629 4 11 4C13.627 4 15.858 5.68745 16.6713 8.03713C19.669 8.37085 22 10.9132 22 14C22 17.3137 19.3137 20 16 20H7C4.23858 20 2 17.7614 2 15C2 12.9436 3.24073 11.1787 5.01385 10.4103C5.00466 10.2746 5 10.1378 5 10ZM11 6C8.79086 6 7 7.79086 7 10C7 10.3029 7.03348 10.5967 7.09656 10.8785C7.21716 11.4173 6.8783 11.9519 6.33958 12.0727C5.00015 12.3732 4 13.571 4 15C4 16.6569 5.34315 18 7 18H16C18.2091 18 20 16.2091 20 14C20 11.7909 18.2091 10 16 10C15.9732 10 15.9465 10.0003 15.9198 10.0008C15.4368 10.0102 15.0161 9.67312 14.9201 9.19971C14.5499 7.37395 12.9343 6 11 6Z" fill="#fff"></path>
                                </svg>
                                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M5 10C5 6.68629 7.68629 4 11 4C13.627 4 15.858 5.68745 16.6713 8.03713C19.669 8.37085 22 10.9132 22 14C22 17.3137 19.3137 20 16 20H7C4.23858 20 2 17.7614 2 15C2 12.9436 3.24073 11.1787 5.01385 10.4103C5.00466 10.2746 5 10.1378 5 10ZM11 6C8.79086 6 7 7.79086 7 10C7 10.3029 7.03348 10.5967 7.09656 10.8785C7.21716 11.4173 6.8783 11.9519 6.33958 12.0727C5.00015 12.3732 4 13.571 4 15C4 16.6569 5.34315 18 7 18H16C18.2091 18 20 16.2091 20 14C20 11.7909 18.2091 10 16 10C15.9732 10 15.9465 10.0003 15.9198 10.0008C15.4368 10.0102 15.0161 9.67312 14.9201 9.19971C14.5499 7.37395 12.9343 6 11 6Z" fill="#0D0D0D"></path>
                                </svg>
                            </ThemedElement>
                        </button>
                        <p slot="tooltip">Synchronization</p>
                    </Tooltip>
                </li>
                <li class="ml-6">
                    <Tooltip>
                        <button slot="content">
                            <ThemedElement>
                                <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M12 4C13.6477 4 15 5.35228 15 7V10H9V7C9 5.35228 10.3523 4 12 4ZM17 10V7C17 4.24772 14.7523 2 12 2C9.24771 2 7 4.24772 7 7V10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10H17ZM6 12H18V20H6V12Z" fill="#fff"></path>
                                </svg>
                                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M12 4C13.6477 4 15 5.35228 15 7V10H9V7C9 5.35228 10.3523 4 12 4ZM17 10V7C17 4.24772 14.7523 2 12 2C9.24771 2 7 4.24772 7 7V10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10H17ZM6 12H18V20H6V12Z" fill="#0D0D0D"></path>
                                </svg>
                            </ThemedElement>
                        </button>
                        <p slot="tooltip">Lock</p>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip>
                        <button slot="content" on:click={toggleComments}>
                            {#if commentsVisible}
                            <!-- TODO!: other icon -->
                            <ThemedElement>
                                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V17C22 18.1046 21.1046 19 20 19H15.4142L12.7071 21.7071C12.3166 22.0976 11.6834 22.0976 11.2929 21.7071L8.58579 19H4C2.89543 19 2 18.1046 2 17V6ZM20 6H4V17H9C9.26522 17 9.51957 17.1054 9.70711 17.2929L12 19.5858L14.2929 17.2929C14.4804 17.1054 14.7348 17 15 17H20V6Z" fill="#0D0D0D"></path>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M13.5 11.5C13.5 12.3284 12.8284 13 12 13C11.1716 13 10.5 12.3284 10.5 11.5C10.5 10.6716 11.1716 10 12 10C12.8284 10 13.5 10.6716 13.5 11.5Z" fill="#0D0D0D"></path>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M17.5 11.5C17.5 12.3284 16.8284 13 16 13C15.1716 13 14.5 12.3284 14.5 11.5C14.5 10.6716 15.1716 10 16 10C16.8284 10 17.5 10.6716 17.5 11.5Z" fill="#0D0D0D"></path>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M9.5 11.5C9.5 12.3284 8.82843 13 8 13C7.17157 13 6.5 12.3284 6.5 11.5C6.5 10.6716 7.17157 10 8 10C8.82843 10 9.5 10.6716 9.5 11.5Z" fill="#0D0D0D"></path>
                                </svg>
                            </ThemedElement>
                            {:else}
                            <ThemedElement>
                                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V17C22 18.1046 21.1046 19 20 19H15.4142L12.7071 21.7071C12.3166 22.0976 11.6834 22.0976 11.2929 21.7071L8.58579 19H4C2.89543 19 2 18.1046 2 17V6ZM20 6H4V17H9C9.26522 17 9.51957 17.1054 9.70711 17.2929L12 19.5858L14.2929 17.2929C14.4804 17.1054 14.7348 17 15 17H20V6Z" fill="#0D0D0D"></path>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M13.5 11.5C13.5 12.3284 12.8284 13 12 13C11.1716 13 10.5 12.3284 10.5 11.5C10.5 10.6716 11.1716 10 12 10C12.8284 10 13.5 10.6716 13.5 11.5Z" fill="#0D0D0D"></path>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M17.5 11.5C17.5 12.3284 16.8284 13 16 13C15.1716 13 14.5 12.3284 14.5 11.5C14.5 10.6716 15.1716 10 16 10C16.8284 10 17.5 10.6716 17.5 11.5Z" fill="#0D0D0D"></path>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M9.5 11.5C9.5 12.3284 8.82843 13 8 13C7.17157 13 6.5 12.3284 6.5 11.5C6.5 10.6716 7.17157 10 8 10C8.82843 10 9.5 10.6716 9.5 11.5Z" fill="#0D0D0D"></path>
                                </svg>
                            </ThemedElement>
                            {/if}
                        </button>
                        <p slot="tooltip">{commentsVisible ? "Hide" : "Show"} Comments</p>
                    </Tooltip>
                </li>
                <li>
                    <LayoutToggle/>
                </li>
                <li>
                    <Tooltip>
                        <button slot="content" on:click={ () => settingsShown = true }>
                            <ThemedElement>
                                <svg slot="dark" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M9 5C8.44772 5 8 5.44772 8 6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5ZM6.17071 5C6.58254 3.83481 7.69378 3 9 3C10.3062 3 11.4175 3.83481 11.8293 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H11.8293C11.4175 8.16519 10.3062 9 9 9C7.69378 9 6.58254 8.16519 6.17071 7H5C4.44772 7 4 6.55228 4 6C4 5.44772 4.44772 5 5 5H6.17071ZM15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H12.1707ZM9 17C8.44772 17 8 17.4477 8 18C8 18.5523 8.44772 19 9 19C9.55228 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17ZM6.17071 17C6.58254 15.8348 7.69378 15 9 15C10.3062 15 11.4175 15.8348 11.8293 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H11.8293C11.4175 20.1652 10.3062 21 9 21C7.69378 21 6.58254 20.1652 6.17071 19H5C4.44772 19 4 18.5523 4 18C4 17.4477 4.44772 17 5 17H6.17071Z" fill="#fff"></path>
                                </svg>
                                <svg slot="light" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M9 5C8.44772 5 8 5.44772 8 6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5ZM6.17071 5C6.58254 3.83481 7.69378 3 9 3C10.3062 3 11.4175 3.83481 11.8293 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H11.8293C11.4175 8.16519 10.3062 9 9 9C7.69378 9 6.58254 8.16519 6.17071 7H5C4.44772 7 4 6.55228 4 6C4 5.44772 4.44772 5 5 5H6.17071ZM15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H12.1707ZM9 17C8.44772 17 8 17.4477 8 18C8 18.5523 8.44772 19 9 19C9.55228 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17ZM6.17071 17C6.58254 15.8348 7.69378 15 9 15C10.3062 15 11.4175 15.8348 11.8293 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H11.8293C11.4175 20.1652 10.3062 21 9 21C7.69378 21 6.58254 20.1652 6.17071 19H5C4.44772 19 4 18.5523 4 18C4 17.4477 4.44772 17 5 17H6.17071Z" fill="#0D0D0D"></path>
                                </svg>
                            </ThemedElement>
                        </button>
                        <p slot="tooltip">Board Settings</p>
                    </Tooltip>
                </li>
                <li>
                    <MoreBtn/>
                </li>
            </ul>
        </div>
    </div>
</MenuBar>

<style lang="postcss">
    #menubar {
        z-index: 1;
        overflow: visible;
        min-height: var(--toolbar-height);
    }
    #settingsOverlay {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
        margin-top: var(--titlebar-height);
        @apply bg-white border-b-2 border-neutral-200;
    }
    #settingsOverlay.dark {
        @apply bg-black text-white border-b-2 border-neutral-800;
    }
</style>