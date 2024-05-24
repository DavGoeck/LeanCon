import ContractorForm from "./ContractorForm.tsx";
import {useParams} from "react-router-dom";
import useNav from "../../hooks/useNav.ts";
import API from "../../api-client.ts";
import {useEffect, useState} from "react";
import {Contractor} from "api";
import useUser from "../../hooks/useUser.ts";

const ContractorEditor = () => {

    const { id } = useParams()
    const { navInProject } = useNav()
    const { bearer } = useUser()

    const [ contractor, setContractor ] = useState<Contractor>()

    useEffect(() => {
        const fetchContractor = async () => {
            if (id) {
                const response = await API.contractors.getOne.query({ params: { id }, headers: { authorization: bearer } })
                if (response.status === 200) {
                    setContractor(response.body)
                } else {
                    navInProject('gewerke')
                }
            }
        }
        fetchContractor()
    }, [id, bearer]);

    return <ContractorForm contractor={contractor} />
}

export default ContractorEditor
