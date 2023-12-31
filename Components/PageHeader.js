import { UserIcon } from "./Icons";

const PageHeader = ({ pageTitle, username }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-between pt-[20px] pb-[31px] md:pb-[23px] md:pt-[32px] md:pl-[39.71px] md:pr-[41px] text-[#222222] bg-white" style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
                <p className="md:text-2xl text-xl font-normal md:font-medium mx-auto md:m-0">{pageTitle}</p>
                <div className="hidden gap-[14px] items-center md:flex">
                    <div className="w-6 h-6"><UserIcon /></div>
                    <p>{username}</p>
                </div>
            </div>
        </div>
    )
}

export default PageHeader;