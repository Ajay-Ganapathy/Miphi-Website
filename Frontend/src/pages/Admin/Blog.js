// import React from 'react'


// const Blog = () => {
//   return (
//     <div>
//         <svg xmlns="http://www.w3.org/2000/svg" style={{"display" : "none" }}>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="navbar-icon" viewBox="0 0 16 16">
//         <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="facebook" viewBox="0 0 24 24">
//         <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="youtube" viewBox="0 0 32 32">
//         <path fill="currentColor" d="M29.41 9.26a3.5 3.5 0 0 0-2.47-2.47C24.76 6.2 16 6.2 16 6.2s-8.76 0-10.94.59a3.5 3.5 0 0 0-2.47 2.47A36.13 36.13 0 0 0 2 16a36.13 36.13 0 0 0 .59 6.74a3.5 3.5 0 0 0 2.47 2.47c2.18.59 10.94.59 10.94.59s8.76 0 10.94-.59a3.5 3.5 0 0 0 2.47-2.47A36.13 36.13 0 0 0 30 16a36.13 36.13 0 0 0-.59-6.74ZM13.2 20.2v-8.4l7.27 4.2Z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="instagram" viewBox="0 0 256 256">
//         <path fill="currentColor" d="M128 80a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32Zm48-136H80a56.06 56.06 0 0 0-56 56v96a56.06 56.06 0 0 0 56 56h96a56.06 56.06 0 0 0 56-56V80a56.06 56.06 0 0 0-56-56Zm40 152a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40V80a40 40 0 0 1 40-40h96a40 40 0 0 1 40 40ZM192 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="twitter" viewBox="0 0 24 24">
//         <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="linkedin" viewBox="0 0 512 512">
//         <path fill="currentColor" d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32Zm-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43Zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="arrow-down" viewBox="0 0 32 32">
//         <path fill="currentColor" d="M24.59 16.59L17 24.17V4h-2v20.17l-7.59-7.58L6 18l10 10l10-10l-1.41-1.41z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="cart" viewBox="0 0 512 512">
//         <path fill="currentColor" d="M160 96.039v32h304v63.345l-35.5 112.655H149.932L109.932 16H16v32h66.068l40 288.039h329.9L496 196.306V96.039H160zm16.984 272.305a64.073 64.073 0 0 0-64 64a64 64 0 0 0 128 0a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.038 32.038 0 0 1-32 32Zm224-96a64.073 64.073 0 0 0-64 64a64 64 0 0 0 128 0a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.038 32.038 0 0 1-32 32Z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="balloon" viewBox="0 0 24 24">
//         <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
//           <path d="M8 16.607c1.15.86 2.518 1.38 4 1.393c4.142.034 7.594-3.92 7.56-8.196C19.527 5.53 16.142 2.034 12 2c-4.142-.034-7.473 3.404-7.44 7.68A8.88 8.88 0 0 0 5.244 13" />
//           <path d="M15.5 9a3.035 3.035 0 0 0-3-3M12 20.35c.321 0 .482 0 .593-.022c.654-.128 1.051-.772.858-1.39c-.033-.105-.109-.242-.261-.515M12 20.35c-.321 0-.482 0-.593-.022c-.654-.128-1.051-.772-.858-1.39c.033-.105.109-.242.261-.515M12 20.35v2.15" />
//         </g>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="bag-heart" viewBox="0 0 24 24">
//         <g fill="none">
//           <path fill="currentColor" d="m12 12.191l-.519.542a.75.75 0 0 0 1.038 0L12 12.191Zm-.957 3.675l-.444.604l.444-.604Zm1.914 0l-.444-.605l.444.605Zm-.957.462v.75v-.75Zm-.514-1.067c-.417-.307-.878-.69-1.227-1.093c-.368-.426-.509-.757-.509-.971h-1.5c0 .77.441 1.45.875 1.952c.453.525 1.014.984 1.474 1.321l.887-1.21ZM9.75 13.197c0-.576.263-.827.492-.907c.25-.088.714-.06 1.24.443l1.037-1.083c-.825-.79-1.861-1.096-2.773-.776c-.934.327-1.496 1.226-1.496 2.323h1.5Zm3.65 3.273c.46-.337 1.022-.796 1.475-1.32c.434-.502.875-1.183.875-1.953h-1.5c0 .214-.141.545-.51.971c-.348.403-.809.786-1.226 1.093l.887 1.21Zm2.35-3.273c0-1.097-.563-1.996-1.496-2.323c-.912-.32-1.948-.014-2.773.776l1.038 1.083c.525-.503.989-.531 1.24-.443c.228.08.491.33.491.907h1.5ZM10.6 16.47c.368.27.782.608 1.4.608v-1.5c-.024 0-.04 0-.094-.03a4 4 0 0 1-.42-.287l-.887 1.21Zm1.914-1.21a4 4 0 0 1-.42.289c-.054.029-.07.029-.094.029v1.5c.618 0 1.032-.337 1.4-.608l-.886-1.21Z" />
//           <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M9 6V5a3 3 0 1 1 6 0v1m5.224 6.526c-.586-3.121-.878-4.682-1.99-5.604C17.125 6 15.537 6 12.36 6h-.72c-3.176 0-4.764 0-5.875.922c-1.11.922-1.403 2.483-1.989 5.604c-.823 4.389-1.234 6.583-.034 8.029C4.942 22 7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445c.696-.84.85-1.93.696-3.555" />
//         </g>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="handiplast" viewBox="0 0 24 24">
//         <g fill="none">
//           <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M13.5 7.642L9.071 3.213a4.142 4.142 0 0 0-5.858 5.858L14.93 20.787a4.142 4.142 0 0 0 5.858-5.858l-4.358-4.358" />
//           <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m12 17.858l-2.929 2.929A4.142 4.142 0 0 1 2.596 20m3.546-8l-2.929 2.929c-.322.322-.58.685-.774 1.071M12 6.142l2.929-2.929a4.142 4.142 0 1 1 5.858 5.858L17.857 12" />
//           <path fill="currentColor" d="M15.841 12.871a.788.788 0 1 1-1.114 1.114a.788.788 0 0 1 1.114-1.114Zm-3.712-3.712a.787.787 0 1 0-1.114 1.114a.787.787 0 0 0 1.114-1.114Zm4.641 6.497a.787.787 0 1 1-1.114 1.114a.787.787 0 0 1 1.114-1.114ZM9.345 8.23A.788.788 0 1 0 8.23 9.346A.788.788 0 0 0 9.345 8.23Zm3.712 3.713a.787.787 0 1 1-1.113 1.114a.787.787 0 0 1 1.113-1.114Zm.928 2.785a.788.788 0 1 1-1.114 1.113a.788.788 0 0 1 1.114-1.113Zm-3.712-3.713a.787.787 0 1 0-1.114 1.114a.787.787 0 0 0 1.114-1.114Z" />
//         </g>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="thumb" viewBox="0 0 70 69" fill="none">
//         <path fill-rule="evenodd" clip-rule="evenodd" d="M36.2595 7.98735C35.844 7.85482 35.3937 7.88567 35.0002 8.0736C34.8052 8.16386 34.6322 8.29548 34.4932 8.45931C34.3542 8.62314 34.2525 8.81527 34.1952 9.02235L32.8267 14.2951C32.3487 16.1379 31.6538 17.9174 30.7567 19.5966C29.3624 22.2042 27.255 24.2081 25.3 25.8928L21.1657 29.4578C20.8495 29.7306 20.6025 30.0746 20.445 30.4615C20.2876 30.8483 20.2242 31.267 20.2601 31.6831L22.5946 58.688C22.6514 59.3439 22.9518 59.9547 23.4366 60.4001C23.9213 60.8455 24.5554 61.0932 25.2137 61.0943H38.5796C47.5956 61.0943 55.1942 54.8211 56.6519 46.3945L58.6787 34.6645C58.7445 34.2865 58.7269 33.8986 58.6271 33.5281C58.5273 33.1577 58.3477 32.8134 58.101 32.5196C57.8542 32.2258 57.5463 31.9894 57.1986 31.827C56.851 31.6646 56.472 31.5802 56.0883 31.5796H41.193C38.3841 31.5796 36.248 29.0611 36.7022 26.2896L38.6084 14.6631C38.8695 13.0706 38.795 11.4411 38.3898 9.8791C38.2755 9.46558 38.0584 9.08769 37.7589 8.78056C37.4593 8.47344 37.0869 8.24706 36.6763 8.12247L36.2595 7.98735ZM33.1257 4.18947C34.5161 3.5206 36.11 3.4105 37.5791 3.88185L37.996 4.01697C40.2299 4.73572 41.9721 6.51822 42.5644 8.79522C43.1192 10.94 43.2227 13.1767 42.8633 15.3617L40.9572 26.9882C40.9514 27.0225 40.9531 27.0577 40.9622 27.0912C40.9714 27.1248 40.9877 27.156 41.0102 27.1825C41.0327 27.2091 41.0607 27.2304 41.0922 27.245C41.1238 27.2596 41.1582 27.2672 41.193 27.2671H56.0855C60.398 27.2671 63.664 31.1541 62.928 35.4005L60.9011 47.1305C59.0669 57.7335 49.5793 65.4068 38.5796 65.4068H25.2137C23.4761 65.4054 21.8021 64.7527 20.522 63.5775C19.242 62.4023 18.4489 60.7901 18.2993 59.0588L15.962 32.054C15.8669 30.9573 16.0337 29.8537 16.4486 28.834C16.8634 27.8144 17.5145 26.9078 18.3482 26.189L22.4882 22.624C24.3713 21.0025 25.9555 19.4298 26.9502 17.564C27.6888 16.186 28.2602 14.7247 28.6522 13.2112L30.0207 7.94135C30.2347 7.128 30.6234 6.37103 31.1596 5.7231C31.6958 5.07516 32.3667 4.55182 33.1257 4.18947ZM9.03322 27.27C9.58885 27.2457 10.1324 27.437 10.5502 27.804C10.9681 28.171 11.2281 28.6852 11.2757 29.2393L14.0645 61.5428C14.1117 62.0239 14.0604 62.5095 13.9137 62.9701C13.7669 63.4306 13.5278 63.8564 13.211 64.2215C12.8942 64.5865 12.5063 64.8832 12.071 65.0933C11.6356 65.3034 11.1621 65.4225 10.6792 65.4435C10.1963 65.4644 9.71415 65.3867 9.26229 65.215C8.81043 65.0434 8.39829 64.7814 8.05106 64.4452C7.70383 64.1089 7.4288 63.7054 7.24275 63.2593C7.0567 62.8132 6.96354 62.3338 6.96897 61.8505V29.4233C6.96847 28.8671 7.18297 28.3321 7.56766 27.9303C7.95235 27.5284 8.47745 27.2937 9.03322 27.27Z" fill="#0A74F1"/>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="lock" viewBox="0 0 70 69" fill="none">
//         <path d="M35 51.75C38.1756 51.75 40.75 49.1756 40.75 46C40.75 42.8244 38.1756 40.25 35 40.25C31.8244 40.25 29.25 42.8244 29.25 46C29.25 49.1756 31.8244 51.75 35 51.75Z" stroke="#0A74F1" stroke-width="4"/>
//         <path d="M17.75 28.7491V22.9991C17.75 22.0216 17.8305 21.0585 17.9886 20.1241M52.25 28.7491V22.9991C52.2502 19.4952 51.1834 16.0743 49.1914 13.1916C47.1995 10.309 44.3769 8.10127 41.0993 6.86234C37.8217 5.62341 34.2445 5.412 30.8438 6.25623C27.4431 7.10046 24.3801 8.9603 22.0625 11.5882M32.125 63.2491H23.5C15.3695 63.2491 11.3014 63.2491 8.77712 60.722C6.25 58.1977 6.25 54.1296 6.25 45.9991C6.25 37.8686 6.25 33.8005 8.77712 31.2762C11.3014 28.7491 15.3695 28.7491 23.5 28.7491H46.5C54.6305 28.7491 58.6986 28.7491 61.2229 31.2762C63.75 33.8005 63.75 37.8686 63.75 45.9991C63.75 54.1296 63.75 58.1977 61.2229 60.722C58.6986 63.2491 54.6305 63.2491 46.5 63.2491H43.625" stroke="#0A74F1" stroke-width="4" stroke-linecap="round"/>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="star-stick" viewBox="0 0 70 69" fill="none">
//         <path d="M52.0279 23.0003C52.071 23.5926 52.1659 24.0583 52.3499 24.4953C52.7409 25.4153 53.4912 26.1025 54.992 27.4767L56.3576 28.7273C61.639 33.566 64.2811 35.9838 63.6601 38.7036C63.042 41.4176 59.5719 42.6308 52.6345 45.0631L50.8405 45.6898C48.8682 46.3798 47.885 46.7248 47.1289 47.4177C46.3699 48.1077 45.93 49.0708 45.0474 50.9913L44.2424 52.7422C41.1402 59.5013 39.5877 62.8823 36.868 63.2245C34.1454 63.5637 32.0581 60.6398 27.8836 54.7892L26.8026 53.277C25.6152 51.6152 25.0201 50.7843 24.1662 50.2927C23.3095 49.804 22.286 49.7091 20.2419 49.5222L18.3789 49.3497C11.177 48.6942 7.57748 48.3636 6.5166 45.8595C5.45285 43.3525 7.6321 40.3308 11.9877 34.2847L13.1147 32.7207C14.351 31.0043 14.972 30.1447 15.1991 29.15C15.4262 28.1552 15.2336 27.1375 14.8541 25.0991L14.5033 23.2447C13.1578 16.0773 12.4851 12.4922 14.5494 10.6033C16.6136 8.71446 20.0492 9.76958 26.9176 11.8827L28.6944 12.429C30.6436 13.0327 31.6211 13.3317 32.6187 13.2052C33.6135 13.0816 34.5191 12.544 36.3275 11.4745L37.9777 10.497C44.3459 6.72784 47.5285 4.84184 49.8687 6.17871C51.2832 6.98946 51.8237 8.65408 51.9991 11.4745" stroke="#0A74F1" stroke-width="4" stroke-linecap="round"/>
//         <path d="M50.8978 47.3523C50.7004 47.1404 50.4624 46.9705 50.1979 46.8527C49.9334 46.7348 49.6479 46.6715 49.3583 46.6664C49.0688 46.6612 48.7812 46.7145 48.5128 46.8229C48.2443 46.9314 48.0004 47.0928 47.7956 47.2976C47.5909 47.5023 47.4294 47.7462 47.321 48.0147C47.2125 48.2832 47.1593 48.5708 47.1644 48.8603C47.1695 49.1498 47.2329 49.4354 47.3507 49.6998C47.4686 49.9643 47.6385 50.2024 47.8503 50.3998L50.8978 47.3523ZM59.3503 61.8998C59.5477 62.1117 59.7858 62.2816 60.0503 62.3994C60.3148 62.5173 60.6003 62.5806 60.8898 62.5857C61.1794 62.5909 61.4669 62.5376 61.7354 62.4292C62.0039 62.3207 62.2478 62.1593 62.4526 61.9545C62.6573 61.7498 62.8188 61.5059 62.9272 61.2374C63.0356 60.9689 63.0889 60.6813 63.0838 60.3918C63.0787 60.1023 63.0153 59.8167 62.8975 59.5523C62.7796 59.2878 62.6097 59.0497 62.3978 58.8523L59.3503 61.8998ZM47.8503 50.3998L59.3503 61.8998L62.3978 58.8523L50.8978 47.3523L47.8503 50.3998Z" fill="#0A74F1"/>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="star-fill" viewBox="0 0 16 16">
//         <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="star-empty" viewBox="0 0 16 16">
//         <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="play" viewBox="0 0 32 32">
//         <path fill="currentColor" d="M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28ZM8 6.69v18.62L24.925 16Z" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="call-chat" viewBox="0 0 24 24">
//         <path fill="currentColor" fill-rule="evenodd" d="M17 2.75a4.25 4.25 0 0 0-3.807 6.142c.16.32.225.71.12 1.102l-.253.946l.946-.253a1.567 1.567 0 0 1 1.102.12A4.25 4.25 0 1 0 17 2.75ZM11.25 7a5.75 5.75 0 1 1 3.19 5.15a.126.126 0 0 0-.04-.013h-.007l-1.112.297a1.4 1.4 0 0 1-1.715-1.714l.298-1.113V9.6a.126.126 0 0 0-.014-.04a5.73 5.73 0 0 1-.6-2.56ZM3.718 4.092c1.226-1.29 3.254-1.049 4.268.385l1.26 1.783c.811 1.147.743 2.74-.225 3.76l-.245.257c0 .002 0 .004-.002.006c-.013.037-.045.152-.013.372c.067.456.418 1.381 1.846 2.884c1.432 1.508 2.3 1.864 2.703 1.929a.608.608 0 0 0 .294-.007l.408-.43c.874-.92 2.236-1.101 3.335-.469l1.91 1.1c1.633.94 2.013 3.239.708 4.613l-1.42 1.495c-.443.467-1.048.866-1.795.94c-1.824.18-6.049-.055-10.478-4.718c-4.134-4.352-4.919-8.137-5.018-9.986c-.049-.914.358-1.697.894-2.261l.544.516l-.544-.516l1.57-1.653Zm3.043 1.25c-.512-.724-1.433-.767-1.956-.217l-1.57 1.653c-.33.349-.505.748-.483 1.148c.08 1.51.731 4.952 4.607 9.033c4.064 4.279 7.809 4.4 9.244 4.258c.283-.028.575-.186.854-.48l1.42-1.495c.614-.645.453-1.808-.368-2.28l-1.91-1.1c-.513-.295-1.114-.204-1.499.202l-.455.48l-.544-.517c.543.517.543.517.542.518l-.001.002l-.003.003l-.007.006l-.014.014a1.003 1.003 0 0 1-.136.112c-.08.057-.186.12-.321.172c-.276.11-.64.168-1.091.095c-.878-.143-2.028-.773-3.55-2.377c-1.528-1.608-2.113-2.807-2.243-3.7c-.067-.454-.014-.817.084-1.092a1.592 1.592 0 0 1 .23-.427l.03-.037l.014-.015l.006-.006l.003-.003l.002-.002s.001-.001.545.515l-.544-.516l.287-.302c.445-.47.51-1.264.088-1.86L6.76 5.342Z" clip-rule="evenodd" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="mail" viewBox="0 0 21 21">
//         <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
//           <path d="M3.5 6.5v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-10a2 2 0 0 0-2 2z" />
//           <path d="m5.5 7.5l5 3l5-3" />
//         </g>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="location" viewBox="0 0 24 24">
//         <path fill="currentColor" fill-rule="evenodd" d="M5.25 7.7c0-3.598 3.059-6.45 6.75-6.45c3.608 0 6.612 2.725 6.745 6.208l.478.16c.463.153.87.289 1.191.439c.348.162.667.37.911.709c.244.338.341.707.385 1.088c.04.353.04.78.04 1.269v5.748c0 .61 0 1.13-.047 1.547c-.05.438-.161.87-.463 1.237a2.25 2.25 0 0 1-.62.525c-.412.237-.855.276-1.296.253c-.42-.022-.933-.107-1.534-.208l-.041-.007c-1.293-.215-1.814-.296-2.322-.254a4.3 4.3 0 0 0-.552.083c-.498.109-.976.342-2.159.933l-.122.061c-1.383.692-2.234 1.118-3.154 1.251c-.276.04-.555.06-.835.06c-.928-.002-1.825-.301-3.28-.786a73.75 73.75 0 0 1-.127-.043l-.384-.128l-.037-.012c-.463-.154-.87-.29-1.191-.44c-.348-.162-.667-.37-.911-.709c-.244-.338-.341-.707-.385-1.088c-.04-.353-.04-.78-.04-1.269v-5.02c0-.786 0-1.448.067-1.967c.07-.542.23-1.072.666-1.47a2.25 2.25 0 0 1 .42-.304c.517-.287 1.07-.27 1.605-.166c.11.021.223.047.342.078c-.066-.446-.1-.89-.1-1.328Zm.499 3.01a9.414 9.414 0 0 0-1.028-.288c-.395-.077-.525-.03-.586.004a.747.747 0 0 0-.14.101c-.053.048-.138.156-.19.556c-.053.41-.055.974-.055 1.825v4.93c0 .539.001.88.03 1.138c.028.238.072.327.112.381c.039.055.109.125.326.226c.236.11.56.219 1.07.39l.384.127c1.624.541 2.279.75 2.936.752c.207 0 .413-.015.617-.044c.65-.094 1.276-.397 2.82-1.17l.093-.046c1.06-.53 1.714-.857 2.417-1.01c.246-.054.496-.092.747-.113c.717-.06 1.432.06 2.593.253l.1.017c.655.109 1.083.18 1.407.196c.312.016.419-.025.471-.055a.749.749 0 0 0 .207-.175c.039-.047.097-.146.132-.456c.037-.323.038-.757.038-1.42v-5.667c0-.539-.001-.88-.03-1.138c-.028-.238-.072-.327-.112-.381c-.039-.055-.109-.125-.326-.226c-.236-.11-.56-.219-1.07-.39l-.06-.019a10.701 10.701 0 0 1-1.335 3.788c-.912 1.568-2.247 2.934-3.92 3.663a3.505 3.505 0 0 1-2.794 0c-1.673-.73-3.008-2.095-3.92-3.663a10.856 10.856 0 0 1-.934-2.087ZM12 2.75c-2.936 0-5.25 2.252-5.25 4.95c0 1.418.437 2.98 1.23 4.341c.791 1.362 1.908 2.47 3.223 3.044c.505.22 1.089.22 1.594 0c1.316-.574 2.432-1.682 3.224-3.044c.792-1.36 1.229-2.923 1.229-4.34c0-2.699-2.314-4.951-5.25-4.951Zm0 4a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5ZM9.25 8a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0Z" clip-rule="evenodd" />
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="search" viewBox="0 0 22 21" fill="none">
//         <path d="M19.6234 17.2836L15.5805 13.4244C16.5538 12.1875 17.0793 10.682 17.0775 9.135C17.0775 5.18355 13.7096 1.96875 9.57 1.96875C5.43039 1.96875 2.0625 5.18355 2.0625 9.135C2.0625 13.0864 5.43039 16.3013 9.57 16.3013C11.1906 16.3029 12.7679 15.8014 14.0637 14.8723L18.1066 18.7314C18.3113 18.9061 18.5782 18.9993 18.8526 18.9919C19.127 18.9846 19.388 18.8773 19.5821 18.692C19.7762 18.5067 19.8886 18.2576 19.8963 17.9956C19.904 17.7337 19.8063 17.4789 19.6234 17.2836ZM4.2075 9.135C4.2075 8.12261 4.52201 7.13295 5.11124 6.29118C5.70048 5.4494 6.53799 4.79332 7.51786 4.40589C8.49773 4.01847 9.57595 3.9171 10.6162 4.11461C11.6564 4.31211 12.6119 4.79963 13.3619 5.5155C14.1118 6.23137 14.6225 7.14344 14.8295 8.13638C15.0364 9.12932 14.9302 10.1585 14.5243 11.0939C14.1184 12.0292 13.4311 12.8286 12.5492 13.3911C11.6674 13.9535 10.6306 14.2537 9.57 14.2537C8.1483 14.2521 6.78532 13.7123 5.78002 12.7527C4.77473 11.7931 4.20921 10.4921 4.2075 9.135Z" fill="white"/>
//       </symbol>
//       <symbol xmlns="http://www.w3.org/2000/svg" id="folder" viewBox="0 0 18 18" fill="none">
// 				<path
// 					d="M14.0946 4.04689H9.56953L9.33895 3.3259C9.18947 2.90285 8.9122 2.53678 8.54555 2.27842C8.1789 2.02006 7.74102 1.8822 7.29258 1.88393H4.00687C3.43356 1.88393 2.88374 2.11181 2.47835 2.51744C2.07296 2.92308 1.84521 3.47324 1.84521 4.04689V13.4197C1.84521 13.9934 2.07296 14.5435 2.47835 14.9492C2.88374 15.3548 3.43356 15.5827 4.00687 15.5827H14.0946C14.6679 15.5827 15.2177 15.3548 15.6231 14.9492C16.0285 14.5435 16.2562 13.9934 16.2562 13.4197V6.20985C16.2562 5.6362 16.0285 5.08604 15.6231 4.68041C15.2177 4.27477 14.6679 4.04689 14.0946 4.04689ZM14.8151 13.4197C14.8151 13.6109 14.7392 13.7943 14.6041 13.9295C14.469 14.0648 14.2857 14.1407 14.0946 14.1407H4.00687C3.81577 14.1407 3.63249 14.0648 3.49736 13.9295C3.36223 13.7943 3.28632 13.6109 3.28632 13.4197V4.04689C3.28632 3.85567 3.36223 3.67229 3.49736 3.53707C3.63249 3.40186 3.81577 3.3259 4.00687 3.3259H7.29258C7.44364 3.32551 7.591 3.37264 7.71384 3.46061C7.83667 3.54859 7.92877 3.67297 7.97711 3.81617L8.3662 4.99859C8.41454 5.1418 8.50664 5.26618 8.62947 5.35415C8.75231 5.44213 8.89967 5.48925 9.05073 5.48886H14.0946C14.2857 5.48886 14.469 5.56483 14.6041 5.70004C14.7392 5.83525 14.8151 6.01863 14.8151 6.20985V13.4197Z"
// 					fill="black" />
// 			</symbol>
// 			<symbol xmlns="http://www.w3.org/2000/svg" id="clock" viewBox="0 0 18 18" fill="none">
// 				<path
// 					d="M11.0931 9.19042L9.58134 8.3173V5.12838C9.58134 4.93716 9.50543 4.75377 9.3703 4.61856C9.23517 4.48335 9.05189 4.40739 8.86079 4.40739C8.66969 4.40739 8.48641 4.48335 8.35128 4.61856C8.21615 4.75377 8.14024 4.93716 8.14024 5.12838V8.73331C8.14024 8.85987 8.17354 8.9842 8.23678 9.0938C8.30002 9.2034 8.39098 9.29441 8.50051 9.35769L10.3725 10.4392C10.4545 10.4873 10.5452 10.5186 10.6393 10.5315C10.7335 10.5444 10.8292 10.5385 10.9211 10.5142C11.013 10.4899 11.0991 10.4477 11.1746 10.3899C11.2501 10.3322 11.3134 10.26 11.3609 10.1777C11.4084 10.0953 11.4392 10.0044 11.4515 9.91012C11.4637 9.81583 11.4572 9.72004 11.4323 9.62828C11.4074 9.53652 11.3646 9.45059 11.3064 9.37544C11.2482 9.3003 11.1757 9.23741 11.0931 9.19042ZM8.86079 1.52344C7.43567 1.52344 6.04256 1.94629 4.85762 2.73852C3.67268 3.53075 2.74913 4.65678 2.20376 5.97421C1.6584 7.29165 1.5157 8.74131 1.79373 10.1399C2.07175 11.5385 2.75801 12.8231 3.76572 13.8315C4.77343 14.8398 6.05733 15.5265 7.45506 15.8047C8.8528 16.0828 10.3016 15.9401 11.6182 15.3944C12.9349 14.8487 14.0602 13.9246 14.852 12.7389C15.6437 11.5532 16.0663 10.1593 16.0663 8.73331C16.0642 6.82178 15.3044 4.98914 13.9535 3.63748C12.6027 2.28582 10.7712 1.52554 8.86079 1.52344ZM8.86079 14.5012C7.7207 14.5012 6.60621 14.1629 5.65826 13.5291C4.7103 12.8954 3.97146 11.9945 3.53517 10.9406C3.09887 9.88665 2.98472 8.72691 3.20714 7.60805C3.42956 6.48919 3.97857 5.46145 4.78474 4.65479C5.5909 3.84814 6.61802 3.2988 7.73621 3.07624C8.8544 2.85369 10.0134 2.96791 11.0667 3.40447C12.12 3.84103 13.0203 4.58031 13.6537 5.52884C14.2871 6.47737 14.6252 7.59253 14.6252 8.73331C14.6233 10.2625 14.0154 11.7284 12.9347 12.8097C11.8541 13.891 10.389 14.4993 8.86079 14.5012Z"
// 					fill="black" />
// 			</symbol>
//     </svg>

