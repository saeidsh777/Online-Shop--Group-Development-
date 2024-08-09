import LoginForm from '@/components/modules/Forms/LoginForm/LoginForm';

export default function loginPage() {
    return (
        <div className="flex flex-col justify-center items-center h-screen relative">
            <div className="w-full h-full absolute inset-0 z-[-1] bg-gray-50 blur-[120px]">
                <div className="w-[10rem] h-[10rem] bg-beige-c-100 z-0 absolute right-[3rem] top-[10rem]"></div>
                <div className="w-[17rem] h-[17rem] bg-green-c-100 z-0 absolute left-[10rem] bottom-[10rem]"></div>
                <div className="w-[10rem] h-[10rem] bg-red-c-100 z-0 absolute left-[0rem] bottom-[2rem]"></div>
            </div>

            <LoginForm />
        </div>
    );
}
