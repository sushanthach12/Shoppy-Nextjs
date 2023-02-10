
const sendRegisterMail = async (name, email) => {
    const res = await fetch('/api/mailer/registerMail', {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({name : name, email: email})
        
    })

    const response = await res.json()
    console.log(response);
}

export default sendRegisterMail;