//     <header id="header" class="site-header position-fixed z-2 w-100 border-bottom mb-5" style={{"--bs-border-opacity ": .5}} data-text-color="dark">
//       <nav id="header-nav" class="navbar navbar-expand-lg py-3">
//         <div class="container-lg">
//           <a class="navbar-brand pb-4" href="index.html">
//             <img src="images/main-logo-light.png" class="logo-light" />
//             <img src="images/main-logo.png" class="logo-dark" />
//           </a>
//           <button class="navbar-toggler d-flex d-lg-none order-3 p-2 border-0 shadow-none bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
//             <svg class="navbar-icon" width="50" height="50">
//               {/* <use xlink:href="#navbar-icon"></use> */}
//             </svg>
//           </button>
//           <div class="offcanvas offcanvas-end" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel">
//             <div class="offcanvas-header px-4 pb-0">
//               <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"></button>
//             </div>
//             <div class="offcanvas-body">
//               <ul class="navbar-nav scrollspy-nav justify-content-end flex-grow-1 gap-lg-5 pe-3">
//                 <li class="nav-item dropdown">
//                   <a class="nav-link active dropdown-toggle" href="#intro" id="dropdownHome" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</a>
//                   <div class="dropdown-menu" aria-labelledby="dropdownHome">
//                     <a class="dropdown-item" href="home-v1.html">Home V1</a>
//                     <a class="dropdown-item" href="home-v2.html">Home V2 <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="home-v3.html">Home V3 <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="home-v4.html">Home V4 <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="home-v5.html">Home V5 <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="home-v6.html">Home V6 <span class="badge bg-primary">PRO</span></a>
//                   </div>
//                 </li>
//                 <li class="nav-item dropdown">
//                   <a class="nav-link active dropdown-toggle" href="#" id="dropdownPages" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
//                   <div class="dropdown-menu" aria-labelledby="dropdownPages">
//                     <a class="dropdown-item" href="blog.html">Blog <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="single.html">Blog Single <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="faqs.html">FAQs <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="coming-soon.html">Coming Soon <span class="badge bg-primary">PRO</span></a>
//                     <a class="dropdown-item" href="404.html">404 Error <span class="badge bg-primary">PRO</span></a>
//                   </div>
//                 </li>
//                 <li class="scrollspy-link nav-item">
//                   <a class="nav-link" data-target="services" href="#services">About</a>
//                 </li>
//                 <li class="scrollspy-link nav-item">
//                   <a class="nav-link" data-target="testimonials" href="#testimonials">Reviews</a>
//                 </li>
//                 <li class="scrollspy-link nav-item">
//                   <a class="nav-link" data-target="why" href="#why">Why Us</a>
//                 </li>
//                 <li class="scrollspy-link nav-item">
//                   <a class="nav-link" data-target="overview" href="#overview">Features</a>
//                 </li>
//                 <li class="scrollspy-link nav-item">
//                   <a class="nav-link" data-target="products" href="#products">Products</a>
//                 </li>
//                 <span class="scrollspy-indicator"></span>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
    
