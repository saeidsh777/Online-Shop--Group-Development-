import RegisterForm from '@/components/Forms/RegisterForm/RegisterForm';

export default function registerPage() {
    return (
        <main>
            <div className="flex flex-col justify-center items-center min-h-dvh relative">
                <div className="w-full h-full absolute inset-0 z-[-1] bg-gray-50 blur-[120px] overflow-hidden">
                    <div className="w-[10rem] h-[10rem] bg-beige-c-100 z-0 absolute right-[3rem] top-[10rem]"></div>
                    <div className="w-[17rem] h-[17rem] bg-green-c-100 z-0 absolute left-[10rem] bottom-[10rem]"></div>
                    <div className="w-[10rem] h-[10rem] bg-red-c-100 z-0 absolute left-[0rem] bottom-[2rem]"></div>
                </div>

                <RegisterForm />
            </div>
        </main>
    );
}
