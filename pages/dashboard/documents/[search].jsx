import Layout from "@/components/Layout";
import BackIconLink from "@/components/BackIconLink";
import Card from "@/components/Card";
import SearchContainer from "@/components/SearchContainer";
import { useEffect, useState } from "react";
import CardDocument from "../../../components/CardDocument";
import checkKey from '@/lib/checkKey'
import CardError from "../../../components/CardError";
import { useRouter } from "next/router";
import axios from "axios";
import { api, versionApi } from "@/lib/configApi";
import TitleH2 from "../../../components/TitleH2";
import { getCurrentUser } from "@/helpers/getCurrentUser";

const SearchPage = () => {
  const { query } = useRouter()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [documents, setDocuments] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let currentUser = getCurrentUser()

    const getItems = async () => {
      await axios.get(`${api}/${versionApi}/documents/${query.search}?userId=${currentUser?._id}`).then(response => {
        if (!response?.data?.length) {
          setMessage("Nemhum documento encontrado")
          setDocuments([])
        } else {
          setDocuments(response?.data)
        }
      })
    }
    getItems()
  }, [query.search])

  function searchItem() {
    router.push(`/dashboard/documents/${search}`)
  }

  return (
    <Layout onKeyDown={(ev) => checkKey(ev, searchItem)}>

      <div className="flex justify-center relative mb-[14px]">
        <BackIconLink className="absolute left-0" path="/dashboard/documents" />
        <TitleH2 text={`Busca por: ${query.search}`} className="mx-[30px]" />
      </div>

      <SearchContainer value={search} onchange={(ev) => setSearch(ev.target.value)} onClick={searchItem} placeholder="Está procurando algo específico?" />
      {documents.length > 0 ?
        (
          <>
            <p className="text-[10px] pt-[5px]">Encontrados: <span className="font-bold">{documents.length}</span></p>
            <Card className={"mt-[30px]"}>
              <CardDocument documents={documents} />
            </Card>                    </>
        )
        :
        (
          <CardError message={message} />
        )
      }
    </Layout>
  );
}

export default SearchPage;
