import { Grid, Typography, TextField, Button, Box, colors, IconButton, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HelpIcon from '@mui/icons-material/Help';
import { useId } from 'react';

export const QuestionCard = ({ questionNumber, question, labels, value, onChange, backQuestion, buttonText, buttonClassName, onClick }) => {
    return (
        <>
        <Box sx={{minHeight:"90vh", display:'flex', justifyContent:'center', alignItems:'center',mx:"auto"}}> 
            <Card sx={{width:"60%", height:"70%"}}>
                <CardContent>
                    <Grid container sx={{justifyContent:'center', alignItems:'center'}}>
                        <Grid item>
                            <Typography sx={{ color: '#8F7FEE', mb:1, ml:15 }}>{questionNumber}/8</Typography>
                            <Typography id="goalSucsessKpi" sx={{mb:2}}>{question}</Typography>
                            {
                                labels.map(label =>
                                    <div key={label.label}>
                                    {label.description && (
                                   <Tooltip title={label.description}>
                                        <HelpIcon/>
                                    </Tooltip>
                                    )}
                            <TextField
                                required
                                aria-describedby='goalSucsessKpi'
                                multiline
                                minRows={2}
                                value={value[label.label] ?? "" } onChange={(e) => onChange(label.label, e.target.value)}
                                fullWidth
                                label={label.label}
                                slotProps={{ inputLabel: { shrink: true}}}
                                sx={{mt:3, mb:5}}
                            />
                            </div>
                              )}
                            {backQuestion}
                            <Button variant="contained" className={buttonClassName ? "missCheck" : "nextButton"} sx={{ mt:5, ml:5, backgroundColor: '#ADF0C7', color: '#1F1F1F' }} onClick={onClick}>{buttonText}</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            </Box>
        </>
    );
}
