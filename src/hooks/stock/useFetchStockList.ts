import React from "react";

const useFetchStockList = (stockCode : string) => {
    const [stockList, setStockList] = React.useState<[]>([]);
    
    const fetchData = async () => {
        try{
            const res = await fetch(`http://localhost:5173/api/stock/list?stockcode=${stockCode}`,{
                    method: 'GET',
                    credentials: 'include'
                }
            );
    
            if(res.ok){
                const result = await res.json();
                setStockList(result.data.data);
            }else{
                setStockList([]);
            }

        }catch{
            setStockList([]);
        }
    }

    React.useEffect(() => {
        fetchData();
    },[stockCode]);

    return stockList;
}

export default useFetchStockList