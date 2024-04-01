"use client";
import AppThirdwebProvider from "@/app/providers/ThirdwebProvider";
import { useStateContext } from "@/context";
import { useContract } from "@thirdweb-dev/react";
import { useContext, useEffect, useState } from "react";
interface IContractDetail {
    params: {
        job_id: string;
    };
}


const ContractDetail: React.FC<IContractDetail> = ({ params }) => {
    console.log("id", params.job_id);
    const [contractInfo, setContractInfo] = useState([]);
    const { contract } = useContract(
        "0x5B549B6308dD5048564297e0546c17d1889CbF0C"
    );
    const getDataContract = async () => {
        try {
            const data = await contract?.call('getJobInfoByCurrentJobId', [params.job_id])
            console.log("DATA",data);
            if(data)
            setContractInfo(data);
        } catch (error) {
            ///
            console.log(error);
            
        }
        
    };
        
   console.log("contract information",contractInfo);
    useEffect(() => {
        getDataContract();
     }, [contract]);

    return <div>Thông tin hợp đồng
        { contractInfo.map((i)=>i.toString()+"  |   ")}
    </div>;
};

export default ContractDetail;