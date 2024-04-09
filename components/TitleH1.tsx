interface TitleH1Props{
    text: string;
    className?: string;
}

const TitleH1:React.FC<TitleH1Props> = ({ text, className }) => {
    return (
        <h1 className={`text-light font-bold text-[28px] tracking-wide ${className}`}>{text}</h1>
    );
}
 
export default TitleH1;