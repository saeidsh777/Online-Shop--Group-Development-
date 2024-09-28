export const Roles = {
    user: 0,
    admin: 1,
    owner: 2,
};

export const RolesRouteAccess = {
    user: [
        {
            root: '/dashboard',
            children: ['/create-new-ticket', '/my-tickets'],
        },
    ],
    admin: [
        {
            root: '/dashboard',
            children: [
                '/add-new-product',
                '/products/*',
                '/add-new-category',
                '/categories',
                '/tickets/*',
                '/create-notification',
                '/notification-list',
            ],
        },
    ],
    owner: [''],
};
