import { mongooseConnect } from "@/lib/mongoose";
import { Log } from "@/models/Log";
import { User } from "@/models/User";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Card from "@/components/Card";
import CardError from "@/components/CardError";
import CardLog from "../../../components/CardLog";
import Paginate from "../../../components/Paginate";
import { useState } from "react";
import SelectContainer from "@/components/SelectContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import Button from "@/components/Button";
import axios from "axios";
import { api, versionApi } from "@/lib/configApi";
import useFlashMessage from "@/hooks/useFlashMessage";

const SystemLog = ({ logsdb }) => {
  const { setFlashMessage } = useFlashMessage()

  const [logs, setLogs] = useState(logsdb);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItem = logs.slice(firstIndex, lastIndex);


  const [rule, setRule] = useState()
  const [startDate, setStartDate] = useState(new Date());
  const [nodata, setNodata] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const rules = [
    {
      _id: "administrador",
      name: "administrador"
    },
    {
      _id: "presidente",
      name: "presidente"
    },
    {
      _id: "tesoureiro",
      name: "tesoureiro"
    },
    {
      _id: "pastor",
      name: "pastor"
    },
    {
      _id: "contabilidade",
      name: "contabilidade"
    },
    {
      _id: 'membro',
      name: "membro"
    }
  ]

  const getData = async () => {
    setIsSearching(true)
    let actualYear = startDate.getFullYear()
    let newMonth = startDate.getMonth() + 1

    let msgText;
    let msgType;
    const data = { newMonth, actualYear, rule }

    try {
      await axios.post(`${api}/${versionApi}/log/get-log-by-function-date`, data).then(response => {
        if (response?.data?.message?.type === "error") {
          msgText = response?.data?.message?.data
          msgType = response?.data?.message?.type
          setLogs([])
          setNodata(true)
        } else {
          setLogs([])
          msgText = response?.data?.message?.data
          setNodata(false)
          setLogs(response?.data);
        }
      })

    } catch (error) {
      msgText = error?.response?.data?.message?.data
      msgType = error?.response?.data?.message?.type
    } 

    setFlashMessage(msgText, msgType)
    setIsSearching(false)
  }
  
  return (
    <Layout>
      <Title text="Log do sistema" className="mb-[24px]" />

      <div className="w-[300px] sm:w-full mx-auto flex flex-col sm:flex-row gap-[16px] mt-[46px] mb-[16px]">
        <div className="flex gap-[16px]">
          <SelectContainer required={true} data={rules} value={rule} onchange={(ev) => setRule(ev.target.value)} className={"mt-[16px] max-w-[200px]"} placeholder="Selecione a função" />
          <div className="w-[60%] h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
            <DatePicker showMonthYearPicker showFullMonthYearPicker showFourColumnMonthYearPicker dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px] text-sm" selected={startDate} onChange={(date) => setStartDate(date)} />
            <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
          </div>
        </div>
        <Button text={`${isSearching ? "Buscando..." : "Buscar dados" }`} onClick={getData} className={`w-full sm:w-[40%] md:w-[50%] ${isSearching ? "bg-primary_less" : "bg-primary"}`} />
      </div>

      {logs?.length > 0 ? (
        <>
          <Card>
            <CardLog logs={currentItem} />
          </Card>
          <Paginate itemsToPaginate={logs} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} firstIndex={firstIndex} />
        </>
      ) : (
        <CardError message="Nenhum log encontrado." />
      )}
    </Layout>
  );
}

export default SystemLog;

export async function getServerSideProps(req) {
  await mongooseConnect()

  const logs = await Log.find({}).sort({ "createdAt": -1 })
  logs.docs = await Promise.all(logs.map(async (log) => {
    log.user = await User.findById(log.user).select("name")
    return log
  }))

  return {
    props: {
      logsdb: JSON.parse(JSON.stringify(logs)),
    }
  }
}
