interface TitleH2Props{
    text: string;
    className?: string;
}

const TitleH2:React.FC<TitleH2Props> = ({ text, className }) => {
    return (
        <h2 className={`font-bold text-[18px] tracking-wide ${className}`}>{text}</h2>
    );
}
 
export default TitleH2;