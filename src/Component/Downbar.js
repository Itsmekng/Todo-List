import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useState , useEffect} from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  let length = messageExamples.length;
  return Array.from(new Array(length)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}

export default function Downbar() {



  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());
  const [success, setsuccess] = React.useState("");
  const [Msg, setMsg] = React.useState("");

  const [Title, setTitle] = useState("")
  const [Desc, setDesc] = useState("")
  const [MainTask, setMainTask] = useState([])


  
  


  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  const SubmitTask = (e) => {
    e.preventDefault()
    var x = document.forms["myForm"]["fname"].value;
    if (x === "") {
      setMsg("Title Cannot Be Empty")
      setsuccess("error")
      handleClick()
      return false;
      
    } else {
      setMsg("Task Successfully Added")
      setsuccess("success")
      handleClick()
      setMainTask([...MainTask, {Title , Desc}]);
      setTitle("")
      setDesc("")
      console.log(MainTask)

      }
    }


    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




let renderTask = <h2 style={{marginLeft: "4vh"}}>No Task Available</h2>
 const deletehandler = (i) => {
let copyTask = [...MainTask]
copyTask.splice(i,1)
setMainTask(copyTask)
 }




    
  if (MainTask.length>0) {
    renderTask = MainTask.map((t,i) =>{
      return (
        
        <div key={i} style={{marginTop: "2vh", marginLeft: "20px" , marginRight: "20px"}}>
          
        <Accordion>
          <AccordionSummary
            expandIcon={<CloseIcon onClick={() => { deletehandler(i)}} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant='h5'>{t.Title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize={"20px"}>
            {t.Desc}
            </Typography> 
          </AccordionDetails>
        </Accordion>
      </div>

      )
      
    })

  }

  useEffect(() => {
    const MainTask = JSON.parse(localStorage.getItem('Maintask'));
  
    
  }, [MainTask]);

  useEffect(() => {
  
    localStorage.setItem('MainTask', JSON.stringify(MainTask));
  }, [MainTask]);

   
 

  
  return (<>
   <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={2}>
        <Alert  onClose={handleClose} severity={success} sx={{ marginTop: "-20vh" ,  width: '100%' }}>
        {Msg}
        </Alert>
      </Snackbar>
    </Stack>
<form name="myForm">
   <Input name="fname" style={{marginLeft: "4vh" , marginRight: "4vh" ,width: "35vh", marginTop: "3vh"}} value={Title} onChange = { (e)=>{setTitle(e.target.value)}}  />
   <Input style={{marginLeft: "4vh" , marginRight: "4vh" ,width: "35vh", marginTop: "3vh"}} value={Desc}  onChange = { (e)=>{setDesc(e.target.value)}} />
   <Button type='Submit ' style={{marginTop: "3vh" , marginLeft: "4vh"}} onClick={SubmitTask} variant="outlined">Add Task</Button>
   </form>
  

    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <div>
        {renderTask}
    </div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
    </>
  );
}

const messageExamples = [];