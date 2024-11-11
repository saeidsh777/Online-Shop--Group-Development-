'use server';

import { revalidatePath } from 'next/cache';

const Revalidate = async path => {
    revalidatePath(path, 'page');
};
export default Revalidate;
