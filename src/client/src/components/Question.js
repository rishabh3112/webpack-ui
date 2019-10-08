import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, Button, TextField, FormControl, Radio, RadioGroup, FormControlLabel, Select, MenuItem, Checkbox, ListItemText, Input, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/info';
export function Question(props) {
    const [options, setOptions] = useState(<></>);
    const [ans, setAns] = useState(true);
    const [required, setRequired] = useState(true);
    const [question, setQuestion] = useState(props.question);

    useEffect(() => {
        setQuestion(props.question);
    }, [props]);

    useEffect(() => {
        switch(question.type) {
            case 'confirm':
                setOptions(
                    <>
                        <Button style={{background: ans?"#eee":"#fff"}} onClick={()=>{
                            props.setAnswer(true);
                            setAns(true);
                        }}>Yes</Button>
                        <Button style={{background: !ans?"#eee":"#fff"}} onClick={()=>{
                            props.setAnswer(false);
                            setAns(false);
                        }}>No</Button>
                    </>
                );
                break;
    
            case 'input':
                setOptions(
                    <>
                    <TextField
                        placeholder={question.default ? question.default : "Enter Answer here"}
                        onChange={(e) => {
                            const val = e.target.value;
                            if(!question.validate){
                                props.setAnswer(val);
                                setRequired(true);
                                return;
                            }
                            const valid = question.validate(val);
                            if (valid === true) {
                                props.setAnswer(val);
                                setRequired(true);
                            } else {
                                setRequired(valid);
                            }
                        }}
                    ></TextField>
                    {
                        (required !== true) &&
                        <b>Invalid Input: {required}</b>
                    }
                    </>
                )
                break;
    
            case 'list':
                setOptions(
                    <>
                        <FormControl component="fieldset" >
                            <RadioGroup
                                value={ans}
                                onChange={(e) => {
                                    props.setAnswer(e.target.value);
                                    setAns(e.target.value);
                                }}
                            >
                                {
                                    question.choices.map((option) => {
                                        return <FormControlLabel label={option} value={option} control={<Radio />} />
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </>
                )
                break;
    
            case 'rawlist':
                setOptions(
                    <>
                        <FormControl component="fieldset" >
                            <RadioGroup
                                value={ans}
                                onChange={(e) => {
                                    props.setAnswer(e.target.value);
                                    setAns(e.target.value);
                                }}
                            >
                                {
                                    question.choices.map((option) => {
                                        return <FormControlLabel label={option} value={option} control={<Radio />} />
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </>
                )
                break;
    
            case 'checkbox':
                props.setAnswer([]);
                setOptions(
                    <>
                        <FormControl>
                            <Select
                                multiple
                                value={ans}
                                onChange={(e) => {
                                    props.setAnswer(e.target.value);
                                    setAns(e.target.value);
                                }}
                                input={<Input/>}
                                renderValue={selected => selected.join(', ')}
                            >
                                {
                                    question.choices.map(option => (
                                        <MenuItem key={option} value={option}>
                                            <Checkbox checked={ans.indexOf(option) > -1} />
                                            <ListItemText primary={option} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </>
                )   
                break;
        }
    }, [question, ans])
    return (
        <>
            <div style={{padding: '20px'}}>
                <Typography variant="headline">Question</Typography>
                <Typography variant="display1"> {question.message} </Typography>
                <br />
                <Typography variant="subheading"><InfoIcon fontSize="small" color="primary" /> Default value {question.default?question.default:"not provided"}</Typography>
                <br />
                <Divider />
                <br />
                <div style={{padding: '5px'}} id="options">
                    {options}
                </div>
            </div>
        </>
    );
}