interface Menu {
    title: string,
    key: string,
    description: string
}

export const menuData : Menu[] = [
    {
        title: 'Thông tin chung',
        key: 'common-info',
        description: 'Thông tin chung về tài khoản'
    },
    {
        title: 'Đổi mật khẩu',
        key: 'security',
        description: ''
    }
] 