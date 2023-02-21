import axiosObj from ".";

export const login = (data: object) => {
    return axiosObj({
        url: "/users/login",
        method: "POST",
        data
    })
}

export const logout = () => {
    return axiosObj({
        url: "/users/logout",
        method: "POST",
    })
}