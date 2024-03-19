export type CommonResponse = {
    status: number
    data: unknown
    message: string
    result: number
    error?: Error
}