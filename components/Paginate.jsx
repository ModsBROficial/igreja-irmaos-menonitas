import Link from "next/link";
import { useState } from "react";

const Paginate = ({
  itemsToPaginate,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  firstIndex

}) => {
  const npage = Math.ceil(itemsToPaginate.length / itemsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [limite, setLimite] = useState(5);
  const [max, setMax] = useState(5);
  const [min, setMin] = useState(0);

  function prePage() {
    if (currentPage !== firstIndex) {
      changeCPage(currentPage - 1);

      if ((currentPage - 1) % limite == 0) {
        setMax(max - limite);
        setMin(min - limite);
      }
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== firstIndex) {
      changeCPage(currentPage + 1);

      if (currentPage + 1 > max) {
        setMax(max + limite);
        setMin(min + limite);
      }
    }
  }

  let morepages = null;

  if (numbers.length > limite) {
    morepages = (
      <li>
        <Link href="#">...</Link>
      </li>
    );
  }
  const paginate = numbers.map((n, i) => {
    if (n < max + 1 && n > min) {
      return (
        <li
          key={i}
          onClick={() => changeCPage(n)}
          className={`rounded text-light px-1 min-w-[23px] text-center transition-all ${currentPage === n ? " bg-primary " : " cursor-pointer bg-mygray hover:bg-mygray_more dark:bg-secondary_less "}`}
        >
          <Link href="#">{n}</Link>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <nav className="mt-[30px] flex items-center justify-center">
      <ul className="flex text-[16px] gap-2">
        {currentPage !== 1 && (
          <li className="rounded bg-primary transition-all text-light px-1 hover:bg-primary_less" onClick={prePage}>
            <Link href="#">Anterior</Link>
          </li>
        )}

        {paginate}

        {npage !== currentPage && (
          <>
            {morepages}
            <li className="rounded bg-primary transition-all text-light px-1 hover:bg-primary_less" onClick={nextPage}>
              <Link href="#">Próximo</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
 
export default Paginate;