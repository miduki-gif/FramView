// import './App.css'
import { Button, TextField} from '@mui/material';
import { QuestionCard } from '../src/components/QuestionCard'
import { useState } from 'react';
import { MissCheck } from '../src/components/Check'
import { useNavigate } from 'react-router';
import { ResultPage } from './pages/ResultPage';

function App() {

  const [inputContents, setInputContents ] = useState({});
  const questions = [
    "目指すゴールと達成度を測る成功指標(KPI)を入力してください",
    "ゴールを実現する上での課題点を入力してください",
    "システムを使用する対象ユーザーを入力してください",
    "システムの利用シーンを入力してください",
    "機能要件と非機能要件を入力してください",
    "制約条件を入力してください",
    "ステークホルダーを入力してください",
    "プロジェクト名を入力してください"
  ]
  //APIからのレスポンスを保存するState
  const [apiResResult, setApiResResult] = useState([]);

  const [questionCurrentContents, setQuestionCurrentContents] = useState(0);
  const nextQuestion = questionCurrentContents + 2;
  const backQuestion = questionCurrentContents !== 0 && <Button variant="contained" sx={{ backgroundColor: '#E6E6F2', color: '#1F1F1F', mt:5, ml:5}} onClick={ ()=> setQuestionCurrentContents(questionCurrentContents - 1 )}>{`質問${questionCurrentContents}へ戻る`}</Button>;
  const buttonText = questionCurrentContents === questions.length -1 ? "不足点検知" : `質問${nextQuestion}へ`
  const buttonClassName = questionCurrentContents === questions.length -1;

  const navigate = useNavigate();
  
  const missCheck = async () => {
    if (buttonClassName){
      const data = await MissCheck(inputContents);
        console.log("処理完了");
        navigate("/result", { state: { resResult: data }});
    }else{
      setQuestionCurrentContents(questionCurrentContents + 1)
    }
  }
  const labelKey = questions.join("_");
  //labelKeyは質問データの配列をオブジェクトのキーとして使っている
    const inputLabelMap = new Map([
      [0, {[labelKey]:[{label:"理想のゴール"}, {label:"成功指標のKPI", description:"成果を図るための指標"}]}],
      [1, {[labelKey]:[{label:"課題点"}]}],
      [2, {[labelKey]:[{label:"対象ユーザー"}]}],
      [3, {[labelKey]:[{label:"利用シーン"}]}],
      [4, {[labelKey]:[{label:"機能要件", description:"ユーザーができること"},{label:"非機能要件", description:"機能以外の品質や条件"}]}],
      [5, {[labelKey]:[{label:"制約条件", description:"守るべきルールや条件"}]}],
      [6, {[labelKey]:[{label:"ステークホルダー", description:"利害関係者"}]}],
      [7, {[labelKey]:[{label:"プロジェクト名"}]}]
    ]);
    //Mapから取り出す
    const labelObject = inputLabelMap.get(questionCurrentContents);
  //配列の中のオブジェクトを取り出す
  const labels = labelObject[labelKey]

  const inputChange = (inputkey , value) => {
    setInputContents((prev) => ({
      ...prev,
      [inputkey]:value
    }))
  }

  // const buttonUI = questionCurrentContents === questions.length -1 ? <Button>保存して一覧へ</Button> : 
  return (
    <>
    <header>
      <div style={{borderBottom: "5px solid #ADF0C7"}}>
        {/* <div style={{display:'flex'}}>
        <img src='src/assets/block1.png' />
        <img src='src/assets/block1.png' />
        <img src='src/assets/block2.png' />
        </div> */}
        <a href='/' style={{textDecoration:"none"}}>
        <h1 style={{fontWeight:'bold', color:"black", paddingLeft:"150px"}}>FramView</h1>
        </a>
      </div>
    </header>
    <QuestionCard
    value={inputContents} 
    onChange={inputChange} 
    question={questions[questionCurrentContents]} 
    nextQuestion={nextQuestion} 
    backQuestion={backQuestion} 
    buttonText={buttonText} 
    buttonClassName={buttonClassName}
    onClick= {missCheck}
    questionNumber={questionCurrentContents + 1}
    labels={labels}
    />
    {/* <Card sx={{mb: 5 }}>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
           <Typography sx={{color:'#1F1F1F'}}>プロジェクト要件定義一覧</Typography>
           <Card sx={{ mb:5 }}>
            <CardContent>
              <Button variant="contained" sx={{backgroundColor:'#FFF6B6', color:'#1F1F1F', borderRadius:'4px'}}>調整中</Button>
              <Typography>ホテル予約システム開発</Typography>
              <Button variant="text" sx={{color: '#837272'}}>...</Button>
              <Button variant="contained" sx={{backgroundColor:'#ADF0C7', color:'#1F1F1F', mr:'7px'}}>検知結果</Button>
              <Button variant="contained" sx={{backgroundColor:'#C6DCFF', color:'#1F1F1F'}}>✎編集</Button>
            </CardContent>
           </Card>
          </Grid>
          <Grid item>
           <Card sx={{ mb:5 }}>
            <CardContent>
              <Button variant="contained" sx={{backgroundColor:'#FFF6B6', color:'#1F1F1F', borderRadius:'4px'}}>調整中</Button>
              <Typography>マッチングサービス</Typography>
              <Button variant="text" sx={{color: '#837272'}}>...</Button>
              <Button variant="contained" sx={{backgroundColor:'#ADF0C7', color:'#1F1F1F', mr:'7px'}}>検知結果</Button>
              <Button variant="contained" sx={{backgroundColor:'#C6DCFF', color:'#1F1F1F'}}>✎編集</Button>
            </CardContent>
           </Card>
          </Grid>
           <Grid item>
           <Card sx={{ mb:5 }}>
            <CardContent>
              <Button variant="contained" sx={{backgroundColor:'#FFC6C6', color:'#1F1F1F', borderRadius:'4px'}}>完了</Button>
              <Typography>勤怠管理アプリ開発</Typography>
              <Button variant="text" sx={{color: '#837272'}}>...</Button>
              <Button variant="contained" sx={{backgroundColor:'#ADF0C7', color:'#1F1F1F', mr:'7px'}}>検知結果</Button>
              <Button variant="contained" sx={{backgroundColor:'#C6DCFF', color:'#1F1F1F'}}>✎編集</Button>
            </CardContent>
           </Card>
          </Grid>
           <Grid item>
           <Card sx={{ mb:5 }}>
            <CardContent>
              <Button variant="contained" sx={{backgroundColor:'#FFC6C6', color:'#1F1F1F', borderRadius:'4px'}}>完了</Button>
              <Typography>ショッピングモールアプリ開発</Typography>
              <Button variant="text" sx={{color: '#837272'}}>...</Button>
              <Button variant="contained" sx={{backgroundColor:'#ADF0C7', color:'#1F1F1F', mr:'7px'}}>検知結果</Button>
              <Button variant="contained" sx={{backgroundColor:'#C6DCFF', color:'#1F1F1F'}}>✎編集</Button>
            </CardContent>
           </Card>
          </Grid>
           <Grid item>
           <Card sx={{ mb:5 }}>
            <CardContent>
              <Button variant="contained" sx={{backgroundColor:'#FFF6B6', color:'#1F1F1F', borderRadius:'4px'}}>調整中</Button>
              <Typography>書籍検索システム開発</Typography>
              <Button variant="text" sx={{color: '#837272'}}>...</Button>
              <Button variant="contained" sx={{backgroundColor:'#ADF0C7', color:'#1F1F1F', mr:'7px'}}>検知結果</Button>
              <Button variant="contained" sx={{backgroundColor:'#C6DCFF', color:'#1F1F1F'}}>✎編集</Button>
            </CardContent>
           </Card>
          </Grid>
          <Grid item>
           <Card sx={{ mb:5 }}>
            <CardContent>
              <Button variant="contained" sx={{backgroundColor:'#FFF6B6', color:'#1F1F1F', borderRadius:'4px'}}>調整中</Button>
              <Typography>動画視聴サービス開発</Typography>
              <Button variant="text" sx={{color: '#837272'}}>...</Button>
              <Button variant="contained" sx={{backgroundColor:'#ADF0C7', color:'#1F1F1F', mr:'7px'}}>検知結果</Button>
              <Button variant="contained" sx={{backgroundColor:'#C6DCFF', color:'#1F1F1F'}}>✎編集</Button>
            </CardContent>
           </Card>
         </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Card sx={{mb: 5 }}>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Typography id="Check">検討漏れ項目</Typography>
            <TextField
            required
            describedby='Check'
            multiline
            minRows={2}
            maxRows={4}
            sx={{width:"80%"}}
          />
           <Button variant="contained" sx={{backgroundColor:'#ADF0C7', color:'#1F1F1F'}}>pdf出力</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card> */}
        <footer>
          <div style={{backgroundColor:"#36be6b", height: "15vh"}}>
            <h1 style={{fontWeight:'bold', color:"white", paddingLeft:"150px", paddingTop:"25px"}}>FramView</h1>
          </div>
        </footer>
    </>
  )
}

export default App