//     <section id="intro" class="scrollspy-section bg-light" >
//       <div class="container-lg py-5">
//         <div class="row justify-content-center py-5">
//           <div class="col-lg-5 text-center">
//             <h1 class="display-2 fw-bold mt-5 pt-5">Blog Single</h1>
//             <nav class="breadcrumb justify-content-center">
//               <a class="breadcrumb-item" href="#">Home</a>
//               <a class="breadcrumb-item" href="#">Pages</a>
//               <span class="breadcrumb-item active" aria-current="page">Single</span>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </section>

//     <section class="py-lg-5 my-lg-5">
//       <div class="container-lg">

//         <section class="mt-5" data-aos="fade-up">
//           <div class="post-meta d-flex gap-3 my-4">
//             <span class="post-category">
//               <svg width="16" height="16" viewBox="0 0 24 24">
//                 {/* <use xlink:href="#folder"></use> */}
//               </svg>
//               Business </span>
//             <span class="meta-day">
//               <svg width="16" height="16" viewBox="0 0 24 24">
//                 {/* <use xlink:href="#clock"></use> */}
//               </svg>12-03-2021 </span>
//           </div>
//           <h1 class="display-4">Best rules to follow for achieving business goals</h1>
//           <img src="images/post-large.jpg" alt="single post" class="img-fluid my-4" />
//         </section>

