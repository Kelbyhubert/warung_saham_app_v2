import { RekomDetails, TargetTableData } from '@/types/Rekom';
import React from 'react'

interface useFetchRekomDetailsProps {
  id? : string | null
}

const useFetchRekomDetails = ({id = null} : useFetchRekomDetailsProps) => {  
  const [rekomDetails, setRekomDetails] = React.useState<RekomDetails| null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(`http://localhost:5173/api/rekom/${id}`,{
                method: 'GET',
                credentials: 'include'
            }
        );

        if(res.ok){
            const result = await res.json();
            setRekomDetails(result.data.data);
        }else{
          setRekomDetails(null);
        }

    }catch{
      setRekomDetails(null);
    }
    }

    if(id !== null){
      fetchData();
    }

  },[]);

  return {rekomDetails}

}

export default useFetchRekomDetails
