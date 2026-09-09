export const useMissCheck =  (inputContents) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
        const fetchExecute  = async (inputContents) => {
        if (!inputContents) return;
            async function apiFetchData() {
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
                const data = await res.json();
                return setData(data);
                } catch (error) {
                        setError(error.message);
                } finally {
                    setIsLoading(false);
                }
                    };
                apiFetchData();
                    };
    return { isLoading, error, fetchExecute };

}