//         <article class="post-item" data-aos="fade-up" data-aos-delay="100">

//           <div class="post-content py-5">
//             <div class="post-description">
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur facilisis
//                 vivamus massa magna. Blandit mauris libero condimentum commodo morbi consectetur
//                 sociis convallis sit. Magna diam amet justo sed vel dolor et volutpat integer.
//                 Iaculis sit sapien hac odio elementum egestas neque. Adipiscing purus euismod
//                 orci sem amet, et. Turpis erat ornare nisi laoreet est euismod.</p>
//               <p>Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor
//                 curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit
//                 imperdiet enim, lacus, vel. Morbi arcu amet, nulla fermentum vitae mattis arcu
//                 mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue
//                 ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget.
//                 Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt
//                 tellus sit ornare. Purus ut quis sed venenatis eget ut ipsum, enim lacus.
//                 Praesent imperdiet vitae eu, eu tincidunt nunc integer sit.</p>
//               <figure class="d-flex float-end m-md-5">
//                 <img src="images/insta-item-1.jpg" alt="post-image" class="img-fluid mb-4" />
//               </figure>
//               <blockquote>“Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum,
//                 amet dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut
//                 vivamus sit imperdiet enim, lacus, vel.</blockquote>
//               <h4>Consectetur Facilisis Vivamus</h4>
//               <ul class="inner-list">
//                 <li>Blandit mauris libero condimentum commodo sociis convallis sit.</li>
//                 <li>Magna diam amet justo sed vel dolor et volutpat integer.</li>
//                 <li>Laculis sit sapien hac odio elementum egestas neque.</li>
//               </ul>
//               <p>Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in
//                 sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras
//                 sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et
//                 pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus
//                 ut ipsum, enim lacus. Praesent imperdiet vitae eu, eu tincidunt nunc integer
//                 sit.</p>
//               <p>Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus
//                 fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum
//                 adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc
//                 integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat
//                 libero dolor. Porta ut diam lobortis eget leo, lectus. Nunc tempus feugiat massa
//                 laoreet ultrices diam magna quam. Congue auctor auctor luctus neque. Enim lorem
//                 ultrices diam donec. Sed id placerat consectetur faucibus.</p>
//               <h4>Velit, praesent pharetra malesuada</h4>
//               <p>Id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus.
//                 Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget
//                 ullamcorper urna, elit ac diam tellus viverra lacus.</p>
//               <p>Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus
//                 fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum
//                 adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc
//                 integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat
//                 libero dolor. Porta ut diam lobortis eget leo, lectus.</p>
//               <p>Velit, praesent pharetra malesuada id pulvinar amet. Consequat potenti mollis
//                 massa iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames
//                 sed eget non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra
//                 lacus.</p>
//               <p>Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus
//                 fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum
//                 adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc
//                 integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat
//                 libero dolor. Porta ut diam lobortis eget leo, lectus.</p>
//               <div class="post-bottom-link d-flex flex-wrap justify-content-between">
//                 <div class="block-tag">
//                   <ul class="list-unstyled d-flex gap-2">
//                     <li>
//                       <a href="#" class="btn btn-light">Denim</a>
//                     </li>
//                     <li>
//                       <a href="#" class="btn btn-light">Trending</a>
//                     </li>
//                     <li>
//                       <a href="#" class="btn btn-light">Clothing</a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div class="block-social-links d-flex align-items-baseline">
//                   <div class="element-title text-uppercase">Share:</div>
//                   <ul class="list-unstyled d-flex gap-2 ps-3">
//                     <li>
//                       <a href="#">
//                         <svg class="facebook svg-gray" width="25" height="25">
//                           {/* <use xlink:href="#facebook"></use> */}
//                         </svg>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <svg class="twitter svg-gray" width="25" height="25">
//                           {/* <use xlink:href="#twitter"></use> */}
//                         </svg>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <svg class="instagram svg-gray" width="25" height="25">
//                           {/* <use xlink:href="#instagram"></use> */}
//                         </svg>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <svg class="linkedin svg-gray" width="25" height="25">
//                           {/* <use xlink:href="#linkedin"></use> */}
//                         </svg>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div id="single-post-navigation" class="mt-5">
//               <div class="post-navigation d-flex justify-content-between">
//                 <a itemprop="url" class="post-prev" href="#">
//                   <span class="text-muted">Previous</span>
//                   <h4 class="page-nav-title">Top 10 fashion trend for summer</h4>
//                 </a>
//                 <a itemprop="url" class="post-next text-end" href="#">
//                   <span class="text-muted">Next</span>
//                   <h4 class="page-nav-title">Crazy fashion with unique moment</h4>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </article>

