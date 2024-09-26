export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-dvh relative">
            <div className="w-full h-full absolute inset-0 z-[-1] bg-gray-50 blur-[120px] overflow-hidden">
                <div className="w-[10rem] h-[10rem] bg-beige-c-100 z-0 absolute right-[3rem] top-[10rem]"></div>
                <div className="w-[17rem] h-[17rem] bg-green-c-100 z-0 absolute left-[10rem] bottom-[10rem]"></div>
                <div className="w-[10rem] h-[10rem] bg-red-c-100 z-0 absolute left-[0rem] bottom-[2rem]"></div>
            </div>
            <div className="flex justify-center items-center w-screen h-screen gap-5 font-kalam">
                <p className="text-[3rem] lg:text-[5rem] text-gray-500">
                    LOADING
                </p>
                <div className="text-gray-500 flex justify-center items-center gap-1">
                    <span className="w-4 h-4 bg-gray-500 block rounded-full animate-bounce animation_delay_02"></span>
                    <span className="w-4 h-4 bg-gray-500 block rounded-full animate-bounce animation_delay_03"></span>
                    <span className="w-4 h-4 bg-gray-500 block rounded-full animate-bounce animation_delay_04"></span>
                </div>
            </div>
        </div>
    );
}
