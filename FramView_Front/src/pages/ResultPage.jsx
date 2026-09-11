import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Button, Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router';

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
    const navigate = useNavigate();
    const TopPageBack = () => {
        navigate("/")
    }
    return(
        <>
            <Box sx={{minHeight:"90vh", display:'flex', justifyContent:'center', alignItems:'center'}}> 
                <Card sx={{width:"60%", height:"70%"}}>
                    <CardContent>
                        <Box sx={{textAlign:"center"}}>
                            <h1>不足点検知結果</h1>
                            {currentCategories && (
                                <>
                                    <Box sx={{display:"flex", alignItems:"baseline", gap:3, mt:1 }}>
                                        <p style={{ color: '#8F7FEE', mb:1, ml:15, fontSize:15}}>カテゴリ{currentIndex + 1} /{categories.length}</p>
                                        <p style={{fontSize:17}}>{currentCategories}</p>
                                     </Box>
                                       
                                    {/* カテゴリに含まれる不足点や質問 */}
                                    {currentResults.map((result, index) => (
                                        <div key={index}>
                                            <p style={{backgroundColor:"#F1F1EF", color:"#5F5E5A", fontSize:15}}>{result.miss_point}</p>
                                            <p style={{fontSize:17}}>{result.question}</p>
                                            </div>
                                    ))}
                                    <Box sx={{display:"flex", justifyContent:'center', alignItems:'center', gap:4}}>
                                    {currentIndex > 0 && 
                                        <Button variant="contained" sx={{ backgroundColor: '#BFC5CA', color: '#1F1F1F' }} onClick={backPage}>戻る</Button>
                                        }
                                        {currentIndex < categories.length -1 && (
                                        <Button variant="contained" sx={{ backgroundColor: '#ADF0C7', color: '#1F1F1F' }} onClick={nextPage}>次へ</Button>
                                        )}
                                        {currentIndex === categories.length -1 && (
                                            <Button variant="contained" sx={{ backgroundColor: '#ADF0C7', color: '#1F1F1F' }} onClick={TopPageBack}>トップへ戻る</Button>
                                        )}
                                    </Box>
                                </>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};