//         <div id="post-author-info" class="border-top border-bottom py-4">
//           <div class="row d-flex align-items-center">
//             <div class="col-lg-3">
//               <div class="image-holder">
//                 <a itemprop="url" href="#">
//                   <img src="images/author-image.jpg" class="img-fluid rounded-circle"
//                     alt="author" />
//                 </a>
//               </div>
//             </div>
//             <div class="col-lg-9">
//               <div class="post-author-content">
//                 <div class="element-title d-flex align-items-center gap-3">
//                   <h4><a itemprop="url" href="">Anna Younes</a></h4>
//                   <span class="author-position"><em>Fashion Designer</em></span>
//                 </div>
//                 <p>Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec,
//                   rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec
//                   pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget
//                   leo, lectus. Tortor diam dignissim amet, in interdum aliquet. Magnis dictum
//                   et eros purus fermentum, massa ullamcorper sit sollicitudin.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <section id="post-comment" class="mt-5">
//           <div class="container">
//             <div class="row">
//               <div class="comments-wrap">
//                 <h3 class="my-3">
//                   <span class="count">3</span> Comments
//                 </h3>
//                 <div class="comment-list">
//                   <article class="comment-item py-3 row border-bottom">
//                     <div class="col-lg-2">
//                       <img src="images/commentor-item1.jpg" alt="default"
//                         class="commentor-image rounded-circle img-fluid" />
//                     </div>
//                     <div class="col-lg-10">
//                       <div class="author-post">
//                         <div class="comment-meta d-flex gap-3">
//                           <h5 class="author-name">Lufy carlson</h5>
//                           <span class="meta-date">Jul 10</span>
//                         </div>
//                         <p>Tristique tempis condimentum diam done ullancomroer sit
//                           element henddg sit he consequert.Tristique tempis
//                           condimentum diam done ullancomroer sit element henddg sit he
//                           consequert.</p>
//                         <div class="comments-reply">
//                           <a href="#">Reply</a>
//                         </div>
//                       </div>
//                       <article class="comment-item pb-3 row child-comments">
//                         <div class="col-lg-2">
//                           <img src="images/commentor-item2.jpg" alt="default"
//                             class="commentor-image rounded-circle img-fluid" />
//                         </div>
//                         <div class="col-lg-10">
//                           <div class="author-post">
//                             <div class="comment-meta d-flex gap-3">
//                               <h5 class="author-name">Lora leigh</h5>
//                               <span class="meta-date">Jul 10</span>
//                             </div>
//                             <p>Tristique tempis condimentum diam done ullancomroer
//                               sit element henddg sit he consequert.Tristique
//                               tempis condimentum diam done ullancomroer sit
//                               element henddg sit he consequert.</p>
//                             <div class="comments-reply">
//                               <a href="#">Reply</a>
//                             </div>
//                           </div>
//                         </div>
//                       </article>
//                       <article class="comment-item pb-3 row child-comments">
//                         <div class="col-lg-2">
//                           <img src="images/commentor-item3.jpg" alt="default"
//                             class="commentor-image rounded-circle img-fluid" />
//                         </div>
//                         <div class="col-lg-10">
//                           <div class="author-post">
//                             <div class="comment-meta d-flex gap-3">
//                               <h5 class="author-name">Natalie dormer</h5>
//                               <span class="meta-date">Jul 10</span>
//                             </div>
//                             <p>Tristique tempis condimentum diam done ullancomroer
//                               sit element henddg sit he consequert.Tristique
//                               tempis condimentum diam done ullancomroer sit
//                               element henddg sit he consequert.</p>
//                             <div class="comments-reply">
//                               <a href="#">Reply</a>
//                             </div>
//                           </div>
//                         </div>
//                       </article>
//                     </div>
//                   </article>
//                   <article class="comment-item py-3 row border-bottom">
//                     <div class="col-lg-2">
//                       <img src="images/commentor-item2.jpg" alt="default"
//                         class="commentor-image rounded-circle img-fluid" />
//                     </div>
//                     <div class="col-lg-10">
//                       <div class="author-post">
//                         <div class="comment-meta d-flex gap-3">
//                           <h5 class="author-name">Lora leigh</h5>
//                           <span class="meta-date">Jul 10</span>
//                         </div>
//                         <p>Tristique tempis condimentum diam done ullancomroer sit
//                           element henddg sit he consequert.Tristique tempis
//                           condimentum diam done ullancomroer sit element henddg sit he
//                           consequert.</p>
//                         <div class="comments-reply">
//                           <a href="#">Reply</a>
//                         </div>
//                       </div>
//                     </div>
//                   </article>
//                   <article class="comment-item py-3 row">
//                     <div class="col-lg-2">
//                       <img src="images/commentor-item3.jpg" alt="default"
//                         class="commentor-image rounded-circle img-fluid" />
//                     </div>
//                     <div class="col-lg-10">
//                       <div class="author-post">
//                         <div class="comment-meta d-flex gap-3">
//                           <h5 class="author-name">Natalie dormer</h5>
//                           <span class="meta-date">Jul 10</span>
//                         </div>
//                         <p>Tristique tempis condimentum diam done ullancomroer sit
//                           element henddg sit he consequert.Tristique tempis
//                           condimentum diam done ullancomroer sit element henddg sit he
//                           consequert.</p>
//                         <div class="comments-reply">
//                           <a href="#">Reply</a>
//                         </div>
//                       </div>
//                     </div>
//                   </article>
//                 </div>
//               </div>
//               <div class="comment-respond mt-5">
//                 <h3>Leave a Comment</h3>
//                 <p>Your email address will not be published. Required fields are marked *</p>
//                 <form method="post" class="form-group padding-small">
//                   <div class="row">
//                     <div class="col-lg-12 mb-3">
//                       <textarea class="form-control ps-3 pt-3" id="comment" name="comment"
//                         placeholder="Write your comment here *"></textarea>
//                     </div>
//                     <div class="col-lg-6 mb-3">
//                       <input class="form-control ps-3" type="text" name="author"
//                         id="author" placeholder="Write your full name here *" />
//                     </div>
//                     <div class="col-lg-6">
//                       <input class="form-control ps-3" type="email" name="email"
//                         id="email" placeholder="Write your e-mail address *" />
//                     </div>
//                     <div class="col-lg-12">
//                       <label class="d-flex align-items-center">
//                         <input type="checkbox" class="checked-box me-2" />
//                         <span class="label-body">Save my name, email, and website in
//                           this browser for the next time.</span>
//                       </label>
//                     </div>
//                     <div class="col-lg-12 mt-3">
//                       <button
//                         class="btn btn-lg btn-primary text-uppercase btn-rounded-none w-100"
//                         type="submit">Post Comment</button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>

