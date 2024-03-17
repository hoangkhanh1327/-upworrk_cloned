interface IAppConfig {
    apiUrl: string
}

export const appConfig: IAppConfig = {
    apiUrl: process.env.NEXT_PUBLIC_APP_API_URL || ''
}  