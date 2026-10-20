import { Button, Grid} from '@mui/material';
import { QuestionCard } from './components/QuestionCard'
import { useState } from 'react';
import { useMissCheck } from './components/Check'
import { useNavigate } from 'react-router';
import { LinearProgress } from '@mui/material';

function App() {
  //useMissCheck関数を呼び出すとfetchExecuteを受け取れる
  const { isLoading, error, fetchExecute } = useMissCheck();
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
  const backQuestion = questionCurrentContents !== 0 && <Button variant="contained" sx={{ backgroundColor: '#E6E6F2', color: '#1F1F1F'}} onClick={ ()=> setQuestionCurrentContents(questionCurrentContents - 1 )}>{`質問${questionCurrentContents}へ戻る`}</Button>;
  const buttonText = questionCurrentContents === questions.length -1 ? "不足点検知" : `質問${nextQuestion}へ`
  const buttonClassName = questionCurrentContents === questions.length -1;

  const navigate = useNavigate();
  
  const MissCheck = async () => {
    if (buttonClassName){
      const data = await fetchExecute(inputContents);
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
  if (isLoading) {
    return (
      <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: "100vh"}}>
        <Grid size={{xs:8, sm:6, md:4}}>
          <h2 style={{textAlign:"center", marginBottom:"12px"}}>Loading・・・</h2>
          <LinearProgress color="success"/>
          <p style={{textAlign:"center", marginTop:"12px"}}>※AIによる分析処理のため、結果が表示されるまで1分程度かかる場合があります。</p>
        </Grid> 
      </Grid>
      </>
    )
  }

  return (
    <>
    <header>
      <div style={{borderBottom: "5px solid #ADF0C7"}}>
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
    onClick= {MissCheck}
    questionNumber={questionCurrentContents + 1}
    labels={labels}
    />
        <footer>
          <div style={{backgroundColor:"#36be6b", height: "15vh"}}>
            <h1 style={{fontWeight:'bold', color:"white", paddingLeft:"150px", paddingTop:"25px"}}>FramView</h1>
          </div>
        </footer>
    </>
  )
}

export default App
