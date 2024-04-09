import { mongooseConnect } from "@/lib/mongoose";
import { Document } from "@/models/Document";
import { User } from "@/models/User";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Card from "@/components/Card";
import Button from "@/components/Button";
import NewDocument from "@/components/NewDocument";
import SearchContainer from "@/components/SearchContainer";
import PlusIcon from "@/components/icons/PlusIcon";
import { useContext, useState } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import CardDocument from "../../../components/CardDocument";
import checkKey from '@/lib/checkKey'
import { useRouter } from "next/router";

const Documents = ({ documentsDb }) => {
  const { toggleModal, setDataModal } = useContext(ModalContext)
  const [search, setSearch] = useState('')    
  const router = useRouter()

  function searchItem() {
    router.push(`/dashboard/documents/${search}`)
  }

  return (
    <Layout>
      <div className="flex justify-between mb-[14px]">
        <Title text="Documentos" />
        <Button icon={<PlusIcon className=" text-light w-[18px] h-[18px] " />} onClick={() => { toggleModal(), setDataModal(<NewDocument />) }} text={"Novo"} className="bg-primary gap-[2px] h-[40px] w-[80px]" />
      </div>
      <SearchContainer onKeyDown={(ev)=> checkKey(ev, searchItem)} value={search} onchange={(ev) => setSearch(ev.target.value)} onClick={searchItem} placeholder="Está procurando algo específico?" />

      {documentsDb.length > 0 && (
        <Card className={"mt-[30px]"}>
          <CardDocument documents={documentsDb} />
        </Card>
      )}
    </Layout>
  );
}

export default Documents;

export async function getServerSideProps(req) {
  await mongooseConnect()
  const documentsDb = await Document.find({}, null, { sort: { "createdAt": -1 }, limit: 5 })
  
  documentsDb.docs = await Promise.all(documentsDb.map(async (document) => {
    document.user = await User.findById(document.user).select("name")
    return document
  }))

  return {
    props: {
      documentsDb: JSON.parse(JSON.stringify(documentsDb)),
    }
  }
}