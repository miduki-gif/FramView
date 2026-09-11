import { useState } from "react";
import { useLocation } from "react-router";
import { Grid, Button, Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
            <Box sx={{minHeight:"90vh", display:'flex', justifyContent:'center', alignItems:'center',mx:"auto"}}> 
                <Card sx={{width:"60%", height:"70%"}}>
                    <CardContent>
                        <Grid container sx={{justifyContent:'center', alignItems:'center'}}>
                            <h1>不足点検知結果</h1>
                            <br />
                            {currentCategories && (
                                <>
                                    <Box sx={{display:"flex", alignItems:"baseline", gap:3, mt:3 }}>
                                        <p style={{ color: '#8F7FEE', mb:1, ml:15, fontSize:12}}>カテゴリ{currentIndex + 1} /{categories.length}</p>
                                        <p style={{fontSize:16}}>{currentCategories}</p>
                                     </Box>
                                       
                                    {/* カテゴリに含まれる不足点や質問 */}
                                    {currentResults.map((result, index) => (
                                        <div key={index}>
                                            <p style={{backgroundColor:"#F1F1EF", color:"#5F5E5A", fontSize:12}}>{result.miss_point}</p>
                                            <p style={{fontSize:16}}>{result.question}</p>
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
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};