interface TitleProps{
    text: string;
    className?: string;
}

const Title:React.FC<TitleProps> = ({ text, className }) => {
    return (
        <h1 className={`font-bold text-[18px] tracking-wide ${className}`}>{text}</h1>
    );
}
 
export default Title;