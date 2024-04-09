import CategoryCard from "./CategoryCard";
import GridLayout from "./GridLayout";

const DefaultCategories = () => {
    return (
        <GridLayout className="mt-[14px]">
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/acampamento-nova-vida.png" text="Acampamento Nova Vida" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/despesas-pastorais.png" text="Despesas Pastorais" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/dizimo-escolinha.png" text="Dízimo Escolinha" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/dizimo-igreja.png" text="Dízimo Igreja" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/energia-eletrica.png" text="Energia Elétrica" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/investimento.png" text="Investimento" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/lanches.png" text="Lanches" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/limpeza-patio.png" text="Limpeza Pátio" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/manutencao.png" text="Manutencao" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/materiais-escolinhas.png" text="Materiais Escolinhas" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/oferta-extra.png" text="Oferta Extra" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/redizimo.png" text="Redízimo" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/banknote.png" text="Rendimento" />
            <CategoryCard classNameH2="md:text-[12px]" className="bg-gray-100 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] dark:bg-secondary_less" img="/categories/salario-pastor.png" text="Salário Pastor" />
        </GridLayout>
    );
}
 
export default DefaultCategories;