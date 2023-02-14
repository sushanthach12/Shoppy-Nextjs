
const sendOrderMail = async () => {
    const res = await fetch('/api/mailer/orderMail', {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        }
    })

    const response = await res.json()
    return response
}

export default sendOrderMail