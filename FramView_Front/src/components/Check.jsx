import { useState } from "react";

export const useMissCheck =  (inputContents) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
        const fetchExecute  = async (inputContents) => {
        if (!inputContents) return;

                setIsLoading(true);
                //データ取得
                try{
                const res = await fetch("https://api.framview.com/api/Check-api", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                    //fetchでリクエストを送信する際に、正規の画面から送られたリクエストであることを
                    //サーバーへ証明するためのものが、'X-CSRF-TOKEN'
                    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ message: inputContents })
            });
            if (!res.ok) {
                throw new Error("データの取得に失敗しました。");
            }
                const resultData = await res.json();
                setData(resultData);
                return resultData;

                } catch (error) {
                        setError(error.message);
                        throw error;
                } finally {
                    setIsLoading(false);
                }
                    };
    return { isLoading, error, fetchExecute };

}