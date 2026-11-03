export const successResponse = ({ res, status = 200, data }) => {
    const response = { message: true, status }
    if (data) {
        response.data = data
    }
    return res.status(status).json(response)
}