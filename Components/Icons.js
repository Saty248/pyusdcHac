export const DashboardIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.58984 9.49683C9.58984 8.94454 10.0376 8.49683 10.5898 8.49683H16.5898C17.1421 8.49683 17.5898 8.94454 17.5898 9.49683V16.4968C17.5898 17.0491 17.1421 17.4968 16.5898 17.4968H10.5898C10.0376 17.4968 9.58984 17.0491 9.58984 16.4968V9.49683Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" />
            <path d="M1.58984 2.49683C1.58984 1.94454 2.03756 1.49683 2.58984 1.49683H5.58984C6.14213 1.49683 6.58984 1.94454 6.58984 2.49683V16.4968C6.58984 17.0491 6.14213 17.4968 5.58984 17.4968H2.58984C2.03756 17.4968 1.58984 17.0491 1.58984 16.4968V2.49683Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" />
            <path d="M9.58984 2.49683C9.58984 1.94454 10.0376 1.49683 10.5898 1.49683H16.5898C17.1421 1.49683 17.5898 1.94454 17.5898 2.49683V4.49683C17.5898 5.04911 17.1421 5.49683 16.5898 5.49683H10.5898C10.0376 5.49683 9.58984 5.04911 9.58984 4.49683V2.49683Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" />
        </svg>

    )
}

export const EarthIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5898" cy="10.7683" r="9" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.5905 1.81641C11.2425 2.1093 10.929 2.45495 10.6622 2.85096C9.11944 5.14121 9.72538 8.2485 12.0156 9.79129C12.1964 9.91308 12.3823 10.0215 12.5721 10.1167C14.5905 11.1295 15.3611 9.76447 16.454 10.5006C17.1629 10.9782 17.3504 11.9399 16.8729 12.6488C16.3725 13.3917 15.5905 13.7683 15.7258 14.9851C15.8022 15.6719 16.2241 16.2637 16.7708 16.7683" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.58984 8.04834C3.67172 8.31162 4.67284 8.93612 5.39585 9.89425C6.16652 10.9155 6.48599 12.1367 6.38769 13.3187C6.33563 13.9447 6.74389 14.5766 7.26925 14.921C7.52308 15.0873 7.75307 15.2995 7.94639 15.5557C8.80241 16.6901 8.63161 18.2793 7.58984 19.209" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

// TODO:

export const GiftIcon = ({ isActive }) => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.58984" y="7.04004" width="20" height="5" rx="2" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.58984 12.04H20.5898V19.04C20.5898 20.1446 19.6944 21.04 18.5898 21.04H6.58984C5.48527 21.04 4.58984 20.1446 4.58984 19.04V12.04Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.5898 7.04004V21.04" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.58984 5.27442C5.58984 4.04433 6.58703 3.04004 7.81712 3.04004H8.71888C10.8568 3.04004 12.5898 4.77313 12.5898 6.91101V6.91101C12.5898 6.98227 12.5321 7.04004 12.4608 7.04004H7.34984C6.37782 7.04004 5.58984 6.24644 5.58984 5.27442V5.27442Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.5898 5.27442C19.5898 4.04433 18.5927 3.04004 17.3626 3.04004H16.4608C14.3229 3.04004 12.5898 4.77313 12.5898 6.91101V6.91101C12.5898 6.98227 12.6476 7.04004 12.7189 7.04004H17.8298C18.8019 7.04004 19.5898 6.24644 19.5898 5.27442V5.27442Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const MapIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.58984 17.3453V3.68414C1.58984 3.25371 1.86527 2.87157 2.27362 2.73545L6.95739 1.1742C7.36792 1.03735 7.81177 1.03735 8.2223 1.1742L12.9574 2.75256C13.3679 2.8894 13.8118 2.8894 14.2223 2.75256L18.2736 1.40212C18.9211 1.18628 19.5898 1.66825 19.5898 2.35081V15.3453C19.5898 15.7241 19.3758 16.0704 19.0371 16.2398L14.4843 18.5162C13.9212 18.7977 13.2585 18.7977 12.6954 18.5162L8.48427 16.4106C7.92122 16.1291 7.25847 16.1291 6.69542 16.4106L3.03706 18.2398C2.37216 18.5722 1.58984 18.0887 1.58984 17.3453Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.5898 2.96338V18.4634" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.58984 1.96338L7.58984 15.9634" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const DroneIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5898 10.2349H14.5898V14.2349H10.5898V10.2349Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.5898 10.2349L7.08984 6.73486" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.5507 6.23477C10.4588 5.59134 10.1894 4.98622 9.77295 4.48723C9.35646 3.98823 8.80925 3.61507 8.19262 3.40955C7.576 3.20403 6.91433 3.17428 6.28174 3.32362C5.64916 3.47297 5.07066 3.79551 4.61106 4.25511C4.15146 4.71471 3.82892 5.29321 3.67958 5.92579C3.53024 6.55837 3.55999 7.22004 3.76551 7.83667C3.97103 8.45329 4.34419 9.0005 4.84318 9.417C5.34218 9.83349 5.94729 10.1028 6.59073 10.1948" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.5898 10.2349L18.0898 6.73486" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.5889 10.1948C19.2323 10.1028 19.8375 9.83349 20.3365 9.417C20.8354 9.0005 21.2086 8.45329 21.4141 7.83667C21.6196 7.22004 21.6494 6.55837 21.5001 5.92579C21.3507 5.29321 21.0282 4.71471 20.5686 4.25511C20.109 3.79551 19.5305 3.47297 18.8979 3.32362C18.2653 3.17428 17.6036 3.20403 16.987 3.40955C16.3704 3.61507 15.8232 3.98823 15.4067 4.48723C14.9902 4.98622 14.7209 5.59134 14.6289 6.23477" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.5898 14.2349L18.0898 17.7349" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.6289 18.2349C14.7209 18.8783 14.9902 19.4835 15.4067 19.9824C15.8232 20.4814 16.3704 20.8546 16.987 21.0601C17.6036 21.2656 18.2653 21.2954 18.8979 21.1461C19.5305 20.9967 20.109 20.6742 20.5686 20.2146C21.0282 19.755 21.3507 19.1765 21.5001 18.5439C21.6494 17.9113 21.6196 17.2496 21.4141 16.633C21.2086 16.0164 20.8354 15.4692 20.3365 15.0527C19.8375 14.6362 19.2323 14.3669 18.5889 14.2749" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.5898 14.2349L7.08984 17.7349" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.59073 14.2749C5.94729 14.3669 5.34218 14.6362 4.84318 15.0527C4.34419 15.4692 3.97103 16.0164 3.76551 16.633C3.55999 17.2496 3.53024 17.9113 3.67958 18.5439C3.82892 19.1765 4.15146 19.755 4.61106 20.2146C5.07066 20.6742 5.64916 20.9967 6.28174 21.1461C6.91433 21.2954 7.576 21.2656 8.19262 21.0601C8.80925 20.8546 9.35646 20.4814 9.77295 19.9824C10.1894 19.4835 10.4588 18.8783 10.5507 18.2349" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const ShoppingBagsIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5898 21.5063H5.58984C4.48527 21.5063 3.58984 20.6109 3.58984 19.5063V8.50635C3.58984 7.95406 4.03756 7.50635 4.58984 7.50635H14.5898C15.1421 7.50635 15.5898 7.95406 15.5898 8.50635V11.0063" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.58984 12.5063C9.58984 11.9541 10.0376 11.5063 10.5898 11.5063H20.5898C21.1421 11.5063 21.5898 11.9541 21.5898 12.5063V19.5063C21.5898 20.6109 20.6944 21.5063 19.5898 21.5063H11.5898C10.4853 21.5063 9.58984 20.6109 9.58984 19.5063V12.5063Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.5898 7.50635V6.50635C12.5898 4.84949 11.2467 3.50635 9.58984 3.50635V3.50635C7.93299 3.50635 6.58984 4.84949 6.58984 6.50635V7.50635" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.5898 14.5063L13.5898 15.5063C13.5898 16.6109 14.4853 17.5063 15.5898 17.5063V17.5063C16.6944 17.5063 17.5898 16.6109 17.5898 15.5063L17.5898 14.5063" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const WalletIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5898 8.77808V6.77808C19.5898 5.67351 18.6944 4.77808 17.5898 4.77808H6.58984C5.48527 4.77808 4.58984 5.67351 4.58984 6.77808V18.7781C4.58984 19.8826 5.48527 20.7781 6.58984 20.7781H17.5898C18.6944 20.7781 19.5898 19.8826 19.5898 18.7781V16.7781" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="13.5898" y="8.77808" width="8" height="8" rx="1" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="17.5898" cy="12.7781" r="1.5" fill="#5D7285" />
        </svg>

    )
}

