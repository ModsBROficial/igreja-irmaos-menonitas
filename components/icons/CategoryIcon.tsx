import React from "react";

interface CategoryIconProps{
    className: string;
} 

const CategoryIcon: React.FC<CategoryIconProps> = ({className}) => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.55603 7.5H7.56603M7.55603 3.5H12.556C13.068 3.5 13.58 3.695 13.97 4.086L20.97 11.086C21.345 11.4611 21.5556 11.9697 21.5556 12.5C21.5556 13.0303 21.345 13.5389 20.97 13.914L13.97 20.914C13.595 21.2889 13.0864 21.4996 12.556 21.4996C12.0257 21.4996 11.5171 21.2889 11.142 20.914L4.14203 13.914C3.95604 13.7285 3.80852 13.5081 3.70795 13.2655C3.60739 13.0228 3.55576 12.7627 3.55603 12.5V7.5C3.55603 6.43913 3.97746 5.42172 4.7276 4.67157C5.47775 3.92143 6.49517 3.5 7.55603 3.5Z" stroke={className} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}

export default CategoryIcon;