//       </div>
//     </section>
    
//     <section id="subscribe" class="py-5 bg-light">
//       <div class="container-lg">
//         <div class="row align-items-center justify-content-center my-5">
//           <div class="col-lg-6 col-md-8">
//             <div class="image-holder">
//               <img src="images/single-image-2.jpg" alt="subscribe" class="rounded-4 img-fluid" />
//             </div>
//           </div>
//           <div class="col-lg-6 col-md-8">
//             <div class="subscribe-content">
//               <div class="display-header">
//                 <h2 class="display-3 fw-medium">Subscribe To Our Newsletter</h2>
//                 <p class="fs-5">Subscribe to our newsletter for discounts and updates.</p>
//               </div>
//               <form id="form" class="position-relative mt-5">
//                 <input type="text" name="email" placeholder="Your Email Address.." class="w-100 p-3 ps-5 fs-5 rounded-pill border-gray" />
//                 <button type="button" class="btn btn-subscribe btn-lg btn-primary rounded-pill position-absolute">Subscribe</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <section id="contact-us" class="py-5 my-5">
//       <div class="container-lg">
//         <div class="row">
//           <div class="display-header mt-0 text-center mb-5">
//             <h2 class="display-3 fw-medium">Contact Us</h2>
//             <p class="fs-5">Contact us for more information.</p>
//           </div>
//           <div class="contact-content">
//             <div class="row my-5">
//               <div class="col-lg-6 mb-4">
//                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214586.9753714375!2d-96.89635992812694!3d32.82084512535899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647678f!2sDallas%2C%20TX%2C%20USA!5e0!3m2!1sen!2snp!4v1696935677426!5m2!1sen!2snp" height="450" style={{"border" :0}}allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-4 w-100"></iframe>
//               </div>
//               <div class="col-lg-6">
//                 <form class="needs-validation" novalidate="">
//                   <div class="row">
//                     <div class="col-md-6 mb-3">
//                       <input type="text" class="form-control rounded-3 p-3" id="firstName" placeholder="Full Name" value="" required="" />
//                       <div class="invalid-feedback"> Valid full name is required. </div>
//                     </div>
//                     <div class="col-md-6 mb-3">
//                       <input type="email" class="form-control rounded-3 p-3" id="email" placeholder="Email" />
//                       <div class="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
//                     </div>
//                     <div class="col-md-12 mb-3">
//                       <input type="email" class="form-control rounded-3 p-3" id="subject" placeholder="Subject" />
//                       <div class="invalid-feedback"> Please put a some words here. </div>
//                     </div>
//                     <div class="col-12 mb-3">
//                 <textarea type="message" class="form-control rounded-3 p-3" id="message" placeholder="Your message" style={{"height": "200px"}}></textarea>
//                       <div class="invalid-feedback"> Please put a some words here. </div>
//                     </div>
//                   </div>
//                   <button class="btn btn-primary btn-lg mt-3 rounded-pill text-uppercase" type="submit">Send Message</button>
//                 </form>
//               </div>
//             </div>
//             <div class="row">
//               <div class="col-lg-4 col-md-6">
//                 <div class="icon-box bg-light d-flex flex-wrap align-items-center justify-content-center border rounded-4 p-5 mb-3">
//                   <div class="icon-box-icon me-3">
//                     <svg class="call-chat svg-primary" width="80" height="80">
//                       {/* <use xlink:href="#call-chat" /> */}
//                     </svg>
//                   </div>
//                   <div class="icon-box-content">
//                     <p class="mb-0">123 456 7891</p>
//                     <p>123 456 7891</p>
//                   </div>
//                 </div>
//               </div>
//               <div class="col-lg-4 col-md-6">
//                 <div class="icon-box bg-light d-flex flex-wrap align-items-center justify-content-center border rounded-4 p-5 mb-3">
//                   <div class="icon-box-icon me-3">
//                     <svg class="mail svg-primary" width="80" height="80">
//                       {/* <use xlink:href="#mail" /> */}
//                     </svg>
//                   </div>
//                   <div class="icon-box-content">
//                     <p class="mb-0">youremail1@gmail.com</p>
//                     <p>youremail1@gmail.com</p>
//                   </div>
//                 </div>
//               </div>
//               <div class="col-lg-4 col-md-6">
//                 <div class="icon-box bg-light d-flex flex-wrap align-items-center justify-content-center border rounded-4 p-5 mb-3">
//                   <div class="icon-box-icon me-3">
//                     <svg class="location svg-primary" width="80" height="80">
//                       {/* <use xlink:href="#location" /> */}
//                     </svg>
//                   </div>
//                   <div class="icon-box-content">
//                     <p class="mb-0">Phoenix, Arizona </p>
//                     <p>947 Dogwood Road</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <section id="brand-collection" class="py-lg-7">
//       <div class="container">
//         <div class="row justify-content-between text-center">
//           <div class="col my-3">
//             <img src="images/brand-item-1.png" alt="brand" />
//           </div>
//           <div class="col my-3">
//             <img src="images/brand-item-2.png" alt="brand" />
//           </div>
//           <div class="col my-3">
//             <img src="images/brand-item-3.png" alt="brand" />
//           </div>
//           <div class="col my-3">
//             <img src="images/brand-item-4.png" alt="brand" />
//           </div>
//           <div class="col my-3">
//             <img src="images/brand-item-5.png" alt="brand" />
//           </div>
//         </div>
//       </div>
//     </section>

