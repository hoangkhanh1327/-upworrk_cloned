interface IAppConfig {
    apiUrl: string,
    contractId: string,
}

export const appConfig: IAppConfig = {
    apiUrl: process.env.NEXT_PUBLIC_APP_API_URL || '',
    contractId:process.env.NEXT_PUBLIC_APP_ID_CONTRACT||'',
}  