import {useState ,React} from 'react'
import { db } from './firebase'

export default function Contact() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [message ,setMessage]=useState('')
    const [loader,setLoaader]=useState(true);

    const handleSubmit=(e)=>{
e.preventDefault();
setLoaader(true);
db.collection('constact')
.add({
    name:name,
    email:email,
    message:message
}).then(()=>{
    alert("Message has been submitted");
    setLoaader(false)
})
.catch((error)=>{
    alert(error.message);
    setLoaader(false)
});
};


    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h1>Contact Form</h1>
            <label>Name</label>
            <input placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}></input>
            <br></br><br></br>
            <label>Email</label>
            <input placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <br></br><br></br>
            <label>Message</label>
            <textarea placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea> 
<br></br>
<button type="submit">Submit</button>  


        </form>
        </div>
    )
}