//     <section id="instagram-wrap" class="bg-overlay py-lg-7 pt-lg-0">
//       <div class="container-fluid">
//         <div class="display-header text-center mb-5">
//           <h2 class="display-3 fw-medium">Instagram #YourBrand</h2>
//         </div>
//         <div class="row">
//           <div class="col-lg-2 col-md-4 col-sm-6 mb-3">
//             <div class="image-holder position-relative">
//               <a href="https://www.instagram.com/templatesjungle/" target="_blank">
//                 <img src="images/insta-item-1.jpg" alt="instagram" class="img-fluid rounded-3" />
//                 <div class="insta-item overlay-item position-absolute d-flex align-items-center justify-content-center" >
//                   <svg class="instagram svg-white" width="45" height="45">
//                     {/* <use xlink:href="#instagram"></use> */}
//                   </svg>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div class="col-lg-2 col-md-4 col-sm-6 mb-3">
//             <div class="image-holder position-relative">
//               <a href="https://www.instagram.com/templatesjungle/" target="_blank">
//                 <img src="images/insta-item-2.jpg" alt="instagram" class="img-fluid rounded-3" />
//                 <div class="insta-item overlay-item position-absolute d-flex align-items-center justify-content-center">
//                   <svg class="instagram svg-white" width="45" height="45">
//                     {/* <use xlink:href="#instagram"></use> */}
//                   </svg>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div class="col-lg-2 col-md-4 col-sm-6 mb-3">
//             <div class="image-holder position-relative">
//               <a href="https://www.instagram.com/templatesjungle/" target="_blank">
//                 <img src="images/insta-item-3.jpg" alt="instagram" class="img-fluid rounded-3" />
//                 <div class="insta-item overlay-item position-absolute d-flex align-items-center justify-content-center">
//                   <svg class="instagram svg-white" width="45" height="45">
//                     {/* <use xlink:href="#instagram"></use> */}
//                   </svg>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div class="col-lg-2 col-md-4 col-sm-6 mb-3">
//             <div class="image-holder position-relative">
//               <a href="https://www.instagram.com/templatesjungle/" target="_blank">
//                 <img src="images/insta-item-4.jpg" alt="instagram" class="img-fluid rounded-3" />
//                 <div class="insta-item overlay-item position-absolute d-flex align-items-center justify-content-center">
//                   <svg class="instagram svg-white" width="45" height="45">
//                     {/* <use xlink:href="#instagram"></use> */}
//                   </svg>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div class="col-lg-2 col-md-4 col-sm-6 mb-3">
//             <div class="image-holder position-relative">
//               <a href="https://www.instagram.com/templatesjungle/" target="_blank">
//                 <img src="images/insta-item-5.jpg" alt="instagram" class="img-fluid rounded-3" />
//                 <div class="insta-item overlay-item position-absolute d-flex align-items-center justify-content-center">
//                   <svg class="instagram svg-white" width="45" height="45">
//                     {/* <use xlink:href="#instagram"></use> */}
//                   </svg>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div class="col-lg-2 col-md-4 col-sm-6 mb-3">
//             <div class="image-holder position-relative">
//               <a href="https://www.instagram.com/templatesjungle/" target="_blank">
//                 <img src="images/insta-item-6.jpg" alt="instagram" class="img-fluid rounded-3" />
//                 <div class="insta-item overlay-item position-absolute d-flex align-items-center justify-content-center">
//                   <svg class="instagram svg-white" width="45" height="45">
//                     {/* <use xlink:href="#instagram"></use> */}
//                   </svg>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <footer id="footer">
//       <div class="container-lg">
//         <div class="row">
//           <div class="col-lg-12">
//             <div class="footer-menu text-center">
//               <img src="images/main-logo.png" alt="brand name" class="pb-5" />
//               <p>Lander multi-purpose product landing page template.</p>
//               <ul class="social-links list-unstyled d-flex justify-content-center">
//                 <li class="border rounded-3 me-3">
//                   <a href="#" class="d-flex p-3">
//                     <svg class="facebook svg-gray" width="25" height="25">
//                       {/* <use xlink:href="#facebook"></use> */}
//                     </svg>
//                   </a>
//                 </li>
//                 <li class="border rounded-3 me-3">
//                   <a href="#" class="d-flex p-3">
//                     <svg class="twitter svg-gray" width="25" height="25">
//                       {/* <use xlink:href="#twitter"></use> */}
//                     </svg>
//                   </a>
//                 </li>
//                 <li class="border rounded-3 me-3">
//                   <a href="#" class="d-flex p-3">
//                     <svg class="instagram svg-gray" width="25" height="25">
//                       {/* <use xlink:href="#instagram"></use> */}
//                     </svg>
//                   </a>
//                 </li>
//                 <li class="border rounded-3 me-3">
//                   <a href="#" class="d-flex p-3">
//                     <svg class="linkedin svg-gray" width="25" height="25">
//                       {/* <use xlink:href="#linkedin"></use> */}
//                     </svg>
//                   </a>
//                 </li>
//                 <li class="border rounded-3">
//                   <a href="#" class="d-flex p-3">
//                     <svg class="youtube svg-gray" width="25" height="25">
//                       {/* <use xlink:href="#youtube"></use> */}
//                     </svg>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>

//     <div class="footer-bottom py-3 text-center">
//       <div class="container-lg">
//         <p class="m-0">© 2023 Lander. Designed by <a href="https://templatesjungle.com" target="_blank" class="fw-bold text-dark">TemplatesJungle</a>
//         </p>
//       </div>
//     </div>

//     <script src="js/jquery-1.11.0.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
//     <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
//     <script src="js/plugins.js"></script>
//     <script src="js/script.js"></script>
//     </div>
//   )
// }

// export default Blog