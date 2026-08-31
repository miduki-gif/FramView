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
     //カテゴリ一覧
    const categories = Object.keys(results);
    //現在表示するカテゴリの要素
    const currentCategories = categories[currentIndex];
    //今のカテゴリに含まれている不足点・質問を取得
    const currentResults = results[currentCategories];

    const nextPage = () => {
        setCurrentIndex((prev) => prev + 1);
    }

    const backPage = () => {
          setCurrentIndex((prev) => prev - 1);
    }
    return(
        <>
        <h1>不足点検知結果</h1>
        {currentCategories && (
            <>
                <p>{currentIndex + 1} /{categories.length}</p>
                <p>{currentCategories}</p>
                 {/* カテゴリに含まれる不足点や質問 */}
                {currentResults.map((result, index) => (
                    <div key={index}>
                        <p>{result.miss_point}</p>
                        <p>{result.question}</p>
                        </div>
                ))}
                {currentIndex > 0 && 
                <Button variant="contained" sx={{ mt:5, ml:5, backgroundColor: '#BFC5CA', color: '#1F1F1F' }} onClick={backPage}>戻る</Button>
                }
                {currentIndex < categories.length -1 && (
                    <Button variant="contained" sx={{ mt:5, ml:5, backgroundColor: '#ADF0C7', color: '#1F1F1F' }} onClick={nextPage}>次へ</Button>
                )}
            </>
        )}
        </>
    );
};