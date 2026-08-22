import { Button } from '@mui/material';
import { useState } from "react";
import { useLocation } from "react-router";

export const ResultPage = () => {
    const location = useLocation();
    const { resResult } = location.state ?? [];
    //APIレスポンスからresult配列を取り出す
    const results = resResult?.result?? [];
    //表示する番号
    const [currentIndex, setCurrentIndex]= useState(0);
    //現在表示するデータ
    const currentResult = results[currentIndex];

    const nextPage = () => {
        setCurrentIndex((prev) => prev + 1);
    }

    const backPage = () => {
          setCurrentIndex((prev) => prev - 1);
    }
    return(
        <>
        <h1>不足点検知結果</h1>
        {currentResult && (
            <>
                <p>{currentIndex + 1} /{results.length}</p>
                <p>{currentResult.category}</p>
                <p>{currentResult.miss_point}</p>
                <p>{currentResult.question}</p>
                {currentIndex > 0 && 
                <Button variant="contained" sx={{ mt:5, ml:5, backgroundColor: '#BFC5CA', color: '#1F1F1F' }} onClick={backPage}>戻る</Button>
                }
                {currentIndex < results.length -1 && (
                    <Button variant="contained" sx={{ mt:5, ml:5, backgroundColor: '#ADF0C7', color: '#1F1F1F' }} onClick={nextPage}>次へ</Button>
                )}
            </>
        )}
        </>
    );
};