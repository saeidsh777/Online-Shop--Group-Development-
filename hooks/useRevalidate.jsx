'use server';

import { revalidatePath } from 'next/cache';

const Revalidate = path => {
    revalidatePath(path, 'page');
};
export default Revalidate;
