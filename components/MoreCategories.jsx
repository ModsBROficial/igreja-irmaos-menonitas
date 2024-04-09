import { useContext } from "react";
import CategoryCard from "./CategoryCard";
import TitleH3 from "./TitleH3";
import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import GridLayout from "./GridLayout";

const MoreCategories = () => {
    const { toggleModalSecond, setInfo } = useContext(ModalSecondContext)

    return (
        <section>
            <TitleH3 className="text-center" text="Mais ícones"/>
            <GridLayout className="mt-[14px]">
                <CategoryCard id="book" onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/book.png" />
                <CategoryCard id="book2" onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/book2.png" />
                <CategoryCard id="bookmark" onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/bookmark.png" />
                <CategoryCard id="calendar"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/calendar.png" />
                <CategoryCard id="calendar2"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/calendar2.png" />
                <CategoryCard id="download"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/download.png" />
                <CategoryCard id="gift"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/gift.png" />
                <CategoryCard id="gum"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/gum.png" />
                <CategoryCard id="hamburger"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/hamburger.png" />
                <CategoryCard id="highlight"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/highlight.png" />
                <CategoryCard id="home"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/home.png" />
                <CategoryCard id="location"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/location.png" />
                <CategoryCard id="money"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/money.png" />
                <CategoryCard id="notebook"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/notebook.png" />
                <CategoryCard id="right-arrow"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/right-arrow.png" />
                <CategoryCard id="schedule"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/schedule.png" />
                <CategoryCard id="shopping-cart"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/shopping-cart.png" />
                <CategoryCard id="statistics"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/statistics.png" />
                <CategoryCard id="trophy"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/trophy.png" />
                <CategoryCard id="wheelbarrow"onClick={(ev)=> {toggleModalSecond(), setInfo(ev.target.offsetParent)}} className="cursor-pointer hover:bg-gray-200 dark:bg-gray-600 bg-gray-100" img="/categories/wheelbarrow.png" />
            </GridLayout>
        </section>
    );
}
 
export default MoreCategories;