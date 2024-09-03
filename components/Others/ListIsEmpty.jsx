import Link from 'next/link';

const ListIsEmpty = ({ name, href }) => {
    return (
        <div>
            <h3 className="text-center font-medium text-[120%] mb-5">
                {name} list is empty {':('}
            </h3>
            <p>
                Would you like to add a {String(name).toLocaleLowerCase()}?
                click{' '}
                <Link
                    href={href}
                    className="text-blue-600 underline underline-offset-auto hover:no-underline"
                >
                    here
                </Link>
            </p>
        </div>
    );
};
export default ListIsEmpty;
