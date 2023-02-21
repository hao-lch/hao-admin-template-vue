
interface LoginParams {
    body: string,
    type: string,
    url: string
}

interface Tokens {
    [username: string]: string
}

const tokens: Tokens = {
    admin: "admin-token",
}


export let login = (params: LoginParams) => {
    const body = JSON.parse(params.body)
    const username = body.username
    
    if (username in tokens) {
        return {
            code: 200,
            message: "login successful",
            data: tokens[username]
        }
    } else {
        return {
            code: 404,
            message: "login failed",
        }
    }
}

export let logout = () => {
    return {
        code: 200,
        message: "logout successful",
    }
}
