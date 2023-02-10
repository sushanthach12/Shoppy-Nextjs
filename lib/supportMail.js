
const sendSupportMail = async (data) => {
    const res = await fetch('/api/mailer/supportMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })

    const response = await res.json()
    return response
}

export default sendSupportMail