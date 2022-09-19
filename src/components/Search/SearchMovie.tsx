import { motion } from "framer-motion";
import { IMovie } from "../../type";
import { NoneTitle, SearchContainer, SearchInfoBox, SearchKeyword, SearchList, SearchLists, SearchSubTitle, SearchTitle } from "../../styles/Search/wrapper";
import { ToggleBtn } from "../../styles/Slider/wrapper";
import { infoVariants, listVariants, searchImgVariants } from "../../styles/variants";
import { makePath } from "../../utiles/makeImagePath";

interface ISearchMovieProps {
    keyword: string;
    searchMovieData: IMovie[];
    handleMovieDetail: (movieId: string) => () => void;
}

function SearchMovie({ keyword, searchMovieData, handleMovieDetail }: ISearchMovieProps) {
    return (
        <SearchContainer>
            <SearchTitle>
                <SearchSubTitle>다음과 관련된 영화 콘텐츠:</SearchSubTitle>
                <SearchKeyword>{keyword}</SearchKeyword>
            </SearchTitle>
            <SearchLists>
                {searchMovieData && searchMovieData?.length === 0 ? <NoneTitle> 검색하신 결과가 존재하지 않습니다. </NoneTitle> :
                    searchMovieData?.map((list) => (
                        <SearchList key={list.id} variants={listVariants} initial="normal" whileHover="hover" transition={{ type: "tween" }}>
                            <motion.img variants={searchImgVariants} src={makePath(list.backdrop_path ? list.backdrop_path : list.poster_path, "w500")} />
                            <SearchInfoBox variants={infoVariants}>
                                <h3> {list.title} </h3>
                                <ToggleBtn onClick={handleMovieDetail(list.id + "")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                </ToggleBtn>
                            </SearchInfoBox>
                        </SearchList>
                    ))}
            </SearchLists>
        </SearchContainer>
    )
}

export default SearchMovie;