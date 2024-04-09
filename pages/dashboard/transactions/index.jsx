import { mongooseConnect } from "@/lib/mongoose";
import { Transaction } from "@/models/Transaction";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Card from "@/components/Card";
import CardTransaction from "@/components/CardTransaction";
import TitleH3 from "@/components/TitleH3";
import getMonth from "@/lib/getMonth";
import DatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import axios from "axios";
import { api, versionApi } from "@/lib/configApi";
import CardError from "../../../components/CardError";
import { useRouter } from "next/router";
import { useEffect } from "react";
import formatName from "@/lib/formatName";

const Transactions = ({ transactionsDb }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactions, setTransactions] = useState(transactionsDb);
  const [nodata, setNodata] = useState(false);
  const [newMonth, setNewMonth] = useState("");
  const [title, setTitle] = useState(false);
  const router = useRouter()
  let actualMonth = new Date().getMonth() + 1

  const getData = async (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    setNewMonth(month)
    setTitle(false)
    const data = { month, year }

    await axios.post(`${api}/${versionApi}/transactions/get-by-year-and-month`, data).then(response => {
      if (!response.data.length) {
        setTransactions([])
        setNodata(true)
      } else {
        setNodata(false)
        setTransactions(response.data);
      }
    })
  }
  
  useEffect(()=>{
    if (router.query.type) {
      setTitle(true)
      axios.post(`${api}/${versionApi}/transactions/get-by-type?type=${router.query.type}`).then(response => {
        if (!response.data.length) {
          setTransactions([])
          setNodata(true)
        } else {
          setNodata(false)
          setTransactions(response.data);
        }
      })
    }
  },[])

  return (
    <Layout>
      <Title text="Movimentações" className="mb-[24px]" />

      <div className="flex items-center gap-2 mb-[20px]">
        <TitleH3 text="Buscar por data" className="my-[5px] text-[12px]" />
        <div className="w-[120px] h-[40px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
          <DatePicker showMonthYearPicker showFullMonthYearPicker showFourColumnMonthYearPicker dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px] text-sm" selected={startDate} onChange={(date) => { setStartDate(date), getData(date) }} />
          <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
        </div>
      </div>

      <h2 className="mb-[10px] text-[16px]">
        {title ? `${formatName(router.query.type)}s` : "Receitas e despesas"} do mês
        {newMonth ? (
          <>
            {newMonth === actualMonth ? " atual" : ` de ${getMonth(newMonth)}`}
          </>
        ) : (
          " atual"
        )}
      </h2>
      {transactions.length > 0 && (
        <Card>
          {transactions.map(transaction => (
            <CardTransaction key={transaction?._id} transaction={transaction} />
          ))}
        </Card>
      )}
      {nodata && (
        <CardError message="Nenhum dado encontrado." />
      )}
    </Layout>
  );
}

export default Transactions;

export async function getServerSideProps(req) {
  await mongooseConnect()

  let anoAtual = new Date().getFullYear();

  function firstDayOfMonth(ano, mes) {
    return new Date(ano, mes - 1, 1);
  }

  function lastDayOfMonth(ano, mes) {
    return new Date(ano, mes, 1);
  }

  const transactionsDb = await Transaction.find({
    date: { $gte: firstDayOfMonth(anoAtual, new Date().getMonth() + 1), $lt: lastDayOfMonth(anoAtual, new Date().getMonth() + 1) }
  }).sort({ "date": -1 })

  return {
    props: {
      transactionsDb: JSON.parse(JSON.stringify(transactionsDb)),
    }
  }
}