interface ChevronUpCircleIconProps {
    className?: string;
}

const ChevronUpCircleIcon: React.FC<ChevronUpCircleIconProps> = ({ className }) => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_430_343)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.93672 16.0469L12.5 10.4766L18.0633 16.0469C18.3688 16.3516 18.8633 16.3516 19.1687 16.0469C19.4734 15.7344 19.4734 15.2422 19.1687 14.9375L13.1859 8.95309C12.9992 8.76559 12.743 8.71091 12.5 8.75778C12.257 8.71091 12.0008 8.76559 11.8133 8.95309L5.83125 14.9375C5.52657 15.2422 5.52657 15.7344 5.83125 16.0469C6.13672 16.3516 6.63125 16.3516 6.93672 16.0469ZM12.5 1.5625C18.5406 1.5625 23.4375 6.46094 23.4375 12.5C23.4375 18.5391 18.5406 23.4375 12.5 23.4375C6.45938 23.4375 1.5625 18.5391 1.5625 12.5C1.5625 6.46094 6.45938 1.5625 12.5 1.5625ZM12.5 25C19.4031 25 25 19.4062 25 12.5C25 5.59375 19.4031 0 12.5 0C5.59609 0 0 5.59375 0 12.5C0 19.4062 5.59609 25 12.5 25Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_430_343">
                    <rect width="25" height="25" fill="white" transform="matrix(-1 0 0 -1 25 25)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default ChevronUpCircleIcon;
