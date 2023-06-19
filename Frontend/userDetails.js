async function login(event){
    event.preventDefault()
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value

        const user = {
            email,
            phone
        }
        console.log(user)
        try{
            const response = await axios.post("http://localhost:4000/user/identify", user) 
            console.log(response)
            if (response.status === 200){     
                alert(response.data.message)

                    } else {
                        throw new Error('Unable to let you in!')
                    }
            
        }
                   
        catch(err){
            console.log(JSON.stringify(err))
            document.body.innerHTML = document.body.innerHTML + "<h3 style='color:red'> We have an Error!!! </h3>"
            
        }                  
            }