export const HelpQuestionIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5898 9.42969C10.5898 9.03413 10.7071 8.64745 10.9269 8.31855C11.1467 7.98965 11.459 7.7333 11.8245 7.58193C12.1899 7.43055 12.5921 7.39095 12.98 7.46812C13.368 7.54529 13.7244 7.73577 14.0041 8.01548C14.2838 8.29518 14.4742 8.65155 14.5514 9.03951C14.6286 9.42747 14.589 9.8296 14.4376 10.1951C14.2862 10.5605 14.0299 10.8729 13.701 11.0926C13.3721 11.3124 12.9854 11.4297 12.5898 11.4297V12.4297M14.8398 19.4297L13.3898 21.363C12.9898 21.8964 12.1898 21.8964 11.7898 21.363L10.3398 19.4297H7.58984C5.3807 19.4297 3.58984 17.6388 3.58984 15.4297V7.42969C3.58984 5.22055 5.3807 3.42969 7.58984 3.42969H17.5898C19.799 3.42969 21.5898 5.22055 21.5898 7.42969V15.4297C21.5898 17.6388 19.799 19.4297 17.5898 19.4297H14.8398Z" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="12.5898" cy="15.4297" r="1" fill="#5D7285" />
        </svg>
    )
}

export const LogoutIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5898 17.2013V19.7013C15.5898 20.8059 14.6944 21.7013 13.5898 21.7013H6.58984C5.48527 21.7013 4.58984 20.8059 4.58984 19.7013V5.70129C4.58984 4.59672 5.48527 3.70129 6.58984 3.70129H13.5898C14.6944 3.70129 15.5898 4.59672 15.5898 5.70129V8.76379M11.5898 12.7013H21.5898M21.5898 12.7013L19.0898 10.2013M21.5898 12.7013L19.0898 15.2013" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const ArrowCompressIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.70703 17.2885H14.7781M14.7781 17.2885L11.2426 13.7529M14.7781 17.2885L11.2426 20.824" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M27.5059 17.2885L20.4348 17.2885M20.4348 17.2885L23.9703 20.824M20.4348 17.2885L23.9703 13.7529" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const ArrowExpandIcon = ({ isActive }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 12L4.5 12M20.5 12L17 15.5M20.5 12L17 8.5M4.5 12L8 8.5M4.5 12L8 15.5" stroke={isActive ? '#4285F4' : '#5D7285'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

