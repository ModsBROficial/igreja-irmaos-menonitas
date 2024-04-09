interface ChevronDownCircleIconProps {
    className?: string;
}

const ChevronDownCircleIcon: React.FC<ChevronDownCircleIconProps> = ({ className }) => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_430_382)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0633 8.95309L12.5 14.5234L6.93672 8.95309C6.63125 8.64841 6.13672 8.64841 5.83125 8.95309C5.52657 9.26559 5.52657 9.75782 5.83125 10.0625L11.8141 16.0469C12.0008 16.2344 12.257 16.2891 12.5 16.2422C12.743 16.2891 12.9992 16.2344 13.1867 16.0469L19.1687 10.0625C19.4734 9.75782 19.4734 9.26559 19.1687 8.95309C18.8633 8.64841 18.3688 8.64841 18.0633 8.95309ZM12.5 23.4375C6.45937 23.4375 1.5625 18.5391 1.5625 12.5C1.5625 6.46094 6.45937 1.5625 12.5 1.5625C18.5406 1.5625 23.4375 6.46094 23.4375 12.5C23.4375 18.5391 18.5406 23.4375 12.5 23.4375ZM12.5 0C5.59687 0 0 5.59375 0 12.5C0 19.4062 5.59687 25 12.5 25C19.4039 25 25 19.4062 25 12.5C25 5.59375 19.4039 0 12.5 0Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_430_382">
                    <rect width="25" height="25" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default ChevronDownCircleIcon;
