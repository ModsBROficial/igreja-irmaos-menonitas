import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Rule } from "@/models/Rule";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Button from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import NewUser from "@/components/NewUser";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import Card from "@/components/Card";
import CardUser from "@/components/CardUser";

const ManageAccounts = ({ usersDb, rulesDb }) => {
  const { toggleModal, setDataModal } = useContext(ModalContext)
  
  return (
    <Layout>
      <div className="flex justify-between">
        <Title text="Gerenciar contas" className="mb-[24px]" />
        <Button icon={<PlusIcon className=" text-light w-[18px] h-[18px] " />} onClick={() => { toggleModal(), setDataModal(<NewUser rules={rulesDb} />) }} text={"Novo"} className="bg-primary gap-[2px] h-[40px] w-[80px]" />
      </div>
      {usersDb && (
        <Card className={"mt-[30px]"}>
          <CardUser users={usersDb} rules={rulesDb} />
        </Card>
      )}
    </Layout>
  );
}

export default ManageAccounts;


export async function getServerSideProps(req) {
  await mongooseConnect()
  const categoryOrder = {
    "administrador": 1,
    "presidente": 2,
    "tesoureiro": 3,
    "pastor": 4,
    "contabilidade": 5,
    "membro": 6
  };

  const usersDb = await User.find({}).sort({ "rule": 1 })
  const rulesDb = await Rule.find({})
  usersDb.docs = await Promise.all(usersDb.map(async (user) => {
    user.rule = await Rule.findById(user.rule).select("name")
    return user
  }))

  const sortedData = usersDb.sort((a, b) => {
    return categoryOrder[a.rule.name] - categoryOrder[b.rule.name];
  });

  return {
    props: {
      usersDb: JSON.parse(JSON.stringify(sortedData)),
      rulesDb: JSON.parse(JSON.stringify(rulesDb)),
    }
  }
}