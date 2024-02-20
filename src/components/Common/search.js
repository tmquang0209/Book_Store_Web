import Select from "react-tailwindcss-select";

const SearchBox = ({ value, onChange, options }) => {
    return (
        <Select
            // loading={true}
            value={value}
            onChange={onChange}
            options={options}
            isSearchable={true}
            classNames={{
                menuButton: ({ isDisabled }) =>
                    `flex border border-blue-gray-200 rounded-[7px] bg-transparent px-3 py-1/2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`,
                searchBox: "px-3 py-2.5 text-blue-gray-700 w-full border-blue-gray-30 border",
                list: "px-3 py-2.5 h-40 overflow-auto no-scrollbar",
                searchIcon: "hidden",
                menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
            }}
        />
    );
};

export default SearchBox;
