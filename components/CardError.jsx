const CardError = ({ message }) => {
    return (
        <div className={`mt-[30px] text-center`}>
            <h2 className="text-sm">{message}</h2>
        </div>
    );
}

export default CardError;