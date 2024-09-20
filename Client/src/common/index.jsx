const backendDomin = "http://localhost:8100"

const SummaryApi = {
    signup:{
        url:`${backendDomin}/api/signup`,
        method:"post",
    },
    signIn:{
        url:`${backendDomin}/api/signin`,
        method:"post",
    },
    current_user:{
        url:`${backendDomin}/api/user-details`,
        method:"get",
    }
}

export default SummaryApi;