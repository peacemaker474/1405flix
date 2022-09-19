import { useState } from "react";
import { motion, useAnimation } from 'framer-motion';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IForm {
    keyward: string;
}

function SearchBtn() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const [toggleSearch, setToggleSearch] = useState(false);
    const navigate = useNavigate();
    const inputAnimation = useAnimation();

    const handleToggle = () => {
        if (toggleSearch) {
            inputAnimation.start({
                scaleX: 0,
            });
        } else {
            inputAnimation.start({ scaleX: 1 });
        }
        setToggleSearch((prev) => !prev);
    };

    const handleSearchKeyword = (data: IForm) => {
        navigate(`/search?keyword=${data.keyward}`);
        setValue("keyward", "");
    }

    return (
        <SearchBox onSubmit={handleSubmit(handleSearchKeyword)}>
            <motion.svg
                animate={{
                    x: toggleSearch ? -265 : 0,
                }}
                onClick={handleToggle}
                transition={{ type: "linear" }}
                fill="currentColor"
                width="30px"
                height="50px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
            </motion.svg>
            <SearchInput
                initial={{ scaleX: 0 }}
                animate={inputAnimation}
                transition={{ type: "linear" }}
                type="text"
                placeholder="TV, Movies를 검색하세요."
                {
                ...register("keyward", {
                    required: true,
                    minLength: 1,
                })
                }
            />
        </SearchBox>
    );
}

export default SearchBtn;

const SearchBox = styled.form`
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;
    position: relative;

    svg {
        cursor: pointer;
        height: 25px;
        z-index: 3;
    }
`;

const SearchInput = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 100px;
    padding: 8px 15px;
    padding-left: 40px;
    z-index: 1;
    color: white;
    font-size: 1.5rem;
    background-color: rgba(17, 18, 28, .7);
    border-radius: 5px;
    border: 1px solid rgba(247, 247, 247, .5);
`;