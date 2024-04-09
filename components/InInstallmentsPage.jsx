const InInstallmentsPage = ({ onChange }) => {
    let parcelas = 60

    return (
        <div className="bg-light  dark:bg-secondary_less">
            <select onChange={onChange} name="select" className="in-instalment bg-light dark:bg-secondary_less">
                {Array.from({ length: parcelas }).map((_, index) => (
                    <option key={index} value={index+1}>{index+1}x</option>
                ))}
            </select>
        </div>

    );
}

export default InInstallmentsPage;