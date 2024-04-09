interface TitleH3Props{
    text: string;
    className?: string;
}

const TitleH3:React.FC<TitleH3Props> = ({ text, className }) => {
    return (
        <h3 className={`font-normal text-[14px] tracking-wide ${className}`}>{text}</h3>
    );
}

export default TitleH3;