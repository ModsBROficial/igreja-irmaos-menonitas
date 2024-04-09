interface CardProps {
    children: React.ReactNode
    className?: String;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`bg-gray-100 dark:bg-secondary_less py-[24px] px-[15px] rounded ${className}`}>
            {children}
        </div>
    );
}

export default Card;